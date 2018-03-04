const RoomStatus = require('../models/room-status');
const CardType = require('../models/card-types');
var SameIndexRule = require("./roem-rules/same-index-rule.js").SameIndexRule;

const ROEM_RULES = [
    new SameIndexRule()
];

class RoomService {

  constructor(roomRepository, userService) {
    this.roomRepository = roomRepository;
    this.userService = userService;
  }

  getRoom(roomNumber) {
    return this.roomRepository.getRoom(roomNumber);
  }

  joinRoom(roomNumber, username) {
    let room = this.roomRepository.getRoom(roomNumber);
    if (room == null) {
      room = {
        roomNumber: roomNumber,
        status: RoomStatus.JOINING
      }
    }
    if (room.users && room.users.filter(u => u.username.toLowerCase() === username.toLowerCase()).length > 0) {
      // is already joined
      return true;
    }

    if (room.status === RoomStatus.JOINING) {
      if (!room.users) {
        room.users = [];
      }
      if(room.users.length >= 4){
        throw new Error("This room is full, max users is 4");
      }
      room.users.push({username: username});
      this.roomRepository.saveRoom(room);
      return true;
    } else {
      return false;
    }
  }

  leaveRoom(roomNumber, username) {
    let room = this.roomRepository.getRoom(roomNumber);
    if (room) {
      room.users = room.users.filter(u => u.username.toLowerCase() !== username.toLowerCase());
      if (room.status !== RoomStatus.JOINING) {
        room.status = RoomStatus.FINISHED;
      }
      this.roomRepository.saveRoom(room);
    }
    return room;
  }

  startRoom(roomNumber) {
    let room = this.roomRepository.getRoom(roomNumber);
    if (room) {
      if(!room.users || room.users.length !== 4){
        throw new Error("Need 4 users");
      }
      room.status = RoomStatus.BIEDING;

      // Generate Deck
      let deck = this.generateDeck();
      console.info(`Generated deck of ${deck} cards`);
      // Determine handsize and rest cards
      let handSize = parseInt(deck.length / room.users.length);
      console.info(`Hand size: ${handSize}`);
      let restSize = deck.length - (handSize * room.users.length);
      console.info(`Rest size: ${restSize}`);
      // Get remaining cards
      let halfDeck = handSize * room.users.length / 2;
      room.remainingCards = [];

      // Deal first hand
      for (let i = 0; i < room.users.length; i++) {
        if (!room.users[i].cards) {
          room.users[i].cards = [];
        }
        for (let j = 0; j < handSize / 2; j++) {
          room.users[i].cards.push(deck.pop());
        }
      }

      // Deal remaining cards
      for (let i = 0; i < restSize; i++) {
        room.remainingCards.push(deck.pop());
      }

      // Deal second hand
      for (let i = 0; i < room.users.length; i++) {
        if (!room.users[i].cards) {
          room.users[i].cards = [];
        }
        for (let j = 0; j < handSize / 2; j++) {
          room.users[i].cards.push(deck.pop());
        }
      }

      // Set start bieding
      let firstUserIndex = Math.floor(Math.random() * room.users.length);
      room.users[firstUserIndex].turn = true;

      this.roomRepository.saveRoom(room);
    }
    return room;
  }

  pass(roomNumber, username) {
    let room = this.roomRepository.getRoom(roomNumber);
    if (room) {
      if (room.status === RoomStatus.BIEDING) {
        let user = room.users.filter(u => u.username.toLowerCase() === username.toLowerCase())[0];
        if (user) {
          if (user.turn) {
            user.pass = true;
            delete user.turn;
            let nextUser = this.getNextUser(room.users, user);
            if(nextUser != null){
              nextUser.turn = true;
            }else{
              room.status = RoomStatus.PARTNER;
              room.users.forEach(u => delete u.pass);
              room.users.filter(u => u.username === room.bodUser)[0].turn = true;
            }
            this.roomRepository.saveRoom(room);
            return room;
          }else{
            throw new Error(`User ${username} is not turn`);
          }
        }else{
          throw new Error(`Unknown user ${username}`);
        }
      }else{
        throw new Error(`Room ${roomNumber} is not bieding;`)
      }
    }
    return null;
  }

