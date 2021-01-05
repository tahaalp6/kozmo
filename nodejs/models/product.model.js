const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  title: {
      type: String,
      required: 'Title can\'t be empty'
  },
  subtitle: {
      type: String,
      required: 'Subtitle can\'t be empty'
  },
  description: {
      type: String,
      required: 'description can\'t be empty'
  },
  img: {
    type: String,
  },
  price: {
    type: Number,
    required: 'price can\'t be empty'

  }

  

});

mongoose.model('Product', productSchema);
