const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");

const userSchema = mongoose.Schema({

    name: {
        type: String,
        require: [true, "Please enter a name"]
    },

    avatar: {
        public_id: String,
        url: String
    },

    email: {
        type: String,
        require: [true, "Please enter a email"],
        unique: [true, "Email already Exists"]
    },

    password: {
        type: String,
        require: [true, "Please enter a password"],
        minLength: [6, "Password must be at least 6 characters"],
        select: false
    },

    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],

    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    ],


    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    ],

    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        this.password = await bcryptjs.hash(this.password, 10);
    }
    next();
});

userSchema.methods.matchPassword = async function (password) {
    return await bcryptjs.compare(password, this.password);
}

userSchema.methods.generateToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET)
}

userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    return resetToken;
};



module.exports = mongoose.model("User", userSchema);