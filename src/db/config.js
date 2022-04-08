const mongoose = require('mongoose');
require('dot-env');

const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/onlineExam';
const connectdb = () => {
    mongoose.connect(CONNECTION_STRING, (error) => {
    if (error) console.log('error in connecting db', error);
    else console.log('db connected!');
});
}

module.exports = connectdb;