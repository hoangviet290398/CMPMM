const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name 			:  String,
    img 			: String,
    cateId 		    : String,
    des 			: String,
    price 		    : Number,
    
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;
