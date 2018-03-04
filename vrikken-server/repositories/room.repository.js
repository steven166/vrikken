var fs = require("fs");
var path = require("path");
var mkdirp = require('mkdirp');

const dataDir = path.join(__dirname, '../data/rooms/');
mkdirp.sync(dataDir);

class RoomRepository{

  getRoom(roomNumber){
    let file = path.join(dataDir, roomNumber + '.json');
    if(fs.existsSync(file)){
      let buffer = fs.readFileSync(file);
      return JSON.parse(buffer);
    }else{
      return null;
    }
  }

  saveRoom(room){
    let file = path.join(dataDir, room.roomNumber + '.json');
    fs.writeFileSync(file, JSON.stringify(room));
  }

}

module.exports.RoomRepository = RoomRepository;