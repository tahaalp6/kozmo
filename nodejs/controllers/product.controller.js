const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const fileupload = require('express-fileupload');
const path = require('path');
const { create } = require('lodash');
const file = require('../middleware/file');


const Product = mongoose.model('Product');



module.exports.addProduct = (req, res, next) => {
  var pro = new Product();
  pro.title = req.body.title;
  pro.subtitle = req.body.subtitle;
  pro.img = req.file.filename;
  pro.description = req.body.description;
  pro.price = req.body.price;


  pro.save((err, doc) => {
    if (!err)
      res.send(doc);
    else {
      if (err.code == 11000)
        res.status(422).send(['Email adresi zaten kullanılmakta. (Product contoller içerisinde) !']);
      else if (err.code == 202)
        res.status(204).send(['204 status. (Product contoller içerisinde) !']);

      else {
        res.status(422).send(['unexpected error.']);
        return pro.title;

      }
    }

  });
  // .then(createdPost => {
  //   res.status(201).json({
  //     message: "Post added successfully",
  //     post: {
  //       ...createdPost,
  //       id: createdPost._id
  //     }
  //   });
  // }).catch(error => {
  //   res.status(500).json({
  //     message: "Creating a product failed!"
  //   }),
  //   res.status(204).json({
  //     message: "Creating a product failed! 204 status !",
  //   }),
  //   res.status(204).end();
  // });

}

module.exports.getProducts = (req, res) => {
  Product.find(
    (err, docs) => {
      if (!err)
        return res.send(docs);
      else
        return console.log('error in getproducts');
    }
  );
}


module.exports.getProduct = (req, res) => {
  var pro = Product.findById(req.body.id,
    (err, docs) => {
      if (!err){
        console.log(docs);
        return res.send(docs);
      }
        
      else
        return console.log('error in getproduct');
      
    }
  );
  console.log(pro._id);
}

module.exports.deleteProduct = (req, res) => {
  console.log(req.body);
  Product.deleteOne({ _id: req.body.id }, (err) => {
    if (err) throw err;
    console.log(" Record(s) deleted successfully");
  });
}


module.exports.updateProduct = (req, res) => {
  console.log(req.body);

  var update = { $set: { 
    title: req.body.title, 
    subtitle: req.body.subtitle,
    description: req.body.description,
    price: req.body.price,
    img: req.file.filename 
  } };

  Product.updateOne({ _id: req.body._id }, update, function(err, res) {
    if (err) throw err;
    else
      console.log("1 document updated");
  });

}


// => localhost:3000/products/

// router.get('/', (req,res) => {
//   Product.find((err,docs) => {
//     if(!err) {
//       res.send(docs);
//     }
//     else
//       console.log('Error in Retriving Products : '+JSON.stringify(err,undefined,2))
//   });
// });

// router.post('/',(req,res) => {
//   var pro = new Product({
//     title:req.body.title,
//     subtitle:req.body.subtitle,
//     img:req.body.img,
//     description:req.body.description,
//     price:req.body.price
//   });
//   pro.save((err,doc) => {
//     if(!err)
//       res.send(doc);
//     else
//       console.log('Error in Product Save : '+ err);
//   });
// });

