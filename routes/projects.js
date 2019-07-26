const express = require('express');
const _ = require('lodash');
const auth = require('../middleware/auth');
const router = express.Router();
const { Project, validate } = require('../model/project');

// to get all projects
router.get('/', auth, async (req, res) => {

    try {
        let projects = await Project.find({ user: req.user }).sort('-_id');
        if (!projects) return res.status(404).send("Projects not found...");
        res.status(200).send(projects);
    }
    catch (ex) {
        res.status(500).send("Something went wrong");
    }
  
});

// to get a particular project

router.get('/:title', async (req, res) => { 
    const title = req.params.title;
   // console.log(id);
    let project = await Project.findOne({title:title});
    if (!project) return res.status(404).send("Project not found");
    res.status(200).send(project);
});

// to store a project
router.post('/', auth, async (req, res) => { 
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let project = await Project.findOne({ title: req.body.title });
    if (project) return res.status(400).send("Title already exists! Please pick a different title");
 // storing project
project = new Project(_.pick(req.body, ['isLive', 'liveurl', 'title', 'description', 'productStory', 'why', 'targetUsers', 'tags', 'message', 'github', 'behance']));
    const tags = req.body.tags.split(" ");
    project.tags = tags;
    project.user = req.user;
    project = await project.save();
    res.status(200).send(project);

});
 // to delete a project

router.delete('/:id', auth, async (req, res) => { 
    const id = req.params.id;
    const project = await Project.findByIdAndRemove(id);
    if (!project) return res.status(404).send("Project not found");
    res.status(200).send('Success');

});

// to update a project

router.put('/:id', auth, async (req, res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
     const id = req.params.id
     try{
         console.log(id);
         const project = await Project.findByIdAndUpdate(id, _.pick(req.body, ['isLive', 'liveurl', 'title', 'description', 'productStory', 'why', 'targetUsers', 'message', 'github', 'behance']) );
res.status(200).send('Updated');
     }
catch(ex){
    res.status(500).send(ex.message);
}
    });

module.exports = router;