const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PCchema = new Schema({
    link: {
        type: String
        
    },
    title: {
        type: String
    },
    date: {
        type: String
    },
    price: {
        type: String
    }
},{
    timestamps: true
});

var PC = mongoose.model('PC', PCchema);

module.exports = PC;