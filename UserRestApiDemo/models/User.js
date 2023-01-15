const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    salary: {
        type: Number,
        require: true
    },
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Roles'
    }],
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    }

});

const User = mongoose.model('User', userSchema);

module.exports = User;