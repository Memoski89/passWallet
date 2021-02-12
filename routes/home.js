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
    //console.log(userEmailCookie);
    db.query(findUSerString, userEmailCookie)
      .then((dbres)=>{

        const userID = [dbres.rows[0].id];
        //console.log(userID);

        //this will be the query to return grouped by result
        return db.query(`SELECT DISTINCT category FROM user_login_per_site WHERE user_id = $1;`, userID);


      }).then(dbres => {
        const queryResults = dbres.rows;

        console.log(queryResults);

        let templateVars;
        if (userEmail) {
          templateVars =
          { categories: queryResults,
            idToStore: userEmail
          };
        } else {
          templateVars =
          { categories: queryResults,
            idToStore: null
          };
        }

        res.render('showCategories', templateVars);

      })
      .catch(e => console.log('ERROR LINE 76',e));

  });

//route for what happens when you  click categries that are rendered on home page.
//get request for /home
router.route('/:category')
  .get((req,res) => {

    const userEmail = req.session.user_email;

    const userEmailCookie = [`%${req.session.user_email}%`];

    const findUSerString = `SELECT id FROM users WHERE email LIKE $1;`;
    const categoryForQuery = req.params.category;
    //query to return user_login_per_site for given user and category
    const returnFromQuery = (queryParams) => (db.query(`SELECT * FROM user_login_per_site WHERE user_id = $1 AND category = $2;`, queryParams));

    db.query(findUSerString, userEmailCookie)

      .then((dbres)=>{

        const userID = dbres.rows[0].id;

        const queryParams = [userID, categoryForQuery];

        returnFromQuery(queryParams).then(dbres => {

          console.log('DBRESSS.ROWS: ', dbres.rows);
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

          res.render("myaccount",templateVars);

        }).catch(e => console.log('ERROR FROM RETURN categories',e));

      }).catch(e => console.log('ERROR RETURN FROM GET USER ID QUERY',e));

  });

//get and post route to edit login
router.route('/editLogin/:user_name_for_site_login')
  .get((req,res) => {

    const userEmail = req.session.user_email;

    let editID = req.params.user_name_for_site_login;

    let paramsForQuery = [editID];

    db.query(
      `SELECT * FROM user_login_per_site WHERE id = $1;`,paramsForQuery)
      .then(dbres => {

        const queryResults = dbres.rows;
        let templateVars =
        { passwords: queryResults,
          idToStore: userEmail};

        res.render("updatePassword",templateVars);

      }).catch(e => res.send('incorrect login', e));

  })
  .post((req,res) => {

    let update_id = req.params.user_name_for_site_login;

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
router.route('/user/createNewLogin')
  .get((req,res) => {
    //
    const userEmail = req.session.user_email;
    let templateVars = { idToStore: userEmail};

    res.render("createNewLogin",templateVars);


  })
  .post((req,res) => {
    //user email
    const userEmail = [req.session.user_email]; //seanPaul@eamil.com
    const findUSerString = `SELECT id FROM users WHERE email = $1; `;

    //generate password for user based on requirements gathered in form.
    const ourGeneratedPassword = generatePassword(Number(req.body.upper), Number(req.body.lower), Number(req.body.number), Number(req.body.symbol), Number(req.body.length));


    //get category input from form dropdwon
    //const categoryInput = [];

    db.query(
      findUSerString,userEmail)
      .then(dbres => {
        const user_id = dbres.rows[0].id;

        //function to assgin category based on selection from drow down:
        console.log(req.body.websiteCategories);
        const categoryToInsert = req.body.websiteCategories;

        //we need to first check if the category exists in
        // categories table
        //we need to loop through organization.organization_name, check if the req.body.user_name_for_site_login () exists and if not, add it to organization;

        //then once the promise is resolved, insert into user_login_per_site; with the new organization_ID




        //$3 is either ourGeneratedPassword OR req.body.user_password_for_site_login
        if ((ourGeneratedPassword)) {
          //if our function has been used to generate the values, use the result from the function when inserting
          const queryString = `
          INSERT INTO user_login_per_site (user_id, user_name_for_site_login, user_password_for_site_login, url_for_login, category)
          VALUES ($1, $2, $3, $4, $5);
          `;

          const queryParams = [user_id, req.body.user_name_for_site_login, ourGeneratedPassword ,req.body.url_for_login, categoryToInsert];

          return db.query(queryString, queryParams);

        } else if (req.body.user_password_for_site_login) {
          //otherwise use user password

          const queryString = `
          INSERT INTO user_login_per_site (user_id, user_name_for_site_login, user_password_for_site_login, url_for_login, category)
          VALUES ($1, $2, $3, $4, $5);
          `;

          const queryParams = [user_id, req.body.user_name_for_site_login, req.body.user_password_for_site_login ,req.body.url_for_login, categoryToInsert];

          return db.query(queryString, queryParams);
        } else {

          res.send('PASSWRD EMPTY');

        }

      }).then((a)=>{
        //console.log('IN 2nd .then', a.rows[0]);

        res.redirect("/home");

      }).catch(e => res.send('redirect to page that says email/login incorrect',e));

});



// //get route for ADMIN to view their organizations saved passwords
// router.route('/myOrganizationPasswords:id')
//   .get((req,res) => {

//     res.send("/home/myOrganizationPasswords:id");

//   });


// //get route for ADMIN to view their organizations saved passwords
// router.route('/myOrganizationPasswords:id')
//   .get((req,res) => {

//     res.send("/home/myOrganizationPasswords:id");

//   });




// //get route for ADMIN to view their organizations saved passwords
// router.route('/myOrganizationPasswords:id')
//   .get((req,res) => {

//     res.send("/home/myOrganizationPasswords:id");

//   });

module.exports = router;
