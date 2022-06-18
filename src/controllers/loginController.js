require('../../config/database');
const User = require('../models/User');
const cryptoJS = require("crypto-js");

exports.index = async(req, res) => {
    res.render('dashboard/login', {
        title: 'Login',
        layout: './dashboard/login'
    });
}

exports.add = async(req, res) => {
    try {

        useracc = {
            username: 'kuro',
            password: cryptoJS.AES.encrypt('1234', process.env.AES_SECRET).toString(),
            email: 'cybria@gmail.com'
        }
        console.log(useracc);
        await User.create(useracc, (err, result) => {

            res.redirect('/login-dashboard');
        });
    } catch (error) {
        console.log('Gagal : ' + error);

        res.redirect('/login-dashboard');
    }

}

exports.verifyLogin = async(req, res, next) => {
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect('/login-dashboard');
    }
}


exports.auth = async(req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (req.body.username == user.username && req.body.password == cryptoJS.AES.decrypt(user.password, process.env.AES_SECRET).toString(cryptoJS.enc.Utf8)) {
        req.session.loggedIn = true;
        req.session.username = req.body.username;
        res.redirect('/dashboard');
    } else {
        res.send(404, '<h1>Wrong Login</h1>');
    }
}

exports.logout = async(req, res) => {
    req.session.destroy((err) => {})
    res.redirect('/login-dashboard');
}