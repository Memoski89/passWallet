"use strict";

let express = require('express');
//let app = express();
let router = express.Router();

//get request for /home
router.route('/')
  .get((req,res) => {

    res.send("this is home page");

  })

//get and post route to create new login
router.route('/createNewLogin:user_id')
  .get((req,res) => {

    res.send("this iscreate new login userig");

  })
  .post((req,res) => {

    res.send("this iscreate new login userig");

  });

//get and post routes to edit an existing login
router.route('/editLogin:user_id')
  .get((req,res) => {

    res.send("this iscreate new edit user ");

  })
  .post((req,res) => {

    res.send("this iscreate new login userig");

  });

//delete only has a post route
router.route('/deleteLogin:user_id')
  .post((req,res) => {

    res.send("this iscreate delete user id");

  });


//get route for user to view their saved passwords
router.route('/myPasswords:user_id')
  .get((req,res) => {

    res.send("this iscreate delete user id");

  });

//get route for ADMIN to view their organizations saved passwords
router.route('/myOrganizationPasswords:id')
  .get((req,res) => {

    res.send("/home/myOrganizationPasswords:id");

  });

module.exports = router;
