const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Create Schema and Model

const InvoicesSchema = new mongoose.Schema({
    inv_id: Number,
    invoice_date: String,
    customer: String,
    ship_adress: String
    // invoice_details: {
    //   product: String,
    //   units: String,
    //   discount: String,
    //   price: String
    // }
});


const Invoice = mongoose.model('Invoice',InvoicesSchema);
module.exports = Invoice;