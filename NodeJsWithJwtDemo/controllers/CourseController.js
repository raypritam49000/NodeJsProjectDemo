const auth = require("../middleware/auth");
const express = require('express');
const courseRoute = express.Router();
const Course = require('../models/course')

courseRoute.post('/addCourse', auth, async (req, res) => {
    try {
        const { name, title, description } = req.body;

        if (!(name && title && description)) {
            return res.status(501).json({ "message": "All Filed Required", "success": false })
        }

        const course = await Course.create({ name, title, description })

        return res.status(201).json({ "message": "Course Created", "success": true, data: course })

    }
    catch (error) {
        console.log(error);
        return res.status(501).json({ "message": "INTERVAL_SERVER_ERROR", "success": false })
    }
});


courseRoute.get('/AllCourse', auth, async (req, res) => {
    try {
        const courses = await Course.find();

        if (courses && courses.length > 0) {
            return res.status(200).json({ "message": "Course List", "success": true, data: courses })
        }
        else {
            return res.status(404).json({ "message": "Data Not Found", "success": false, data: courses })
        }

    }
    catch (error) {
        console.log(error);
        return res.status(501).json({ "message": "INTERVAL_SERVER_ERROR", "success": false })
    }
});


courseRoute.get('/getCourse/:id', auth, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (course) {
            return res.status(200).json({ "message": "Course List", "success": true, data: course })
        }
        else {
            return res.status(404).json({ "message": "Data Not Found", "success": false, data: course })
        }

    }
    catch (error) {
        console.log(error);
        return res.status(501).json({ "message": "INTERVAL_SERVER_ERROR", "success": false })
    }
});


courseRoute.get('/getCourse/:id', auth, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (course) {
            return res.status(200).json({ "message": "Course List", "success": true, data: course })
        }
        else {
            return res.status(404).json({ "message": "Data Not Found", "success": false, data: course })
        }

    }
    catch (error) {
        console.log(error);
        return res.status(501).json({ "message": "INTERVAL_SERVER_ERROR", "success": false })
    }
});

courseRoute.delete('/deleteCourse/:id', auth, async (req, res) => {
    try {
        const result = await Course.deleteOne({ _id: req.params.id });
        console.log(result);
        
        if (result.deletedCount === 1) {
            return res.json({ message: "Course Deleted", success: true });
        }
        else {
            return res.json({ message: "Course Not Deleted", success: true });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(501).json({ "message": "INTERVAL_SERVER_ERROR", "success": false })
    }
});


module.exports = courseRoute;