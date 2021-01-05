const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");


var Admin = mongoose.model('Admin');

passport.use('admAuth',
  new localStrategy({ usernameField : 'adminName',passwordField: 'adminPassword'},
    (username,password,done) =>{
      Admin.findOne({adminName : username},
        (err,adm)=>{
          if(err)
            return done(err);
          else if (!adm)
            return done(null, false, { message: 'Email is not registered'});
          else if(!adm.verifyPassword(password))
            return done(null, false, { message: 'Incorrect Password'});
          else
            return done(null, adm);
        });
    })
);
