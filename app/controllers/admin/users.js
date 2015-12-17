'use strict'
//For encrypt password
const crypto = require('crypto');
//Model user
const User = require("../../models/user.js");

module.exports = {

  //Show admin
  index: function(req, res) {
    User.find({}, function(err, data){
      return res.render("admin/users/users", {
        is_admin: true,
        data: data
      });
    });
  },

  //Display form newuser
  newuser: function(req, res){
    return res.render("admin/users/usercreate", {
      is_admin: true
    });
  },

  //Save new record user
  insert: function(req, res){
    let email = req.body.email;
    let password = req.body.password;

    let hashedPassword = crypto.createHash('sha512').update(password).digest('hex');

    let user = new User({email: email, password: hashedPassword});
    user.save(function(){
      res.redirect("/admin/users");
    })
  },

  //Delete record user
  delete: function(req, res){
    User.remove({ _id : req.params.id}, function (err) {
        res.redirect("/admin/users");
    });
  }

}
