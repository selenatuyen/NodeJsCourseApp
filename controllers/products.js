const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));

    //using templates
    res.render('add-product', {
        pageTitle: 'Add Product', 
        path: '/admin/add-product', 
        activeAddProduct: true, 
        formsCSS: true,
        productCSS: true
    });
}

exports.postAddProduct = (req, res, next) => { //app.post only works for post requests, use works with all http methods
    // products.push({title: req.body.title});
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    // console.log(adminData.products);
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));

    //using templates
    // const products = adminData.products;
    Product.fetchAll(products => {
        res.render('shop', {
            prods: products, 
            pageTitle: 'Shop', 
            path: '/', 
            hasProducts: products.length > 0, 
            activeShop: true
        });
    });
}