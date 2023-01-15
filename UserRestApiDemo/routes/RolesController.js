const express = require('express');
const routerRoles = express.Router();
const Roles = require('../models/Roles');


routerRoles.post("/createRole", async (req, res) => {
    try {
        const roles = await Roles.create(req.body);
        return res.json({ message: "Role Created", success: true });
    } catch (error) {
        return res.json({ message: "INTERNAL_SERVER_ERROR", success: false });
    }
});

routerRoles.get("/getAllRoles", async (req, res) => {
    try {
        const roles = await Roles.find();
        if (roles.length > 0) {
            return res.json({ message: "Role List", data: roles, success: true });
        }
        else {
            return res.json({ message: "Data Not Found", success: true });
        }
    } catch (error) {
        return res.json({ message: "INTERNAL_SERVER_ERROR", success: false });
    }
})

routerRoles.get("/getRoles/:id", async (req, res) => {
    try {
        const role = await Roles.findById({ _id: req.params.id });
        if (role) {
            return res.json({ message: "Role List", data: role, success: true });
        }
        else {
            return res.json({ message: "Data Not Found", success: true });
        }
    } catch (error) {
        return res.json({ message: "INTERNAL_SERVER_ERROR", success: false });
    }
})

routerRoles.delete("/deleteRoles/:id", async (req, res) => {
    try {
        // Delete the document by its _id
        const result = await Roles.deleteOne({ _id: req.params.id });
        console.log(result);
        if (result.deletedCount === 1) {
            return res.json({ message: "Address Deleted", success: true });
        }
        else {
            return res.json({ message: "Address Not Deleted", success: true });
        }
    } catch (error) {
        return res.json({ message: "INTERNAL_SERVER_ERROR", success: false });
    }
})


routerRoles.put("/updateRole/:id", async (req, res) => {
    try {
        const roleId = req.params.id;
        const role = req.body;
        if (roleId  && role) {
            const data = await Address.updateOne({ _id: roleId }, role);
            return res.status(201).json({ message: "Address Updated", success: true });
        }
        else {
            return res.status(201).json({ message: "BAD_REQUEST", success: false });
        }
    }
    catch (error) {
        console.log(error);
        return res.json({ message: "INTERNAL_SERVER_ERROR", success: false })
    }
})



module.exports = routerRoles;