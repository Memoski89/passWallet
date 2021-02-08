"use strict";

let express = require('express');
//let app = express();
let router = express.Router();
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.route('/',(req,res) => {

  res.send('regsiter get req');

})
  .post((req,res) => {

    res.send('logins post req');

  }).get((req,res) => {

    res.send("this is the registration page");

  });



module.exports = router;
