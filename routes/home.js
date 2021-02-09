"use strict";

let express = require('express');
//let app = express();
let router = express.Router();

//get request for /home
router.route('/')
  .get((req,res) => {
    const idToStore = res.rows;
    console.log(idToStore)
    // req.session.user_email = idToStore;
    // req.session.user_email = dbres.rows[0].email;
    // console.log(dbres.rows[0].email)

    const templateVars =
    { idToStore
    };



    //here we rended our saved passwords
    res.render("myaccount",templateVars);

  });

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
