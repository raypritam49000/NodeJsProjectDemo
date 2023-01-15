const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/EmployeeController');


router.get('/getAllEmployees', EmployeeController.getEmployees);
router.get('/getEmployee/:id', EmployeeController.getEmployeeById);
router.post('/createEmployee', EmployeeController.createEmployee);
router.delete('/deleteEmployee/:id', EmployeeController.deleteEmployeeById);
router.put('/updateEmployee/:id', EmployeeController.updateEmployeeById);



module.exports = router;