/*
const mongoose = require('mongoose');

var uri = "mongodb://localhost:27017/talya";


mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if(!err)
    console.log('mongo succeeded...');
  else
    console.log('error in mongo : '+ JSON.stringify(err, undefined,2));

}
);


module.exports = mongoose;
*/

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});

require('./user.model');
require('./admin.model');
require('./product.model');



/*
var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb+srv://tahaalp:taha98alp@cluster0.chgeb.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority";
MongoClient.connect(uri,function(err,client) {
  const collection = client.db("talyasu").collection("products");
  const db = client.db("talyasu");

  collection.find({ 'name' : 'Iliad'}).toArray(function(err, docs) {
    //assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    //callback(docs);
  });

  client.close();
});
*/
