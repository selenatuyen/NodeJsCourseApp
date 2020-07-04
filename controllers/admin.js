const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));

    //using templates
    res.render('admin/edit-product', {
        pageTitle: 'Add Product', 
        path: '/admin/add-product', 
        activeAddProduct: true, 
        editing: false,
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

exports.getEditProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));

    //using templates

    const editMode = req.query.edit;
    if(!editMode){
        res.redirect('/');
    }

    const prodId = req.params.productId;

    Product.findById(prodId, product => {
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product', 
            path: '/admin/edit-product', 
            activeAddProduct: true, 
            editing: editMode,
            product: product,
            formsCSS: true,
            productCSS: true
        });
    });
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