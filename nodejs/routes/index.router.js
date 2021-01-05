const express = require('express');
const router = express.Router();


const mongoose = require('mongoose');
const fileupload = require('express-fileupload');
const path = require('path');
const { create } = require('lodash');

const filemidleware = require('../middleware/file');



const Product = mongoose.model('Product');



const ctrlUser = require('../controllers/user.controller');
const ctrlAdmin = require('../controllers/admin.controller');
const ctrlProduct = require('../controllers/product.controller');



const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.post('/addToCart', ctrlUser.addToCart);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);

router.post('/adminRegister', ctrlAdmin.adminRegister);
router.post('/adminAuthenticate', ctrlAdmin.adminAuthenticate);
router.get('/adminPanel',jwtHelper.verifyJwtToken, ctrlAdmin.adminProfile);

router.post('/addProduct', filemidleware, ctrlProduct.addProduct);
router.post('/deleteProduct', ctrlProduct.deleteProduct);
router.post('/updateProduct', filemidleware, ctrlProduct.updateProduct);
router.post('/getProduct', ctrlProduct.getProduct);




router.get('/getProducts', ctrlProduct.getProducts);



module.exports = router;
