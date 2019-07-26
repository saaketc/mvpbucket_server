const express = require('express');
const router = express.Router();
const { User } = require('../model/user');
const { Project } = require('../model/project');
// to get project repository

router.get('/:username', async (req, res) => { 
    const username = req.params.username;
    let user = await User.findOne({ username });
    if (!user) return res.status(404).send("Sorry this user doesn't exist!");
    let projectRepo = await Project.find({ user: user }).sort('_id');
    if (!projectRepo) return res.status(404).send("Repository not found!");
    res.status(200).send(projectRepo);

});

module.exports = router;