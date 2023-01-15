const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
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
    }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;