const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    }
});

const Course = mongoose.model('Course',courseSchema);

module.exports = Course;