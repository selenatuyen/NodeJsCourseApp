exports.getLogin = (req, res, next) =>{
//    const isLoggedIn = req.get('Cookie').split(';')[0].trim().split('=')[1];
//    console.log('cookie:' + isLoggedIn);
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: req.isLoggedIn
    });
};

exports.postLogin = (req, res, next) =>{
    req.session.isLoggedIn = true;
    res.redirect('/');
};