const express = require("express");

const app = express();

const UserRouter = require("./routes/user.routes") 
const cookieParser = require("cookie-parser")

const IndexRouter = require("./routes/index.routes")


const dotenv = require("dotenv");
dotenv.config();

// used dotenv package to use .env folder variable here which is carrying secret data like mongo db url and jwt authentication details..so firstly this needs to be required so tht mongourl can be used then we will call the function connect to db 

const connectToDB = require("./config/db");
connectToDB();

// imported the database connection function and called it

app.set("view engine","ejs");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/",IndexRouter);
app.use("/user",UserRouter);

// process.on("uncaughtException",(err)=>{
//     console.log("Uncaught Exception");
//     console.log(err)
// })

// this is the last option for handling error coz this will tell and print the error on console but won't give response to the client waiting on site !! so better use "try catch" for error handling

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})