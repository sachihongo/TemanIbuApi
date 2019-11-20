const mongoose = require('mongoose');

const NewsSchema = mongoose.Schema({
    judul: String,
    subjudul: String,
    deskripsi: String
}, {
    timestamps: true
});

module.exports = mongoose.model('News', NewsSchema);