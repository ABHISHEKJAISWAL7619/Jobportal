const jobcollection = require('../Models/Jobmodel');
const {query} = require('express')

const postjob = async(req,res)=>{

try {
    const{title, description, requirements, salary, location, jobtype, experiencelevel, position, companyId } = req.body;
    const userId = req.user._id;
    
    if(!title){
        return res.status(400).json({message: "Please enter a title"});
    }
    if(!description){
        return res.status(400).json({message: "Please enter a description"});
    }
    if(!requirements){
        return res.status(400).json({message: "Please enter requirements"});
    }
    if(!salary){
        return res.status(400).json({message: "Please enter salary"});
    }
    if(!location){
        return res.status(400).json({message: "Please enter location"});
    }
    if(!jobtype){
        return res.status(400).json({message: "Please enter job type"});
    }
    if(!experiencelevel){
        return res.status(400).json({message: "Please enter experience level"});
    }
    if(!position){
        return res.status(400).json({message: "Please enter position"});
    }
    if(!companyId){
        return res.status(400).json({message: "Please enter company id"});
    }

    // Additional validation for requirements
    if (requirements === undefined) {
        return res.status(400).json({message: "Requirements field is required"});
    }

    const job = await jobcollection.create({
        title,
        description,
        // requirements: requirements.split(","),
        salary: Number(salary),
        location,
        jobtype,
        experiencelevel,
        position,
        company: companyId,
        created_by: userId
    });
    return res.status(200).json({msg: "New job created successfully", success: true, job});
    
} catch (error) {
    return res.status(404).json({msg: "Error in creating new job", success: false, error: error.message});
}
}

const getalljobs = async(req,res)=> {
    try {
        const keyword  = req.query.keyword || "";
        const query = {
            $or: [
                {title: {$regex: keyword, $options: "i"}},
                {description: {$regex: keyword, $options: "i"}},
            ]
        };
        const jobs  = await jobcollection.find(query).populate({ path: 'company', select: ['name','logo'] })
        // .populate({path: "company"}).sort({createdAt: -1});
        if (!jobs) {
            return res.status(404).json({msg: "No jobs found Successfully", success: false});
        }
        return res.status(200).json({msg: "All jobs found", success: true, jobs});
        
    } catch (error) {
        return res.status(404).json({msg: "Error in getting all jobs", success: false, error: error.message});
    }
}

const getjobbyid  = async(req,res)=> {
    const jobid  = req.params._id;
    try {
        const job = await jobcollection.findById(jobid);
        if (!job) {
            return res.status(404).json({msg: "Job not found", success: false});
        }
        return res.status(200).json({msg: "Job found", success: true, job});
        
    } catch (error) {
        return res.status(404).json({msg: "Error in getting job by id", success: false, error: error.message});
    }
}

const getadminjobs = async(req,res)=> {
    const adminId  = req.user._id;
    try {
        const jobs  = await jobcollection.find({created_by: adminId});
        if (!jobs) {
            return res.status(404).json({msg: "No jobs found", success: false});
        }
        return res.status(200).json({msg: "All jobs found", success: true, jobs});
        
    } catch (error) {
        return res.status(404).json({msg: "Error in getting all jobs", success: false, error: error.message});
    }
}

module.exports = {
    postjob,
    getalljobs,
    getjobbyid,
    getadminjobs
}
