var express = require('express');
var router = express.Router();
var injections = require('../injections');

router.get('/rooms/:roomNumber', function(req, res, next) {
  let roomNumber = req.params.roomNumber;

  let room = injections.roomService.getRoom(roomNumber);
  if(room){
    res.json(room);
  }else{
    next();
  }
});

module.exports = router;
