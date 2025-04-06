const usercollection = require('../Models/Usermodel');
const  bcrypt  = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const jwt_secret = "hellboy";


const registeruser = async(req,res)=>{
    const {name, email, phonenumber, password , role, profilePhoto} = req.body;
try {
    if(!name){
        return res.status(400).json({msg:"name is required", success:false})
    }
    if(!email){
        return res.status(400).json({msg:"email is required",success:false })
    }
    if(!phonenumber){
        return res.status(400).json({msg:"phonenumber is required",success:false })
    }
    if(!password){
        return res.status(400).json({msg:"password is required",success:false })
    }
    if(!role){
        return res.status(400).json({msg:"role is required",success:false })
    }
    
    const existinguser = await usercollection.findOne({email})
    if(existinguser){
        return res.status(400).json({msg:"email is already registered", success:false,error:error.msg})
    }
    const  hashpassword = await bcrypt.hashSync(password, salt);
    
    const user  = await usercollection.create({
        name,
        email,
        password:hashpassword,
        phonenumber,
        role,
        profilePhoto
    })
     return res.status(200).json({msg:"user registered successfully", success:true, user})
    
} catch (error) {
    return res.status(500).json({msg:"error in creating user",success:false, error:error.message})
}
    
}

const loginuser =  async(req,res)=>{
    const {email, password, role} = req.body;

   try {
    if(!email){
        return res.status(400).json({msg:"plz enter email", success:false})
    }
    if(!password){
        return res.status(400).json({msg:"plz enter password", success:tfalseue})
    }
    if(!role){
        return res.status(400).json({msg:"plz enter role", success:false})
    }
    const existinguser = await usercollection.findOne({email})
     if(!existinguser){
        return res.status(400).json({msg:"incorrect email "})
        
     }
     const comparepassword = await bcrypt.compareSync(password,existinguser.password);
    if(!comparepassword){
         return res.status(200).json({msg:"password is incorrect", success:false})
        }

    if(role!==existinguser.role){
        return res.status(400).json({msg:"role is not match", success:false})
        }
        const token =  jwt.sign({ _id:existinguser._id,email:existinguser.email},jwt_secret ); // generate token  
        return res.status(200).json({msg:`${existinguser.name} login successfully`, success:true, token})
    
   } catch (error) {
    return res.status(404).json({msg:"error in login user",success:false, error:error.message})
    
   }
}

const updateprofile  = async(req,res)=>{
    const {name, email, phonenumber,bio, skills,resume} = req.body;
    const userId = req.user._id;
    let data = await usercollection.findByIdAndUpdate(userId, {$set:{name,email,phonenumber,bio, skills,resume}})
    res.json({msg:"profileupdate successfully ", success:true, data})
}


const gtuserdetails = async(req,res)=>{
    const userId = req.user._id;
    try {
        let user = await usercollection.findById(userId).select('-password');
        res.json({msg:"user details fetched successfully", success:true, user})
        
    } catch (error) {
        res.json({msg:"error in fetching user details", success:false, error:error.message})
        
    }
}





module.exports = {
    registeruser,
    loginuser,
    updateprofile,
    gtuserdetails
    
}



