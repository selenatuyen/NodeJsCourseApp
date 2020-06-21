const path = require('path');
const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/add-product', (req, res, next) => { //app.post only works for post requests, use works with all http methods
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;