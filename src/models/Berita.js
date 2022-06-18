const mongoose = require('mongoose');

const beritaSchema = new mongoose.Schema({
    berita: {
        type: String,
        required: 'Field Harus Diisi'
    },
    slug: {
        type: String,
        required: 'Field Harus Diisi'
    },
    date: {
        type: Date,
        required: 'Field Harus Diisi'
    },
    isi: {
        type: String,
        required: 'Field Harus Diisi'
    },
    gambar: {
        type: String,
        required: 'Field Harus Diisi'
    }

});

module.exports = mongoose.model('Berita', beritaSchema);