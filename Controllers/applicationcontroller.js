const applicationcollection = require("../Models/Applicationmodel")
const jobcollection = require("../Models/Jobmodel")



const applyjob =  async(req,res)=>{
    const userId = req.user._id;
    const jobid = req.params._id;
    try {
        if(!jobid){
            return res.status(400).json({message:"jobid is required", success:false});
        };

        const existingapplication  = await applicationcollection.findOne({job:jobid , applicant:userId});
        if(existingapplication){
            return res.status(400).json({message:"You have already applied for this job", success:false});
        };
        const job = await jobcollection.findById(jobid);
        if(!job){
            return res.status(400).json({message:"Job not found", success:false});
        };
        const newapplication = await applicationcollection.create({
            job:jobid ,
            applicant:userId ,
        });
        job.applications.push(newapplication._id);
        await job.save();
        return res.status(200).json({message:"Application applied  successfully", success:true});
        
    } catch (error) {
        return res.status(500).json({message:"error in applying job", success:false, error:error.message});
    }
    
}


const getappliedjobs = async(req,res)=>{
    const userId = req.user._id;
    try {
        const application = await applicationcollection.find({applicant:userId})
        .sort({createdAt:-1}).populate({path:"job", options:{sort:{createdAt:-1}},
            populate:{
                path:"company",
                options:{sort :{createdAt:-1}}
            }
        });
        if(!application){
            return res.status(400).json({message:"No Application", success:false});
        };
        return res.status(200).json({ application , success:true})
        
    } catch (error) {
        return res.status(500).json({message:"error in getting appliedjobs ", success:false, error:error.message});
    }
}


const getapplicants  = async(req,res)=>{
    const jobid = req.params._id;
    // console.log(jobid)
    try {
        const job = await  jobcollection.findById(jobid)
        .populate({path:"applications",options:{sort:{createdAt:-1}},
            populate:{
                path:"applicant",
            }
        });
        if(!job){
            return res.status(400).json({message:"Job not found", success:false});
        };
        return res.status(200).json({ msg:"jobs are find successfully",job,success:true})
        
    } catch (error) {
        return res.status(500).json({message:"error in getting applicants ", success:false , errror:error.message});
        
    }

}


const updatestatus  = async(req,res)=>{
    const applicationid = req.params._id;
    const {status} = req.body;
    try {
        if(!status){
            return res.status(400).json({message:"status is required", success:false});
        };
        const application = await applicationcollection.findByIdAndUpdate(applicationid , {$set:{status}});
        if(!application){
            return res.status(400).json({message:"Application not found", success:false});
        };
        // application.status  = status.toLowerCase();
        await application.save();
        return res.status(200).json({ msg:"status updated successfully",application,success:true})

        
    } catch (error) {
        
    }
}

module.exports = {
    applyjob,
    getappliedjobs,
    getapplicants,
    updatestatus
}

