exports.get404 = (req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, 'views', 'page-not-found.html'));

    //using pug
    res.status(404).render('page-not-found', {pageTitle: 'Page Not Found'});
}
