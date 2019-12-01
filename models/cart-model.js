const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    name 		: String,
    email 	    : String,
    address     : String,
    phone 		: String,
    total       : Number,
    cart: [{
        productId: String,
        quantity: Number
    }],
    
});

const Cart = mongoose.model('cart', cartSchema);

module.exports = Cart;
