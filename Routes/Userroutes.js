const express = require("express");
const { registeruser, loginuser, updateprofile, gtuserdetails } = require("../Controllers/usercontroller");
const checktoken = require("../middleware/checktoken");
const router = express.Router();





router.post("/register",registeruser);
router.post("/login", loginuser);
router.put("/update",checktoken,updateprofile)
router.get("/getuser",checktoken,gtuserdetails)




module.exports = router;