const path = require('path');
const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));

    //using pug
    res.render('add-product', {pageTitle: 'Add Product'});
});

router.post('/add-product', (req, res, next) => { //app.post only works for post requests, use works with all http methods
    products.push({title: req.body.title});
    res.redirect('/');
});

exports.routes = router;
exports.products = products;