const mongoose = require('mongoose');

// Replace 'your_database_url' with your actual MongoDB connection string
const dbUrl = 'mongodb://localhost:27017/';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});
