const express = require('express');
const Course = require('../models/course')

//Creating the routers
const router = express.Router();

// Get All Courses
router.get("/", (req, res) => {
    Course.find()
        .then(data => res.json(data))
        .catch(error => res.json(error))
});

// Get Single Course
router.get("/:courseId", (req, res) => {
    const courseId = req.params.courseId;
    Course.findById(courseId)
        .then(data => res.json(data))
        .catch(error => res.json(error))
});

//Create Course Mongodb
router.post("/",(req,res)=>{
   const course = req.body;
   Course.create(course)
   .then(data => res.json(data))
   .catch(error => res.json(error))

});

//Delete Course Mongodb
router.delete("/:courseId",(req,res)=>{
    const courseId = req.params.courseId;
    Course.remove({"_id":courseId}) 
    .then(() => res.status(200).json({message:"Delete Course Successfully"}))
    .catch(error => res.json(error))
});

// Update  Course Mongodb
router.put("/:courseId",(req,res)=>{
    const courseId = req.params.courseId;
    const course = req.body;

    Course.updateOne({"_id":courseId},course) 
    .then((data) => res.status(201).json({message:"Update Course Successfully",data:data}))
    .catch(error => res.json(error))
});

module.exports = router;