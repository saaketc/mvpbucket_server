const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 255,
        
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 255,
    },
    college: {
        type: String,
        required: true,
        maxlength: 255,

    },
    username: {
        type: String,
        required: true,
        maxlength: 255,
        unique: true

    },
       email: {
        type: String,
        required: true,
        maxlength: 255,
        unique: true

    },
    // linkedin: {
    //     type: String,
    //     maxlength: 255,
       

    // },
    password: {
        type: String,
        minlength: 6,
        maxlength: 1024
        }
});
// set key using config & env variable 
userSchema.methods.generateToken = function () {
    const token = jwt.sign({ _id: this._id, firstName: this.firstName, lastName: this.lastName, college: this.college, username:this.username},'jwtPrivateKey');
    return token;
}
const User = mongoose.model('User', userSchema);

const validateUser = (user) => {
    const schema = {
        firstName: Joi.string().required().max(255),
        lastName: Joi.string().required().max(255),
        college: Joi.string().required().max(255),
        username: Joi.string().required().max(255),
        email: Joi.string().required().max(255),
        password: Joi.string().min(6).max(255),
    }
    return Joi.validate(user, schema);
}
module.exports.User = User;
module.exports.validate = validateUser;