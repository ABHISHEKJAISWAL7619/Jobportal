const mongoose = require('mongoose');
const jobschema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,' title is required'],
    },
    description:{
        type:String,
        required:[true, ' description is required'],
    },
    requirements:{
        type:String,
    },
    salary:{
        type:Number,
        required:[ true, ' salary is required']
    },
    experiencelevel:{
        type:String,
        required:true,

    },
    location:{
        type:String,
        required:[true, ' location is required']
    },
    jobtype:{
        type:String,
        required:[true, 'jobtype is required'],
    },
    position:{
        type:Number,
        required:true,
    },
    company:{
        type:mongoose.Schema.ObjectId,
        ref:'Company',
        required:[true, ' company is required']
    },
    created_by:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    applications:[{
        type:mongoose.Schema.ObjectId,
        ref:'Application'
    }]

}, {timestamps:true})

module.exports = mongoose.model('Job',jobschema)