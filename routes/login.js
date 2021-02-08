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
//let app = express();
let router = express.Router();

//cookiesession to read incoming client cookies and encrypt userID.
// const cookieSession = require('cookie-session');

// app.use(
//   cookieSession({
//     name: 'session',
//     keys: ['key1', 'key2'],
//   })
// );


router.route('/',(req,res) => {
  console.log('upper route')

  res.send('logins get req');

})
  .post((req,res) => {
    console.log('post route')
    const inputPassword = req.body.password;
    const inputemail = req.body.email;

    db.query(
      `SELECT * FROM users;`,)
      .then(dbres => {
        console.log('post db query')
        res.send('hiiting')
        res.json(dbres);

      }).catch(e => console.log('error',e));


  }).get((req,res) => {
    console.log('get route')
    res.render('login');

  });









module.exports = router;
