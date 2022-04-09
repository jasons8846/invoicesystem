const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Create Schema and Model

const InvoicesProdSchema = new mongoose.Schema({
    inv_id: Number,
    product_name: String,
    units: Number,
    discount: Number,
    price: Number
});


const InvoiceProd = mongoose.model('Invoice_product',InvoicesProdSchema);
module.exports = InvoiceProd;