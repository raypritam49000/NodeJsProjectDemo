const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    videos: {
        type: Number,
        require: true
    },
    active: Boolean
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;