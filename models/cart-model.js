const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name 		:  String,
    email 	    : String,
    sdt 		: String,
    msg 		: String,
    cart 		: Object,
    st 		: Number

});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;
