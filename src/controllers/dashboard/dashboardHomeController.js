exports.index = async(req, res) => {
    res.render('dashboard/home', {
        title: 'Dashboard',
        layout: './layouts/dashboard/main',
        username: req.session.username,
        url: process.env.URL
    });
}