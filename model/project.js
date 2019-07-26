const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const projectSchema = mongoose.Schema({
    isLive: {
        type:Boolean,
        default:false
    },
    liveurl: {
        type: String,
        maxlength: 100, 
    },
    title: {
        type: String,
        required: true,
        maxlength: 100,
        unique: true
    },
    description:{
        type: String,
        required: true,
        maxlength: 300,
    },
    productStory: {
        type: String,
        maxlength: 2000,
    },
    why: {
        type: String,
        required: true,
        maxlength: 300,
    },
    targetUsers: {
        type: String,
        required: true,
        maxlength: 300,
    },
    tags: {
        type: Array,
        
    },
    message: {
        type: String,
        maxlength: 200,
        default: "Hey, I hope you find this project interesting. I've put so much efforts."
    },
    github: {
        type: String,     
    },
    behance: {
        type: String,   
    },
    user: {
        type: new mongoose.Schema({
            firstName: String,
            lastName: String,
            college: String
        }),
        required: true,
    }

});

const Project = mongoose.model('Project', projectSchema);

const validateProject = (project) => {
    const schema = {
        isLive:Joi.boolean(),
        liveurl:Joi.string().empty(''),
        title: Joi.string().required().max(100),
        description: Joi.string().required().max(2000),
        productStory: Joi.string().empty(''),
        why: Joi.string().required().max(300),
        targetUsers: Joi.string().required().max(300),
        tags: Joi.string().max(200).empty(''),
        message: Joi.string().max(200).empty(''),
        github: Joi.string().empty(''),
        behance: Joi.string().empty(''),
    }
    return Joi.validate(project, schema);
}

module.exports.Project = Project;
module.exports.validate = validateProject;