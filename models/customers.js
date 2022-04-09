const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Create Schema and Model

const CustomersSchema = new mongoose.Schema({
    customer_name: String,
    customer_email: String,
    customer_phone: String,
    customer_adress: String
});


const Customer = mongoose.model('Customer',CustomersSchema);
module.exports = Customer;