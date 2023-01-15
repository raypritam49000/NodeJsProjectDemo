const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
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

const Student = mongoose.model('Employee', studentSchema);

module.exports = Student;