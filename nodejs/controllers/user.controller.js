
const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const { resolveSoa } = require('dns');

const User = mongoose.model('User');

module.exports.register = (req, res, next) => {
    var user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    user.cart = req.body.cart;
    user.save((err, doc) => {
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

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('userAuth', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'Kullanıcı bulunamadı.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['username','email']) });
        }
    );
}

module.exports.addToCart = (req, res, next) => {

    
    var update = {$push: { 
        cart : req.body.cart
      } };
    
    User.updateOne({ _id: req.body._id }, update, function(err, docs) {
        if (err){
            console.log(err);
            throw err;
        }
        else{
            console.log("cart updated");
            return res.send(docs);
           
        }
        
      });
}
