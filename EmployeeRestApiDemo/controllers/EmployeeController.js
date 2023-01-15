const Employee = require("../models/Employee");

class EmployeeController {

    static getEmployees = async (req, res) => {
        try {
            const employees = await Employee.find();

            if (employees.length > 0) {
                return res.json({ message: "Employee List", data: employees, success: true });
            }
            else {
                return res.json({ message: "Data Not Found", data: employees, success: false });
            }
        }
        catch (error) {
            return res.json({ message: error.message, success: false });
        }
    }

    static getEmployeeById = async (req, res) => {
        try {
            const employee = await Employee.findById(req.params.id);

            if (employee) {
                return res.json({ message: "Employee List", data: employee, success: true });
            }
            else {
                return res.json({ message: "Data Not Found", data: employee, success: false });
            }
        }
        catch (error) {
            return res.json({ message: error.message, success: false });
        }
    }

    static createEmployee = async (req, res) => {
        try {

            const { name, city, salary } = req.body;

            if(!name || !city || !salary){
                return res.json({ message: "All field are required", success: false });
            }

            const employee = await Employee.create({name: name, city: city, salary: salary});

            if (employee) {
                return res.json({ message: "Create Employee", data: employee, success: true });
            }
            else {
                return res.json({ message: "Error Occur While Creating Employee", success: false });
            }
        }
        catch (error) {
            return res.json({ message: error.message, success: false });
        }
    }

    static deleteEmployeeById = async (req, res) => {
        try {
            const employee = await Employee.deleteOne({ _id: req.params.id });

            if (employee.deletedCount === 1) {
                return res.json({ message: "Employee Deleted", success: true });
            }
            else {
                return res.json({ message: "Employee Not Deleted", success: false });
            }
        }
        catch (error) {
            return res.json({ message: error.message, success: false });
        }
    }

    static updateEmployeeById = async (req, res) => {
        try {
            const { name, city, salary } = req.body;

            if(!name || !city || !salary){
                return res.json({ message: "All field are required", success: false });
            }

            const employee = await Employee.findById(req.params.id);

            employee.name = name;
            employee.city = city;
            employee.salary = salary;

            await employee.save();

            return res.json({ message: "Employee Updated Successfully", success: true });
        }
        catch (error) {
            return res.json({ message: error.message, success: false });
        }
    }
}

module.exports = EmployeeController;