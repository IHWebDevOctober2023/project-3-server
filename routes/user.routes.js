// ********* require fileUploader in order to use it *********
const fileUploader = require("../config/cloudinary.config");

const express = require("express");
const router = express.Router();

 

// INIT: Requires the model for User
const User = require("../models/User.model")
router.get('/allusers', (req, res, next) =>{
    User.find()
    .then((allUsers) =>{
        console.log(allUsers)
        res.json(allUsers)
    })
})

// POST "/uploaduserpicture" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
router.post("/uploaduserpicture", fileUploader.single("userPicture"), (req, res, next) => {
    // console.log("file is: ", req.file)
   
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    
    // Get the URL of the uploaded file and send it as a response.
    // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
    
    res.json({ fileUrl: req.file.path });
  });

module.exports = router;