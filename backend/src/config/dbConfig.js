const mongoose = require('mongoose');

const dbConfig = 'mongodb+srv://usuario:usuario@cluster0.sroi8lc.mongodb.net/annotations?retryWrites=true&w=majority';

const connection = mongoose.connect(dbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = connection;