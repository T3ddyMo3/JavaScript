const Author = require('../models/author');
//old code
// exports.login = (req, res) => {
//   res.render('sessions/login', {
//     title: 'Login'
//   });
// };
const jwt = require("jsonwebtoken");


exports.authenticate = (req, res) => {
  Author.findOne({
      email: req.body.email
    })
    .then(author => {
      author.authenticate(req.body.password, (err, isMatch) => {
        if (err) throw new Error(err);

        if (isMatch) {
          req.session.userId = author.id;

          req.flash('success', 'You are logged in.');
          res.redirect('/blogs');

          const token = jwt.sign({payload: req.body.email}, "moeteddy", {expiresIn: "1h"});
          res.cookie('token', token, {httpOnly:true});
        } else {
          res.status(401).json(err);
        }
      });
    })
    .catch(err => {
      res.status(401).json(err);
    });
};


exports.logout = (req, res) => {
  req.isAuthenticated();

  req.session.userId = null;
  req.flash('success', 'You are logged out');
  res.redirect('/');
};