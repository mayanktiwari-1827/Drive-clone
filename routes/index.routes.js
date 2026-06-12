const express = require("express");

const authmiddleware = require("../middleware/authe")
const firebase = require ("../config/firebase.config")

const router = express.Router();

const upload = require("../config/multer.config")
const fileModel = require("../models/files.models");
const { fileLoader } = require("ejs");

router.get("/home",authmiddleware,async (req,res)=>{
    try{
        const userfiles = await fileModel.find({
        user: req.user.userId
    })

    console.log(userfiles)

    res.render("home",{
        files:userfiles
    })
    } catch(err){
        console.log(err);
        res.status(500).json({
            message:"Server error"
        })
    }
    
})

router.post("/upload",authmiddleware,upload.single("file"),
async(req,res)=>{
    const newfile = await fileModel.create ({
        path:req.file.path,
        originalname: req.file.originalname,
        user:req.user.userId
    })
    res.json(newfile)
})

router.get("/download/:path",authmiddleware,async(req,res)=>{
    const loggedinuserId = req.user.userId;
    // decode path because we encoded it in the template
    const path = decodeURIComponent(req.params.path);

    const file = await fileModel.findOne({
        user: loggedinuserId,
        path: path
    })

    // check kr rhe tht jo banda download krna chaah rha if he himself have uploaded tht or not

    if(!file){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    const SignedUrl = await firebase.storage().bucket().file(path).getSignedUrl({
        action:"read",
        expires: Date.now() + 1000*60
    })

    res.redirect(SignedUrl[0])
})

// now here in newfile we made a middleware to check the authorization of user and from there if token existed and valid then we saved the token data in decoded and saved tht in req.user and now we used the user id here while creating file data for server database

module.exports = router;