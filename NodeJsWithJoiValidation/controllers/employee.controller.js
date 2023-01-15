const Employee = require('../models/employee.model');
const { EmployeeValidation, EmployeeValidationUpdate } = require('../validation/employee.validation');
const logger = require('../config/logger.js');

module.exports = {

    createEmployee: async (req, res) => {
        try {

            logger.info("==>>>> Going to createEmployee : employee [" + JSON.stringify(req.body) + "]");

            const { error, value } = EmployeeValidation.validate(req.body);

            if (error) {
                logger.error("==>>>> Create User Schema validation failure : " + error.details[0].message.replace(/['"]/g, ''))
                return res.json({ message: error.details[0].message.replace(/['"]/g, ''), success: false });
            }
            else {
                logger.info("==>>>> Going to createEmployee : All Parameter are valide : [" + JSON.stringify(value) + "]");
                const createEmployee = await Employee.create(value);
                return res.json({ message: "Employee Created", success: true, "data": createEmployee });
            }
        }
        catch (error) {
            logger.error("==>>>> Error occure when create employee : [" + error + "]");

            if (error.keyValue.Email != null && error.name === "MongoServerError" && error.code === 11000) {
                return res.json({ message: "Email must be unique", success: false });
            }

            return res.json({ message: error, success: false });
        }
    },

    getAllEmployees: async (req, res) => {
        try {
            const employees = await Employee.find();

            if (employees.length > 0 && employees != null) {
                logger.info(" ==>>>> Get All Employees Method Employees : " + JSON.stringify(employees))
                return res.json({ message: "Employee List", success: true, "data": employees });
            }
            else {
                logger.error(" ==>>>> Get All Employees Method Data Not Found : " + JSON.stringify(employees))
                return res.json({ message: "Data Not Found", success: false });
            }
        }
        catch (error) {
            logger.error(" ==>>>> When Error occure while get All Employees : Error[" + error + "]");
            return res.json({ message: error, success: false });
        }
    },

    getEmployeeById: async (req, res) => {
        try {
            const employee = await Employee.findById(req.params.id);

            if (employee) {
                logger.info(" ==>>>> GetEmployeeById Method Employee : [" + JSON.stringify(employee) + "]")
                return res.json({ message: "Employee List", success: true, "data": employee });
            }
            else {
                logger.error(" ==>>>> Get Employee Method Data Not Found : " + JSON.stringify(employee))
                return res.json({ message: "Data Not Found", success: false });
            }

        } catch (error) {
            logger.error(" ==>>>> When Error occure while get Employee By id : Error[" + error + "]");
            return res.json({ message: error, success: false });
        }
    },

    updatedEmployee: async (req, res) => {
        try {

            logger.info(" ==>>>> Going to updatedEmployee : employee [" + JSON.stringify(req.body) + "]");

            const { error, value } = EmployeeValidationUpdate.validate(req.body);

            if (error) {
                logger.error(" ==>>>> User Schema validation failure : " + error.details[0].message.replace(/['"]/g, ''))
                return res.json({ message: error.details[0].message.replace(/['"]/g, ''), success: false });
            }
            else {
                logger.info(" ==>>>> Going to updatedEmployee : All Parameter are valide : [" + JSON.stringify(value) + "]");
                const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, value);
                return res.json({ message: "Employee Updated", success: true, "data": updatedEmployee });
            }
        }
        catch (error) {
            logger.error(" ==>>>> Error occure when update employee : [" + error + "]");

            if (error.keyValue.Email != null && error.name === "MongoServerError" && error.code === 11000) {
                return res.json({ message: "Email must be unique", success: false });
            }

            return res.json({ message: error, success: false });
        }
    },

    deleteEmployeeById: async (req, res) => {
        try {
            const { deletedCount } = await Employee.deleteOne({ _id: req.params.id });
            if (deletedCount > 0) {
                logger.info(" ==>>>> Go to DeleteEmployeeById Method isDeletedEmployee : [" + deletedCount + "]")
                return res.json({ message: "Employee Deleted", success: true });
            }
            else {
                logger.error(" ==>>>> Go to DeleteEmployeeById Method isDeletedEmployee : [" + deletedCount + "]")
                return res.json({ message: "Data Not Found", success: false });
            }
        }
        catch (error) {
            logger.error(" ==>>>> Error occure when DeleteEmployeeById Error : [" + error + "]");
            return res.json({ message: error, success: false });
        }
    }
}


