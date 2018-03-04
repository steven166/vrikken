var express = require('express');
var router = express.Router();
var injections = require('../injections');

router.post('/rooms/:roomNumber/start', function(req, res, next) {
  let roomNumber = req.params.roomNumber;

  let room = injections.roomService.startRoom(roomNumber);
  if(room) {
    res.status(201);
    res.send();
  }else{
    next();
  }
});

module.exports = router;
