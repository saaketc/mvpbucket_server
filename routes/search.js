const express = require('express');
const router = express.Router();
const { User } = require('../model/user');
const { Project } = require('../model/project');

router.get('/:query', async (req, res) => {
    const query = req.params.query;
    let projects = [];
    if (query === '') return res.send(projects);
    projects = await Project.find()
        .or([{ title: new RegExp('.*' + query + '.*', 'i') }, { description: new RegExp('.*' + query + '.*', 'i') }, { tags: new RegExp('.*' + query + '.*', 'i') }])
        .select('title description')
        // .or([{ title: /.*`${query}`.*/i }, { description: /.*`${query}`.*/i }]);
    if (projects.length===0) return res.status(404).send("Ooops not found....");
    res.status(200).send(projects);
        
});
 
module.exports = router;