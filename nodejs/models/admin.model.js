const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var adminSchema = new mongoose.Schema({
  adminName: {
      type: String,
      required: 'Username can\'t be empty'
  },
  adminPassword: {
      type: String,
      required: 'Password can\'t be empty',
      minlength: [3, 'Password must be atleast 4 character long']
  },
  saltSecret: String
});


// Events
adminSchema.pre('save', function (next) {
  bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.adminPassword, salt, (err, hash) => {
          this.adminPassword = hash;
          this.saltSecret = salt;
          next();
      });
  });
});


// Methods
adminSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.adminPassword);
};

adminSchema.methods.generateJwt = function () {
  return jwt.sign({ _id: this._id},
      process.env.JWT_SECRET,
  {
      expiresIn: process.env.JWT_EXP
  });
}



mongoose.model('Admin', adminSchema);
