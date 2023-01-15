const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    city: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    coutry: {
        type: String,
        require: true
    },
    pincode: {
        type: Number,
        require: true
    }
});

const Address = mongoose.model('Address',  addressSchema);

module.exports = Address;