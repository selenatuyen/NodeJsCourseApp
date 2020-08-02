const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
    Product.find()
    // .select('title price-_id').populate('userId', 'name') // can populate related fields and specific fields
    .then(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'Shop', 
            path: '/products',
            isAuthenticated: req.isLoggedIn
        });
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId)
    .then(product => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products',
            isAuthenticated: req.isLoggedIn
        });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
    Product.find().then(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop', 
            path: '/',
            isAuthenticated: req.isLoggedIn
        });
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getCart = (req, res, next) =>{
    req.user.populate('cart.items.productId')
    .execPopulate()
    .then(user => {
        const products = user.cart.items;
        res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products,
            isAuthenticated: req.isLoggedIn
        });
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId)
    .then(product => {
        return req.user.addToCart(product);
    })
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => console.log(err));
}

exports.postCartDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    req.user.removeFromCart(productId)
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
    req.user.populate('cart.items.productId')
    .execPopulate()
    .then(user => {
        const products = user.cart.items.map(i =>{
            return {quantity: i.quantity, product: {...i.productId._doc}}; //._doc retrieves document
        });
        const order = new Order({
            user: {
                name: req.user.name,
                userId: req.user._id
            },
            products: products
        });
        return order.save();
    })
    .then(results => {
        return req.user.clearCart();
    })
    .then(() => {
        res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) =>{
    Order.find({"user.userId": req.user._id}) //gets all orders that belongs to user
        .then(orders => {
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders,
                isAuthenticated: req.isLoggedIn
            });
        }) 
        .catch(err => console.log(err));
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout',
        isAuthenticated: req.isLoggedIn
    });
};