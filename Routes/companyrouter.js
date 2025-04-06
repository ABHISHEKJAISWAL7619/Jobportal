const express = require("express");
const { registercompany, getcompany, getcompanyById, updatecompany } = require("../Controllers/companycontroller");
const checktoken = require("../middleware/checktoken");
const router = express.Router();

router.post("/register",checktoken, registercompany);
router.get("/getcompany",checktoken, getcompany);
router.get("/getbyid/:_id", getcompanyById);
router.put("/update/:_id",updatecompany);











module.exports = router;