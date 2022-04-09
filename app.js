const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const dotenv = require("dotenv");
const Company = require('./models/company');
const Customer = require('./models/customers');
const Product = require('./models/products');
const Invoice = require('./models/invoices');
const InvoiceProd = require('./models/invoice_prods');

app.use(cors());
dotenv.config();

//  const dbUri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zmfny.mongodb.net/invoice_system?retryWrites=true&w=majority`

// const dbUri = 'mongodb://localhost:27017/invoice_system';

var port = process.env.PORT || 3000;

// mongoose.connect(dbUri)
//     .then((result) =>{
//         app.listen(port)
//     })
//     .catch((err) => console.log('error occured'));

app.get('/', (req, res) => {
    
    res.send('Heloo');
    
});

app.listen(port, () => {
    console.log("Server running")
});


app.get('/company', (req, res) =>{
    Company.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
});


app.get('/add-item', (req, res) => {
    const customer = new Customer({
        customer_name: req.query.name,
        customer_email: req.query.email,
        customer_phone: req.query.phone,
        customer_adress: req.query.adress
    });

    customer.save()
        .then((result) => {
            res.send(result);
            
        })
        .catch((err) => {
            console.log(err);
        });

        // res.redirect('http://127.0.0.1:5555/customers');
}); 

app.get('/all-items', (req, res) =>{
    Customer.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get('/products', (req, res) =>{
    Product.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })

        // res.redirect('http://127.0.0.1:5555/products.html');
});


app.get('/inv-prod', (req,res) => {
    InvoiceProd.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get('/find-inv-prod', (req,res) => {
     inv_to_find = req.query.invoice_nr;
    InvoiceProd.find({inv_id: inv_to_find})
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
});



app.get('/add-inv-prod', (req,res) => {
    var prodFound = "Product not found";
    inv_to_find = req.query.invoice_nr;
    prd_to_find = req.query.prod;
    inv_unit = req.query.units;
    inv_discount = req.query.discount;
    inv_price = req.query.price;
   InvoiceProd.updateMany({inv_id: inv_to_find, product_name: prd_to_find},{$set: {price: inv_price, units: inv_unit,
                        discount: inv_discount}}, {upsert: true})
       .then((result) => {
            res.send(result);
       })
       .catch((err) => {
           console.log(err);
       })
});

app.get('/del-inv-prod', (req,res) => {
    var prodFound = "Product not found";
    inv_to_find = req.query.invoice_nr;
    prd_to_find = req.query.prod;
   InvoiceProd.deleteOne({inv_id: inv_to_find, product_name: prd_to_find})
       .then((result) => {
            res.send(result);
       })
       .catch((err) => {
           console.log(err);
       })
});

app.get('/add-product', (req, res) => {
    const product = new Product({
        descr: req.query.prod_desc,
        price: req.query.price
    });

    product.save()
        .then((result) => {
            res.send(result);
            
        })
        .catch((err) => {
            console.log(err);
        });

        // res.redirect('http://127.0.0.1:5555/products.html');
});

app.get('/delete-product', (req, res) =>{
    Product.deleteOne({_id: req.query.product}).then(function(result){
        res.send(result)
    }).catch((err) =>{
        console.log(err);
    });

    // res.redirect('http://127.0.0.1:5555/products.html');
});


app.get('/delete-item', (req, res) =>{
    Customer.deleteOne({_id: req.query.customer}).then(function(result){
        res.send(result)
    }).catch((err) =>{
        console.log(err);
    });

    // res.redirect('http://127.0.0.1:5555/customers.html');
});


app.get('/update-invoice', (req, res) => {
    inv_to_find = req.query.invoice_nr;
    inv_customer = req.query.customer;
    inv_shipadress = req.query.shipadress;
    Invoice.updateMany({inv_id: inv_to_find},
        {$set: {customer: inv_customer, ship_adress: inv_shipadress}}, {upsert: true})
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    }) 
})

app.get('/insert-prod', (req, res) => {

    Invoice.updateOne({inv_id: 1}, {"$push" : {invoice_details: {product3: {inv_prod_id: 3, product: 'QQme', units: 2, discount: 0, price: 2.99}}}})
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    }) 
})

app.get('/save-data', (req, res) => {
    const invoice = new Invoice({
        inv_id: 5, invoice_date: '14-Mar-2022', customer: 'Jason Samuels', 
        ship_adress: '6 Wistaria, Erica', 
    });

    invoice.save()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    }) 
});


app.get('/invoices', (req, res) =>{
    Invoice.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })

        // res.redirect('http://127.0.0.1:5555/products.html');
});

app.get('/find-invoice', (req, res) =>{
    inv_to_find = req.query.invoice_nr;
    Invoice.find({inv_id: inv_to_find})
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })

        // res.redirect('http://127.0.0.1:5555/products.html');
});


app.get('/add-invoices', (req, res) =>{
    const invoice = new Invoice({
        invoice_date: req.query.inv_date,
        customer: req.query.customer,
        ship_adress: req.query.ship
    });

    invoice.save()
        .then((result) => {
            res.send(result);
            
        })
        .catch((err) => {
            console.log(err);
        });

        // res.redirect('http://127.0.0.1:5555/invoices.html');
});


app.get('/get-company', (req, res) =>{
    comp_name = req.query["company_name"];
    Company.find({company_name: comp_name})
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })

        // res.redirect('http://127.0.0.1:5555/products.html');
});

app.get('/get-customer', (req, res) =>{
    cust_name = req.query["customer_name"];
    Customer.find({customer_name: cust_name})
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })

        // res.redirect('http://127.0.0.1:5555/products.html');
});

