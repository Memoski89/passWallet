//test login
//seanPaul@email.com
//password: $2a$10$J.Q35an9AC7GZLm0EKT.FuwDXuCq2zhh83WrMC6WSxvE63ocYnioa

"use strict";
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;

let express = require('express');
const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const { json } = require('body-parser');
const db = new Pool(dbParams);
db.connect();

let router = express.Router();


//cookiesession to read incoming client cookies and encrypt userID.


// console.log(cookieSession)
router.route('/',(req,res) => {
  
  })
  .post((req,res) => {

    console.log('logout route')

    req.session = null;

    res.render('login');

  });

  module.exports = router;
