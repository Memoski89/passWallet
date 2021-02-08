"use strict";

let express = require('express');
//let app = express();
let router = express.Router();

router.route('/')
  .get((req,res) => {

    res.send("this is home page");

  })
  .post((req,res) => {

    res.send("this is home page");

  });

router.route('/createNewLogin:user_id')
  .get((req,res) => {

    res.send("this iscreate new login userig");

  })
  .post((req,res) => {

    res.send("this iscreate new login userig");

  });






router.route('/editLogin:user_id')
  .get((req,res) => {

    res.send("this iscreate new edit user ");

  });



router.route('/deleteLogin:user_id')
  .post((req,res) => {

    res.send("this iscreate delete user id");

  });


router.route('/myPasswords:user_id')
  .get((req,res) => {

    res.send("this iscreate delete user id");

  });


router.route('/myOrganizationPasswords:id')
  .get((req,res) => {

    res.send("/home/myOrganizationPasswords:id");

  });






module.exports = router;
