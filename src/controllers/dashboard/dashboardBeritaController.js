require('../../../config/database');
const striptags = require("striptags").striptags
const Berita = require('../../models/Berita');

exports.index = async(req, res) => {
    res.render('dashboard/berita', {
        title: 'Berita',
        layout: './layouts/dashboard/main',
        berita: await Berita.find(),
        username: req.session.username,
        url: process.env.URL
    });
}

exports.edit = async(req, res) => {
    res.send('...')
}

exports.create = async(req, res) => {
    res.render('dashboard/tambahBerita', {
        title: 'Berita',
        layout: './layouts/dashboard/main',
        username: req.session.username,
        url: process.env.URL
    });
};

exports.store = (req, res) => {
    try {
        const berita = {
            berita: req.body.berita,
            slug: req.body.slug,
            date: Date.now(),
            isi: striptags(req.body.isi, { disallowedTags: new Set(["div"]) }),
            gambar: 'https://www.howtogeek.com/wp-content/uploads/csit/2021/07/f5932bc2.jpg?height=200p&trim=2,2,2,2'
        }
        console.log(berita)
        Berita.create(berita, (err, result) => {
            console.log('Berita Berhasil Ditambahkan');

            res.redirect('/dashboard/berita');
        });
    } catch (error) {
        return error;
    }
}

exports.edit = async(req, res) => {
    const news = await Berita.findOne({ _id: req.params._id });

    res.render('dashboard/editBerita', {
        title: 'Berita',
        layout: './layouts/dashboard/main',
        berita: news,
        username: req.session.username,
        url: process.env.URL
    });
}

exports.update = async(req, res) => {
    const oldBerita = await Berita.findOne({ _id: req.body.id });
    await Berita.updateOne({ _id: req.body.id }, {
        $set: {
            berita: req.body.berita,
            slug: req.body.slug,
            date: oldBerita.date,
            isi: striptags(req.body.isi, { disallowedTags: new Set(["div"]) }),
            gambar: 'https://www.howtogeek.com/wp-content/uploads/csit/2021/07/f5932bc2.jpg?height=200p&trim=2,2,2,2'
        }
    }).then((result) => {
        console.log('Berita Updated')
        res.redirect('/dashboard/berita');
    });
}

exports.destroy = async(req, res) => {
    try {
        await Berita.deleteOne({ _id: req.body.id }).then((result) => {
            res.redirect('/dashboard/berita');
        });
    } catch (err) {
        res.send(err);
    }
}