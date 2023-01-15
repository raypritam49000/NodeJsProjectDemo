const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employee.controller')

router.post('/employees',EmployeeController.createEmployee);
router.get('/employees',EmployeeController.getAllEmployees);
router.get('/employees/:id',EmployeeController.getEmployeeById);
router.put('/employees/:id',EmployeeController.updatedEmployee);
router.delete('/employees/:id',EmployeeController.deleteEmployeeById);

module.exports = router;