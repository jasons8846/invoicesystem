const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Create Schema and Model

const ProductsSchema = new mongoose.Schema({
    descr: String,
    price: String
});


const Product = mongoose.model('Product',ProductsSchema);
module.exports = Product;