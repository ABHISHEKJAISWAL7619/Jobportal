const companycollection = require("../Models/Companymodel");

const registercompany = async (req, res) => {
  const { name ,logo } = req.body;
  const userId  = req.user._id;
  try {
    if (!name) {
        return res.status(400).json({ message: "Please enter the company name" });
      }
      let existingcompany = await companycollection.findOne({ name });
      if(existingcompany){
        return res.status(400).json({ message: "Company already exists", success:false });
      }
      let company = await companycollection.create({
        name:name,
        logo,
        userId:userId
      });
      return res.status(200).json({msg:"company registered successfully", success:true, company});
    
  } catch (error) {
    return res.status(400).json({msg:"error in creating company", success:false,error:error.message});
  }
};

const getcompany = async(req,res)=>{
    const userId = req.user._id;
    try {
        const companies = await companycollection.find({userId});
        if(!companies){
            return res.status(400).json({message:" companies not found", success:false});
        }
        return res.status(200).json({msg:companies,success:true});
        
    } catch (error) {
        return res.status(400).json({message:"error in getting companies", success:false,error:error.message});
    }
};

const getcompanyById = async(req,res)=>{
    try {
        const companyId  = req.params._id;
        console.log(companyId)
      
        if (!companyId) {
            return res.status(400).json({ message: "Company ID is required", success: false });
        }
        
        const company  = await companycollection.findById(companyId);

        if(!company){
            return res.status(400).json({message:"company not found", success:false});
        }
        res.status(200).json({msg :company , success:true});
        
    } catch (error) {
        return res.status(400).json({message:"error in getting company by id", success:false,error:error.message});
    }
};

const updatecompany  = async(req,res)=>{
    let companyId = req.params._id;
    console.log(companyId)
    try {
        const {name, description, website, location}  = req.body;
        const company = await companycollection.findByIdAndUpdate(companyId,{$set:{name, description, website, location}});
        if(!company){
            return res.status(400).json({message:"company not found", success:false});
        }
        return res.status(200).json({msg:"company updated successfully", success:true, company});
        
    } catch (error) {
        return res.status(400).json({message:"error in updating company", success:false,error:error});
    }
};

module.exports  = {
    registercompany,
    getcompany,
    getcompanyById,
    updatecompany
}
