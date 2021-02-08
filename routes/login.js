"use strict";

let express = require('express');
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

  res.send('logins get req');

})
  .post((req,res) => {

    res.send('logins post req');

  }).get((req,res) => {

    res.render('login');

  });



module.exports = router;
