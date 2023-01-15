const User = require('../models/User');
const RESPONSE = require('../message/message');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


module.exports = {

    register: async (req, res) => {
        try {
            const {name, email, password} = req.body;

            if(!email || !password || !password) {
                return res.json({message: RESPONSE.ALL_FIELDS_REQUIRED, status: RESPONSE.FAILURE});
            }

            const userExits = await User.findOne({email: email})

            if (userExits) {
                return res.json({message: RESPONSE.ALREADY_EXISTS, status: RESPONSE.FAILURE});
            } else {
                const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                const newUser = await User.create({name, email, password: hashPassword});
                return res.json({message: RESPONSE.REGISTER_USER, status: RESPONSE.CREATED, data: newUser});
            }

        } catch (error) {
            return res.json({message: RESPONSE.INTERNAL_SERVER_ERROR, status: RESPONSE.FAILURE});
        }
    },

    login: async (req, res) => {
        try {
            const {email, password} = req.body;

            if(!email || !password) {
                return res.json({message: RESPONSE.ALL_FIELDS_REQUIRED, status: RESPONSE.FAILURE});
            }

            const user = await User.findOne({email: email})

            if (!user) {
                return res.json({
                    message: RESPONSE.USER_NOT_REGISTERED,
                    status: RESPONSE.FAILURE,
                    statusCode: RESPONSE.NOT_FOUND
                });
            }

            if (!bcrypt.compareSync(password, user.password)) {
                return res.json({message: RESPONSE.PASSWORD_NOT_MATCH, status: RESPONSE.FAILURE});
            }

            const payload = {email, name: user.name}

            jwt.sign(payload, "secret", (error, token) => {
                if (error) {
                    return res.json({message: error.message, status: RESPONSE.FAILURE});
                }
                return res.json({message: RESPONSE.LOGIN_SUCCESS, status: RESPONSE.OK, data: user, token: token});
            })


        } catch (error) {
            return res.json({message: RESPONSE.INTERNAL_SERVER_ERROR, status: RESPONSE.FAILURE});
        }
    }
}