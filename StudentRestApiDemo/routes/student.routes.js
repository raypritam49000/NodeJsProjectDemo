const express = require('express');
const router = express.Router();
const { createStudent, getAllStudents, getStudent, deleteStudent, updateStudent } = require('../controllers/student.controller');

router.post('/', createStudent);
router.get('/', getAllStudents);
router.get('/:id', getStudent);
router.delete('/:id', deleteStudent);
router.put('/:id', updateStudent);

module.exports = router;
