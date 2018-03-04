var express = require('express');
var router = express.Router();
var injections = require('../injections');

router.post('/rooms/:roomNumber/pass', function(req, res, next) {
  let roomNumber = req.params.roomNumber;
  let username = req.query.username;
  if(!username){
    res.status(400);
    res.send("Missing query 'username'");
    return;
  }

  let room = injections.roomService.pass(roomNumber, username);
  if(room) {
    res.status(201);
    res.send();
  }else{
    next();
  }
});

module.exports = router;
