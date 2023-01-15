const express = require('express');
const routerAddress = express.Router();
const Address = require('../models/Address');


routerAddress.post("/createAddress", async (req, res) => {
    try {
        const address = await Address.create(req.body);
        return res.json({ message: "Address Created", success: true });
    } catch (error) {
        return res.json({ message: "INTERNAL_SERVER_ERROR", success: false });
    }
});

routerAddress.get("/getAllAddress", async (req, res) => {
    try {
        const addresses = await Address.find();
        if (addresses.length > 0) {
            return res.json({ message: "Address List", data: addresses, success: true });
        }
        else {
            return res.json({ message: "Data Not Found", success: true });
        }
    } catch (error) {
        return res.json({ message: "INTERNAL_SERVER_ERROR", success: false });
    }
})

routerAddress.get("/getAddress/:id", async (req, res) => {
    try {
        const address = await Address.findById({ _id: req.params.id });
        if (address) {
            return res.json({ message: "Address List", data: address, success: true });
        }
        else {
            return res.json({ message: "Data Not Found", data: address, success: true });
        }
    } catch (error) {
        return res.json({ message: "INTERNAL_SERVER_ERROR", success: false });
    }
})

routerAddress.delete("/deleteAddress/:id", async (req, res) => {
    try {
        // Delete the document by its _id
        const result = await Address.deleteOne({ _id: req.params.id });
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


routerAddress.put("/updateAddress/:id", async (req, res) => {
    try {
        const addressId = req.params.id;
        const address = req.body;
        if (addressId && address) {
            const data = await Address.updateOne({ _id: addressId }, address)
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



module.exports = routerAddress;