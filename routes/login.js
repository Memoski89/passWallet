//test login
//seanPaul@email.com
//password: $2a$10$J.Q35an9AC7GZLm0EKT.FuwDXuCq2zhh83WrMC6WSxvE63ocYnioa

"use strict";
//const cookieSession = require('cookie-session');
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
  console.log('upper route')

  res.send('logins get req');

})
  .post((req,res) => {
    console.log('post route')
    const inputPassword = req.body.password;
    const inputEmail = req.body.email;

    let loginDetails = [inputEmail];

    db.query(
      `SELECT * FROM users WHERE users.email = $1 ;`,loginDetails)
      .then(dbres => {
        console.log('post db query')
        //res.json(dbres.rows[0].password);

        //if email and password match values in database for users.email and password then log in
        if((dbres.rows[0].email === inputEmail) && (dbres.rows[0].password === inputPassword)  )
                  {
                    req.session.user_email = dbres.rows[0].email;

                    res.send('welcome')
                  }
      }).catch(e => res.send ('redirect to page that says email/login incorrect'));


  }).get((req,res) => {
    console.log('get route')
    res.render('login');

  });









module.exports = router;
