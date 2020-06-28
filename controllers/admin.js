const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));

    //using templates
    res.render('admin/add-product', {
        pageTitle: 'Add Product', 
        path: '/admin/add-product', 
        activeAddProduct: true, 
        formsCSS: true,
        productCSS: true
    });
}

exports.postAddProduct = (req, res, next) => { //app.post only works for post requests, use works with all http methods
    // products.push({title: req.body.title});
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product(title, imageUrl, description, price);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products, 
            pageTitle: 'Admin Products', 
            path: 'admin/products', 
            hasProducts: products.length > 0, 
            activeShop: true
        });
    });
}