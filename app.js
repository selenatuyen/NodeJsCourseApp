const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes); // '/admin' is an added filter to go to /admin/add-product
app.use(shopRoutes);

app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, 'views', 'page-not-found.html'));

    //using pug
    res.status(404).render('page-not-found');
});

// app.use((req, res, next) => {
//     console.log('In middleware!');
//     next(); // allows the request to continue to next middleware in line
// });

app.listen(3000);