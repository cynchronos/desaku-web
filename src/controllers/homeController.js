require('../../config/database');
const Berita = require('../models/Berita');

exports.index = async(req, res) => {
    news = await Berita.find().sort({ date: -1 });
    res.render('index', {
        title: 'Home',
        news
    })

};

exports.about = async(req, res) => {
    res.render('sekilas', {
        title: 'Sekilas Desaku'
    })
};