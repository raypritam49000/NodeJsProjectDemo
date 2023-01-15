const express = require('express');
const routerUser = express.Router();
const User = require('../models/User');


routerUser.post("/createUser", async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.json({ message: "User Created", success: true })
    } catch (error) {
        return res.json({ message: error.message, success: false })
    }
});

routerUser.get("/getAllUsers", async (req, res) => {
    try {
        const users = await User.find().populate('address', 'city').populate('roles').exec();
        if (users.length > 0) {
            return res.json({ message: "User List", data: users, success: true });
        }
        else {
            return res.json({ message: "Data Not Found", data: users, success: false });
        }
    } catch (error) {
        return res.json({ message: error.message, success: false })
    }
})

routerUser.get("/getUser/:id", async (req, res) => {
    try {
        const user = await User.findById({ _id: req.params.id });
        if (user) {
            return res.json({ message: "User List", data: user, success: true });
        }
        else {
            return res.json({ message: "Data Not Found", data: user, success: true });
        }
    } catch (error) {
        return res.json({ message: error.message, success: false });
    }
})

routerUser.delete("/deleteUser/:id", async (req, res) => {
    try {
        // Delete the document by its _id
        const result = await User.deleteOne({ _id: req.params.id });
        console.log(result);
        if (result.deletedCount === 1) {
            return res.json({ message: "User Deleted", success: true });
        }
        else {
            return res.json({ message: "User Not Deleted", success: true });
        }
    } catch (error) {
        return res.json({ message: error.message, success: false });
    }
})


routerUser.put("/updateUser/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const user = req.body;
        if (userId && user) {
            const data = await User.updateOne({ _id: userId }, user)
            return res.status(201).json({ message: "User Updated", success: true });
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

module.exports = routerUser;