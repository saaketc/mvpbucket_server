const express = require('express');
const _ = require('lodash');
const router = express.Router();
const { User, validate } = require('../model/user');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');

router.post('/', async (req, res) => {
    
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne().or([{ email: req.body.email }, { username: req.body.username }]); 
    if (user) return res.status(400).send("User already exists!");
    user = new User(_.pick(req.body, ['firstName', 'lastName', 'college', 'email', 'username', 'password']));
    // password hashing
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateToken();
    res.header('x-auth-token', token)
        .header("access-control-expose-headers", "x-auth-token")
        
                // to whitelist this header in browser and to get that at client end
        .status(201).send(_.pick(user, ['firstName', 'lastName', 'college', 'email', 'username']));
});

// to get user
router.get('/currentUser', auth, async (req, res)=>{
        const id = req.user._id;
       // console.log(id);
        let user = await User.findById(id).select('-password -_id -__v');
        if(!user) return res.status(404).send('User not found');
        res.status(200).send(user);

});

router.put('/currentUser', auth, async (req, res)=>{
const id  = req.user._id;
  let user = await User.findById(id);
        if(!user) return res.status(404).send('User not found');
        await User.findByIdAndUpdate(id, _.pick(req.body, ['firstName', 'lastName', 'college', 'email', 'username']));
        res.status(200).send("Updated");
});

module.exports = router;