var express = require('express');
var router = express.Router();
var injections = require('../injections');

router.post('/rooms/:roomNumber/partner', function(req, res, next) {
  let roomNumber = req.params.roomNumber;
  let username = req.query.username;
  let cardType = req.query['card-type'];
  let cardIndex = req.query['card-index'];
  if(!username){
    res.status(400);
    res.send("Missing query 'username'");
    return;
  }
  if(!cardType){
    res.status(400);
    res.send("Missing query 'card-type'");
    return;
  }
  if(!cardIndex){
    res.status(400);
    res.send("Missing query 'card-index'");
    return;
  }

  let room = injections.roomService.choosePartner(roomNumber, username, cardType, cardIndex);
  if(room) {
    res.status(201);
    res.send();
  }else{
    next();
  }
});

module.exports = router;
