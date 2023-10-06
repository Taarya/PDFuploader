const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
    filename: String,
    numberOfPages: Number,
    username: String,
    dateUploaded: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('PDF', pdfSchema);
