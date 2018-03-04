var express = require('express');
var router = express.Router();
var injections = require('../injections');

router.post('/rooms/:roomNumber/join', function(req, res, next) {
  let roomNumber = req.params.roomNumber;
  let username = req.query.username;
  if(!username){
    res.status(400);
    res.send("Missing query 'username'");
    return;
  }

  let joined = injections.roomService.joinRoom(roomNumber, username);
  if(joined){
    res.json({
      joined: true,
      message: "Room " + roomNumber + " joined"
    });
  }else{
    res.json({
      joined: false,
      message: "Room " + roomNumber + " is already closed"
    });
  }
});

module.exports = router;