  bied(roomNumber, username, value) {
    let room = this.roomRepository.getRoom(roomNumber);
    if (room) {
      if (room.status === RoomStatus.BIEDING) {
        if (!room.bod || value > room.bod) {
          let user = room.users.filter(u => u.username.toLowerCase() === username.toLowerCase())[0];
          if (user) {
            if (user.turn) {
              room.bod = value;
              room.bodUser = username;
              delete user.turn;
              let nextUser = this.getNextUser(room.users, user);
              nextUser.turn = true;
              this.roomRepository.saveRoom(room);
              return room;
            }else{
              throw new Error(`User ${username} is not turn`);
            }
          }else{
            throw new Error(`Unknown user ${username}`);
          }
        }else{
          throw new Error(`Invalid bod: ${value}`);
        }
      }else{
        throw new Error(`Room ${roomNumber} is not bieding;`)
      }
    }
    return null;
  }

  choosePartner(roomNumber, username, cardType, cardIndex){
    let room = this.roomRepository.getRoom(roomNumber);
    if (room) {
      if (room.status === RoomStatus.PARTNER) {
        let user = room.users.filter(u => u.username.toLowerCase() === username.toLowerCase())[0];
        if(user){
          if(user.turn){
            let choosenPartner = room.users.filter(u => {
              let cards = u.cards.filter(c => c.type === cardType && c.index == cardIndex);
              return cards.length > 0;
            })[0];
            if(choosenPartner){
              if(user !== choosenPartner){
                room.playingCamp = {
                  playingUser: user.username,
                  users: [user.username, choosenPartner.username]
                };
                room.oppositesCamp = {
                  users: room.users.filter(u => room.playingCamp.users.indexOf(u.username) === -1 ).map(u => u.username)
                };
                room.users.forEach(user => {
                  user.roem = this.calculateRoem(user.cards);
                });
                room.playingCamp.roem = user.roem + choosenPartner.roem;
                room.status = RoomStatus.SHOWING;
                this.roomRepository.saveRoom(room);
                return room;
              }else{
                throw new Error(`choosen user is same als playing user`);
              }
            }else{
              throw new Error(`No user with the cards ${cardType} ${cardIndex}`);
            }
          }else{
            throw new Error(`User ${username} is not turn`);
          }
        }else{
          throw new Error(`Unknown user ${username}`);
        }
      }else{
        throw new Error(`Room ${roomNumber} is not partner;`)
      }
    }
    return null;
  }

  startGame(roomNumber, username){
    let room = this.roomRepository.getRoom(roomNumber);
    if (room) {
      if (room.status === RoomStatus.SHOWING) {
        let user = room.users.filter(u => u.username.toLowerCase() === username.toLowerCase())[0];
        if(user){
          user.started = true;
          if(room.users.filter(u => !u.started).length == 0){
            room.status = RoomStatus.PLAYING
          }
          this.roomRepository.saveRoom(room);
          return room;
        }else{
          throw new Error(`Unknown user ${username}`);
        }
      }else{
        throw new Error(`Room ${roomNumber} is not showing;`)
      }
    }
    return null;
  }

  getNextUser(users, user){
    if(users.filter(u => !u.pass).length > 1){
      for(let i = 1; i <= users.length; i++){
        let index = i + users.indexOf(user);
        if(index >= users.length){
          index = index - users.length;
        }
        let nextUser = users[index];
        if(!nextUser.pass){
          return nextUser;
        }
      }
    }
    return null;
  }

  generateDeck() {
    let index = [7, 8, 9, 10, 11, 12, 13, 1];
    let types = [CardType.CLUBS, CardType.DIAMONDS, CardType.HEARTS, CardType.SPADES];
    let cards = [];
    index.forEach(i => {
      types.forEach(type => {
        cards.push({
          type: type,
          index: i
        });
      });
    });
    let shuffledCards = this.shuffle(cards);
    return shuffledCards;
  }

  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  calculateRoem(cards){
    let roem = 0;
    ROEM_RULES.forEach(rule => {
      roem += rule.calcRoem(cards);
    });
    return roem;
  }

}

module.exports.RoomService = RoomService;