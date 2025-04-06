const express = require('express');
const { postjob, getalljobs, getjobbyid, getadminjobs } = require('../Controllers/Jobcontroller');
const checktoken = require('../middleware/checktoken');
const router = express.Router();




router.post("/postjob", checktoken,postjob);
router.get("/getalljob",getalljobs);
router.get("/getbyid/:_id", getjobbyid);
router.get("/getadminjobs", checktoken, getadminjobs)



module.exports = router ;