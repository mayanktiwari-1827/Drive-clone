const express = require ("express");

const router = express.Router();

const { body,validationResult } = require('express-validator');

// body,validationresult r middlewares of express validator to check if data entered is correct or not

const UserModel = require("../models/user.model")

const bcrypt = require ("bcrypt")

const jwt = require("jsonwebtoken")

router.get("/register",(req,res)=>{
    res.render("register")
})

/*
email can be in forms:
"        " here if we directly checked is empty then it's not empty !!! so we need to apply trim operator
to check accurately
"a@agmai.com"
*/

router.post("/register",
    body("email").trim().isEmail().isLength({min:13}),
    body("username").trim().isLength({min:3}),
    body("password").trim().isLength({min:5}),
    async (req,res)=>{
        const errors = validationResult(req);
        // now in errors saare error hai

        if(!errors.isEmpty()){
            return res.status(400).json({
                error:errors.array(),
                message:"invalid data"
            })
        }

        /*due to the return statement aage ka code run nhi hoga coz wo invalid messg 
        leke return kr jaayega*/

        const {email,username,password} = req.body;

        const hashpassword = await bcrypt.hash(password,10);

        const newUser = await UserModel.create({
            email,
            username,
            password: hashpassword
        })

        res.json(newUser);
})

router.get("/login",(req,res)=>{
    res.render("login")
})

router.post("/login",
    body("username").trim().isLength({min:3}),
    body("password").trim().isLength({min:5})
    ,async(req,res)=>{

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                error: errors.array,
                message:"invalid data"
            })
        }

        const{username,password} = req.body;
        const user = await UserModel.findOne({
            username:username    
        })

        if(!user){
            return res.status(400).json({
                message:"Username or password is incorrect."
            })
        }

        const isMatch = await bcrypt.compare(password,user.password)

        // this will return true or false in "isMatch" so it's gonna be a boolean

        if(!isMatch){
            return res.status(400).json({
                message:"Username or password is incorrect."
            })
        }

        const token = jwt.sign({
            userId:user._id,
            email:user.email,
            username:user.username
        },process.env.JWT_SECRET)
        // this method will generate a token if user is logged in and now we have to show this on frontend using cookies

        res.cookie("token",token);

        res.send("logged in")
})


module.exports = router;