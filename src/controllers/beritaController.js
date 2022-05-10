require('../../config/database');
const Berita = require('../models/Berita');
const slugify = require('slugify');


exports.index = async(req, res) => {
    news = await Berita.find().sort({ date: -1 });
    res.render('berita', {
        title: 'Berita',
        news
    });
}


exports.store = async(req, res) => {
    try {
        await Berita.insertMany([{
                berita: 'Desaku Luncurkan App v2.0',
                date: '2022-05-04',
                slug: 'desaku-luncurkan-app-v2-0',
                ringkasan: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias ipsum repellendus necessitatibus impedit itaque saepe sunt, deleniti illum magnam id amet sint molestias officia ratione expedita maiores velit! Fuga rem iusto rerum....',
                isi: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias ipsum repellendus necessitatibus impedit itaque saepe sunt, deleniti illum magnam id amet sint molestias officia ratione expedita maiores velit! Fuga rem iusto rerum, molestias laborum, officia expedita necessitatibus quaerat, natus sed facere debitis? Quidem blanditiis sunt, perspiciatis a veniam facilis iure aspernatur! Labore fuga hic sequi. Eum praesentium vel totam dolorum doloremque, minima tempore voluptatem vero. Magnam asperiores corrupti praesentium ad quis consectetur nobis quaerat, atque quo ducimus! Quis fugiat illo quibusdam necessitatibus dolorum iste nisi eum eos beatae ducimus doloremque explicabo, aut rerum dolores dolore reiciendis ex maxime, assumenda vitae...',
                gambar: 'https://source.unsplash.com/720x720?anime'
            },
            {
                berita: 'Pemerintah Desa Karangtalun Membuat Sistem Informasi Desa',
                slug: 'pemerintah-desa-karangtalun-membuat-sistem-informasi-desa',
                date: '2022-05-01',
                ringkasan: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias ipsum repellendus necessitatibus impedit itaque saepe sunt, deleniti illum magnam id amet sint molestias officia ratione expedita maiores velit! Fuga rem iusto rerum, molestias laborum, officia expedita necessitatibus quaerat, natus sed facere debitis? Quidem blanditiis sunt...',
                isi: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias ipsum repellendus necessitatibus impedit itaque saepe sunt, deleniti illum magnam id amet sint molestias officia ratione expedita maiores velit! Fuga rem iusto rerum, molestias laborum, officia expedita necessitatibus quaerat, natus sed facere debitis? Quidem blanditiis sunt, perspiciatis a veniam facilis iure aspernatur! Labore fuga hic sequi. Eum praesentium vel totam dolorum doloremque, minima tempore voluptatem vero. Magnam asperiores corrupti praesentium ad quis consectetur nobis quaerat, atque quo ducimus! Quis fugiat illo quibusdam necessitatibus dolorum iste nisi eum eos beatae ducimus doloremque explicabo, aut rerum dolores dolore reiciendis ex maxime, assumenda vitae...',
                gambar: 'https://source.unsplash.com/720x720?dataset'
            },
            {
                berita: 'Panduan Pengajuan KTP dan Laporan Kegiatan',
                slug: 'panduan-pengajuan-ktp-dan-laporan-kegiatan',
                date: '2022-04-23',
                ringkasan: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias ipsum repellendus necessitatibus impedit itaque saepe sunt, deleniti illum magnam id amet sint molestias officia ratione expedita maiores velit! Fuga rem iusto rerum, molestias laborum, officia expedita necessitatibus quaerat, natus sed facere debitis? Quidem blanditiis sunt, perspiciatis a veniam facilis iure aspernatur! Labore fuga hic sequi. Eum praesentium vel totam dolorum doloremque, minima tempore voluptatem vero...',
                isi: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias ipsum repellendus necessitatibus impedit itaque saepe sunt, deleniti illum magnam id amet sint molestias officia ratione expedita maiores velit! Fuga rem iusto rerum, molestias laborum, officia expedita necessitatibus quaerat, natus sed facere debitis? Quidem blanditiis sunt, perspiciatis a veniam facilis iure aspernatur! Labore fuga hic sequi. Eum praesentium vel totam dolorum doloremque, minima tempore voluptatem vero. Magnam asperiores corrupti praesentium ad quis consectetur nobis quaerat, atque quo ducimus! Quis fugiat illo quibusdam necessitatibus dolorum iste nisi eum eos beatae ducimus doloremque explicabo, aut rerum dolores dolore reiciendis ex maxime, assumenda vitae...',
                gambar: 'https://source.unsplash.com/720x720?programming'
            },
        ], (err, data) => {
            console.log('Data berhasil ditambahkan');
            res.redirect('/berita');
        });
    } catch (error) {
        console.log('err : ', error);
    }
}

exports.details = async(req, res) => {
    try {
        const berita = await Berita.findOne({ slug: req.params.slug });
        res.render('details/berita', {
            title: 'Berita - ' + berita.berita,
            berita
        })
    } catch (error) {
        res.send('<h1 class="text-center">Berita Tidak Ditemukan</h1>')
    }
}