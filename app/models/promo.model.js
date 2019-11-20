const mongoose = require('mongoose');

const PromoSchema = mongoose.Schema({
    judul: String,
    gambar: String,
    deskripsi: String,
    kode_promo: String,
    diskon: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Promo', PromoSchema);