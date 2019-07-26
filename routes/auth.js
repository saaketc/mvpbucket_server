const express = require('express');
//const config = require('config');
const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const Joi = require('@hapi/joi');
const { User } = require('../model/user');

router.post('/', async (req, res) => { 
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne().or([{ email: req.body.username }, { username: req.body.username }]);
    if (!user) return res.status(404).send("Invalid Username or email");

    validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid password... Please try again");
    const token = user.generateToken();
    res.status(200).send(token);

});

const validateUser = (user) => {
    const schema = {
        username: Joi.string().required().max(255),
        password: Joi.string().required().min(6).max(255)
    }
    return Joi.validate(user, schema);
}
module.exports = router;