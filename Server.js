const express = require("express");
const app = express();
const cors = require("cors")
const port = 9070;


app.use(express.json());   // middleware
const database = require('./db')
database();

app.use(cors())

const userrouter = require("./Routes/Userroutes")
app.use("/user", userrouter)

const companyrouter = require("./Routes/companyrouter")
app.use("/company", companyrouter)


const jobrouter = require("./Routes/Jobrouter")
app.use("/job", jobrouter)

const applicationrouter  = require("./Routes/applicationroutes")
app.use("/application", applicationrouter)










app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})