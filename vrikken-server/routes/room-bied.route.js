var express = require('express');
var router = express.Router();
var injections = require('../injections');

router.post('/rooms/:roomNumber/bied', function(req, res, next) {
  let roomNumber = req.params.roomNumber;
  let username = req.query.username;
  let value = req.query.value;
  if(!username){
    res.status(400);
    res.send("Missing query 'username'");
    return;
  }
  if(!value){
    res.status(400);
    res.send("Missing query 'value'");
    return;
  }

  let room = injections.roomService.bied(roomNumber, username, parseInt(value));
  if(room) {
    res.status(201);
    res.send();
  }else{
    next();
  }
});

module.exports = router;
