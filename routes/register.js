"use strict";

let express = require('express');
//let app = express();
let router = express.Router();
// const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();



router.route('/',(req,res) => {

  res.send('regsiter get req');

})
  .post((req,res) => {

    //console.log(req.body.Organization, 'ORGANIZATIONS')
    let response = req.body;
    const queryString = `
    INSERT INTO users (name,email, password, admin)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `;
    const values = [response.fname, response.email,response.password, response.admin];

    db.query(queryString,values)
      .then(dbres => {
        const idToStore = dbres.rows[0].email;
        req.session.user_email = idToStore;
        req.session.user_email = dbres.rows[0].email;

        const templateVars =
        { idToStore
        };

        res.render('index', templateVars);

      })
      .catch(err => {
        return console.log('query error:', err);
      });

    //res.send('post register post req');

  }).get((req,res) => {

    res.render('register');

  });



module.exports = router;




