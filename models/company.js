const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Create Schema and Model

const CompanySchema = new mongoose.Schema({
    company_name: String,
    company_adress: {
        adress_line1: String,
        adress_line2: String,
        city: String,
        state: String,
        postal_code: String,
        country: String
    },
    company_bank_details:{
        bank: String,
        account_number: String,
        account_type: String,
        branch_code: String
    }
});


const Company = mongoose.model('Company',CompanySchema);
module.exports = Company;