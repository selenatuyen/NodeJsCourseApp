const http = require('http');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
// const expressHandlebars = require('express-handlebars');

const errorController = require('./controllers/error');
const User = require('./models/user');
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
const authRoutes = require('./routes/auth');


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({secret: 'my secret', resave: false, saveUninitialized: false})
);

app.use((req, res, next) =>{
    User.findById('5f1e039d4e0c0813d4a2e1c8')
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes); // '/admin' is an added filter to go to /admin/add-product
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);

mongoose.connect('mongodb+srv://selena:12345@cluster0.8q2aa.mongodb.net/shop?retryWrites=true&w=majority')
    .then(result => {
        User.findOne().then(user => {
            if(!user){
                const user = new User({
                    name: 'lena',
                    email: 'email@email.com',
                    cart: {
                        items:[]
                    }
                })
                user.save();
            }
        });
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });