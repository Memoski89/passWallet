/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log('aaaaa')
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};






// const inputPassword = req.body.password;
//       const inputemail = req.body.email;
//       db.query(
//         "SELECT * FROM users WHERE users.email = $1;", [inputemail])
//         .then(res => res.rows[0]);
//       console.log(res.row);

//     }).get((req,res) => {

//       res.render('login');
