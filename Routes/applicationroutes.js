const express = require("express");
const checktoken = require("../middleware/checktoken");
const { applyjob, getappliedjobs, getapplicants, updatestatus } = require("../Controllers/applicationcontroller");
const router = express.Router();


router.post("/applyjob/:_id",checktoken,applyjob );
router.get("/getappliedjobs",checktoken,getappliedjobs );
router.get("/getapplicants/:_id",checktoken,getapplicants );
router.put("/updatestatus/:_id", updatestatus )








module.exports  = router