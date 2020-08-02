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
        productCSS: true,
        isAuthenticated: req.isLoggedIn
    });
}

exports.postAddProduct = (req, res, next) => { //app.post only works for post requests, use works with all http methods
    // products.push({title: req.body.title});
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product({title: title, price: price, description: description, imageUrl: imageUrl, userId: req.user._id});

    product.save()
    .then(result => {
        // console.log(result);
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err);
    });
}

exports.getEditProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));

    //using templates

    const editMode = req.query.edit;
    if(!editMode){
        res.redirect('/');
    }

    const prodId = req.params.productId;

    Product.findById(prodId)
    .then(product => {
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
            productCSS: true,
            isAuthenticated: req.isLoggedIn
        });
    })
    .catch(err => {
        console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;

    Product.findById(prodId).then(product => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.description = updatedDesc;
        product.imageUrl = updatedImageUrl;
        return product.save();
    })
    .then(result => {
        // console.log('UPDATED PRODUCT');
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err);
    })
};

exports.postDeleteProduct = (req, res, next ) => {
    const prodId = req.body.productId;
    Product.findByIdAndRemove(prodId)
    .then(result => {
        console.log('DESTROYED PRODUCT');
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
    Product.find()
    .then(products => {
        res.render('admin/products', {
            prods: products, 
            pageTitle: 'Admin Products', 
            path: 'admin/products', 
            hasProducts: products.length > 0, 
            activeShop: true,
            isAuthenticated: req.isLoggedIn
        });
    })
    .catch(err => {
        console.log(err);
    });
}