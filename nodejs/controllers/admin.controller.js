
const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');


const Admin = mongoose.model('Admin');


module.exports.adminRegister = (req, res, next) => {
  var admin = new Admin();
  admin.adminName = req.body.adminName;
  admin.adminPassword = req.body.adminPassword;
  admin.save((err, doc) => {
      if (!err)
          res.send(doc);
      else {
          if (err.code == 11000)
              res.status(422).send(['Email adresi zaten kullanılmakta.']);
          else
              return next(err);
      }

  });
}


module.exports.adminAuthenticate = (req, res, next) => {
  // call for passport authentication
  passport.authenticate('admAuth', (err, adm, info) => {
      // error from passport middleware
      if (err) return res.status(400).json(err);
      // registered user
      else if (adm) return res.status(200).json({ "token": adm.generateJwt() });
      // unknown user or wrong password
      else return res.status(404).json(info);
  })(req, res);
}

module.exports.adminProfile = (req, res, next) =>{
  Admin.findOne({ _id: req._id },
      (err, admin) => {
          if (!admin)
              return res.status(404).json({ status: false, message: 'Kullanıcı bulunamadı.' });
          else
              return res.status(200).json({ status: true, admin : _.pick(admin,['adminName']) });
      }
  );
}
