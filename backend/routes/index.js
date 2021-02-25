const express = require('express');
const users = require('../models/User.model');
const router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  console.log()
  res.send(await users.userModel.findAll())
});

module.exports = router;
