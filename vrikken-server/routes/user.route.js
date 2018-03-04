var express = require('express');
var router = express.Router();
var injections = require('../injections');

/* GET users listing. */
router.get('/users/:username', function(req, res, next) {
  let username = req.params.username;
  let userService = injections.userService;
  res.json(userService.getUser(username));
});

module.exports = router;
