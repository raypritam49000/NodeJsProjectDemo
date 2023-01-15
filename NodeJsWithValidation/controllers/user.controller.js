const User = require('../models/User');
const {validationResult} = require('express-validator');

exports.createUser = async (req, res) => {
    try {
        const {name, city, salary} = req.body;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.mapped()});
        }

        const user = await User.create({name, city, salary});

        return res.status(200).json({user: user, message: "User Created", isSuccess: true})

    } catch (error) {
        return res.status(501).json({message: error.message, isSuccess: false})
    }
}



