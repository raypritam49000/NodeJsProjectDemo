const mongoose = require('mongoose');

const rolesSchema = mongoose.Schema({
    role: {
        type: String,
        require: true
    }
});

const Roles = mongoose.model('Roles', rolesSchema);

module.exports = Roles;