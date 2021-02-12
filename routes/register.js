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

}).get((req,res) => {

  res.render('register');

}).post((req,res) => {
  //set cookies
  const idToStore = req.body.email;
  // console.log(idToStore)
  // req.session.user_email = idToStore;

  //first need to check if the organization exists in organization;

  //if it exists, get the organization ID from query 1 and then use that
  //in query 2

  // else add this new organization to the table and then take the organization ID

  // using the organization ID, use another promise to insert the user into the users table;

  //1st query
  const q1 = `SELECT DISTINCT id FROM organization WHERE organization_name LIKE $1;`;
  const query1Param = [req.body.organization];

  db.query(q1,query1Param)

    .then((dbres)=>{
      //check if q1 returns response
      //dbres has id

      //use org id to insert into users;
      // console.log(typeof dbres.rows[0].id);

      const idForInsert = Number(dbres.rows[0].id);

      const values = [req.body.fname, req.body.email, req.body.password, req.body.admin,idForInsert];
      console.log(values);
      const q2 = `INSERT INTO users (name,email, password, admin, organization_id)
      VALUES ($1, $2, $3, $4, $5);`;

      db.query(q2,values).then((dbres)=>{


        // //insert succsussfully, go home

        // //req.session.user_email = dbres.rows[0].email;

        const templateVars =
        { idToStore
        };

        // res.redirect("/login");
        res.render("index", templateVars);

      }).catch((err)=>{

        console.log(err);

      });



    }).catch(err => {
      console.log('error LINE 54:', err);
      //if no response, then organization_id does not exist, need to insert into  organizations

      //then get new id and insert into users

    });

});






//res.send('post register post req');





module.exports = router;




// ////OLD CODE
//   //console.log(req.body.Organization, 'ORGANIZATIONS')
//   let response = req.body;
//   console.log('THIS IS RESPONSE ',response);
//   const queryString = `
//     INSERT INTO users (name,email, password, admin, organization_id)
//     VALUES ($1, $2, $3, $4, $5)
//     RETURNING *;
//     `;
//   const values = [response.fname, response.email, response.password, response.admin,response.organization];

//   //console.log(values);

//   db.query(queryString,values)
//     .then(dbres => {
//       const idToStore = dbres.rows[0].email;
//       req.session.user_email = idToStore;
//       req.session.user_email = dbres.rows[0].email;

//       const templateVars =
//         { idToStore
//         };

//       res.render('index', templateVars);

//     })
//     .catch(err => {
//       return console.log('query error:', err);
// });
