const Student = require("../models/Student");

exports.createStudent = async (req, res) => {
    try {
        const { name, city, salary } = req.body;
        if (!name || !city || !salary) {
            return res.json({ "message": "all fields must be provided", success: false });
        }
        const student = await Student.create({ name: name, city: city, salary: salary });
        return res.json({ "message": "Student Created", success: true, "student": student });
    }
    catch (error) {
        return res.json({ "message": error.message, success: false });
    }
}

exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();

        if (students != null && students.length > 0) {
            return res.json({ "message": "Student List", success: true, "student": students });
        }
        else {
            return res.json({ "message": "Data Not Found", success: false });
        }
    }
    catch (error) {
        return res.json({ "message": error.message, success: false });
    }
}


exports.getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (student != null) {
            return res.json({ "message": "Student List", success: true, "student": student });
        }
        else {
            return res.json({ "message": "Data Not Found", success: false });
        }
    }
    catch (error) {
        return res.json({ "message": error.message, success: false });
    }
}

exports.deleteStudent = async (req, res) => {
    try {
        const result = await Student.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 1) {
            return res.json({ message: "Student Deleted", success: true });
        }
        else {
            return res.json({ message: "Student Not Deleted", success: true });
        }
    } catch (error) {
        return res.json({ "message": error.message, success: false });
    }
}


exports.updateStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = req.body;
        if (studentId && student) {
            const data = await Student.updateOne({ _id: studentId }, student)
            return res.status(201).json({ message: "Student Updated", success: true });
        }
        else {
            return res.status(201).json({ message: "BAD_REQUEST", success: false });
        }
    }
    catch (error) {
        console.log(error);
        return res.json({ message: "INTERNAL_SERVER_ERROR", success: false })
    }
}