require('dotenv').config()
const express = require("express");
const connectToDB = require('./Models/db');
require('./Models/db');
const AuthRouter = require('./routes/AuthRouter')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

connectToDB();

const PORT = process.env.PORT || 8080;

//middleware
app.use(bodyParser.json());
app.use(cors());

app.use('/auth',AuthRouter);

app.get('/',(req,res)=>{
    res.send("heloo dosto")
})

app.listen(PORT,()=>{
    console.log(`server is running on post ${PORT}`);  
})
