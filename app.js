const http = require('http');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// const expressHandlebars = require('express-handlebars');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// app.engine('handlebars', expressHandlebars({defaultLayout: 'main', layoutsDir: 'views/layouts/'})); // view file extension matches engine name besides default layout must follow .handlebars or specificly defined ext
// app.set('view engine','handlebars');
// app.set('views', 'views');

// app.set('view engine', 'pug');
// app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes); // '/admin' is an added filter to go to /admin/add-product
app.use(shopRoutes);

app.use(errorController.get404);

// app.use((req, res, next) => {
//     console.log('In middleware!');
//     next(); // allows the request to continue to next middleware in line
// });

app.listen(3000);