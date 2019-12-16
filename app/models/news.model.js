const mongoose = require('mongoose');

const NewsSchema = mongoose.Schema({
    judul: String,
    subjudul: String,
    link_gambar: String,
    deskripsi: String
}, {
    timestamps: true
});

module.exports = mongoose.model('News', NewsSchema);