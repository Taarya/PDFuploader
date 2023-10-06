const express = require('express');
const router = express.Router();
const multer = require('multer');
const PDF = require('../models/pdf');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'backend/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

// Handle PDF uploads
router.post('/upload', upload.single('pdfFile'), async (req, res) => {
    try {
        const { filename, path } = req.file;
        const { username } = req.body;

        // Calculate the number of pages (you'll need a PDF processing library for this)

        const pdf = new PDF({
            filename: filename,
            numberOfPages: 0, // Replace with the actual number of pages
            username: username,
        });

        await pdf.save();

        res.status(201).json({ message: 'PDF uploaded successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Retrieve PDF list
router.get('/pdf-list', async (req, res) => {
    try {
        const pdfs = await PDF.find({}, 'filename numberOfPages username dateUploaded');
        res.json(pdfs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
