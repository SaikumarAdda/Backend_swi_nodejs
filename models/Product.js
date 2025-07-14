const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
      },
      category: [{
        type: String,
        enum: ['veg', 'non-veg']
      }],
      price: [{
        type: String,
        required:true
      }],
      bestseller: {
        type: String
      },
      image: {
        type: String
        
      },
      description:{
        type: String
      },
      firm: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Firm',
        required: true
      }]
});

const Product = mongoose.model('Product',productSchema);

module.exports = Product