/*
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db.js');
var productContoller = require('./controllers/productController.js');
var adminController = require('./controllers/adminController.js');
var userContorller = require('./controllers/userController.js')

var app = express();
app.use(bodyparser.json());
app.use(cors({origin: 'http://localhost:4200'}));

app.listen(3000, () => console.log('server started at port : 3000'));

app.use('/products', productContoller);
app.use('/admins', adminController);
app.use('/users', userContorller);
*/
require('./config/config');
require('./models/db');
const userConfig = require('./config/passportConfig');
const adminConfig = require('./config/admPassportConfig');

const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const rtsIndex = require('./routes/index.router');


var app = express();
console.log(`Server starting at port : ${process.env.PORT}...`)

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api', rtsIndex);

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }

});

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("../../talyasuproject/src/assets/images")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });


// start server
app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));

