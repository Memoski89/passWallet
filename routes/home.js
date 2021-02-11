"use strict";

let express = require('express');
//let app = express();
let router = express.Router();
// const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const { restart } = require('nodemon');
const db = new Pool(dbParams);
const {generatePassword} = require('../helperFunctions/jsHelpers/passWordGenerator.js');

db.connect();


//get request for /home
router.route('/')
  .get((req,res) => {

    const userEmail = req.session.user_email;

    const userEmailCookie = [`%${req.session.user_email}%`]; //seanPaul@eamil.com
    const findUSerString = `SELECT id FROM users WHERE email LIKE $1;`;
    console.log(userEmailCookie);
    db.query(findUSerString, userEmailCookie)
      .then((dbres)=>{

        const userID = [dbres.rows[0].id];
        //console.log(userID);

        return db.query(`SELECT * FROM user_login_per_site WHERE user_id = $1;`, userID);


      }).then(dbres => {
        //console.log(dbres); //works, retuns query results
        //res.json(dbres.rows[0].password);
        const queryResults = dbres.rows;
        let templateVars;
        if (userEmail) {
          templateVars =
          { passwords: queryResults,
            idToStore: userEmail
          };
        } else {
          templateVars =
          { passwords: queryResults,
            idToStore: null
          };
        }

        //res.render('index', templateVars);

        //here we rended our saved passwords
        res.render("myaccount",templateVars);


      }).catch(e => console.log('redirect to page that says email/login incorrect',e));



  });


//get and post route to edit login
router.route('/editLogin/:user_name_for_site_login')
  .get((req,res) => {

    const userEmail = req.session.user_email;

    let editID = req.params.user_name_for_site_login;

    let paramsForQuery = [userEmail,editID];

    db.query(
      `SELECT * FROM user_login_per_site WHERE user_name_for_site_login = $1 AND
      id = $2;`,paramsForQuery)
      .then(dbres => {
        //console.log(dbres); //works, retuns query results
        //res.json(dbres.rows[0].password);
        const queryResults = dbres.rows;
        let templateVars =
        { passwords: queryResults,
          idToStore: userEmail};

        res.render("updatePassword",templateVars);

      }).catch(e => res.send('incorrect login'));

  })
  .post((req,res) => {

    let update_id = req.params.user_name_for_site_login;


    // const values = [req.body.updateLoginURL, req.body.updatePassword, update_id];
    // console.log(values);
    // //const values = [response., response., response.,update_id];
    const queryString = `UPDATE user_login_per_site SET url_for_login = $1, user_password_for_site_login = $2
    WHERE user_login_per_site.id = $3;`;

    db.query(
      queryString,values)
      .then(dbres => {

        res.redirect("/home");

      }).catch(e => res.send('redirect to page that says email/login incorrect',e));

  });

//post route to delete login
router.route('/deleteLogin/:user_name_for_site_login_ID')
  .post((req,res) => {

    let delete_id = [req.params.user_name_for_site_login_ID];

    const queryString = `DELETE FROM user_login_per_site
    WHERE user_login_per_site.id = $1;`;

    db.query(
      queryString,delete_id)
      .then(dbres => {

        res.redirect("/home");

      }).catch(e => res.send('redirect to page that says email/login incorrect',e));

  });


//get and post route to create new login
router.route('/createNewLogin')
  .get((req,res) => {
    //
    const userEmail = req.session.user_email;
    let templateVars = { idToStore: userEmail};

    res.render("createNewLogin",templateVars);


  })
  .post((req,res) => {
    // console.log("POST ROUTE CREATE NEW LOGIN");
    // res.send("POST ROUTE CREATE NEW LOGIN");
    //user email
    const userEmail = [req.session.user_email]; //seanPaul@eamil.com
    const findUSerString = `SELECT id FROM users WHERE email = $1; `;

    const passwordInput = (req.body.upper, req.body.lower, req.body.number, req.body.symbol, req.body.length);

    const ourGeneratedPassword = generatePassword(Number(req.body.upper), Number(req.body.lower), Number(req.body.number), Number(req.body.symbol), Number(req.body.length));

    //console.log(ourGeneratedPassword);

    //

    // const values = [req.body.updateLoginURL, req.body.updatePassword, update_id];

    // console.log(queryParams);

    db.query(
      findUSerString,userEmail)
      .then(dbres => {
        const user_id = dbres.rows[0].id;

        //$3 is either ourGeneratedPassword OR req.body.user_password_for_site_login
        if ((ourGeneratedPassword)) {
          //if our function has been used to generate the values, use the result from the function when inserting
          const queryString = `
          INSERT INTO user_login_per_site (user_id, user_name_for_site_login, user_password_for_site_login, url_for_login)
          VALUES ($1, $2, $3, $4);
          `;

          const queryParams = [user_id, req.body.user_name_for_site_login, ourGeneratedPassword ,req.body.url_for_login];

          return db.query(queryString, queryParams);

        } else if (req.body.user_password_for_site_login) {
          //otherwise use user password

          const queryString = `
          INSERT INTO user_login_per_site (user_id, user_name_for_site_login, user_password_for_site_login, url_for_login)
          VALUES ($1, $2, $3, $4);
          `;

          const queryParams = [user_id, req.body.user_name_for_site_login, req.body.user_password_for_site_login ,req.body.url_for_login];

          return db.query(queryString, queryParams);
        } else {

          res.send('PASSWRD EMPTY');

        }



      }).then((a)=>{
        console.log('IN 2nd .then', a.rows[0]);

        res.redirect("/home");

      }).catch(e => res.send('redirect to page that says email/login incorrect',e));


  });



// //get route for ADMIN to view their organizations saved passwords
// router.route('/myOrganizationPasswords:id')
//   .get((req,res) => {

//     res.send("/home/myOrganizationPasswords:id");

//   });

module.exports = router;
