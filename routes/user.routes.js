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

router.post("/uploaduserpicture", fileUploader.single("userPicture"), async (req, res, next) => {
  try {
    if (!req.file) {
      throw new Error("No file uploaded!");
    }
    const userId = req.body.userId.toString();
    const cloudinaryUrl = req.file.path;
    const updatedUser = await User.findByIdAndUpdate(userId, { userPicture: cloudinaryUrl }, { new: true });
    console.log("userId", userId);
    console.log("clodinaryUrl",cloudinaryUrl)
    if (!updatedUser) {
      throw new Error("User not found or failed to update!");
    }

    res.json({ fileUrl: cloudinaryUrl });
  } catch (error) {
    console.error("Error uploading user picture:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


/* // POST "/uploaduserpicture" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
router.post("/uploaduserpicture", fileUploader.single("userPicture"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
// we have to set the new picture uploaded to the backend.
  const userId = req.body.userId.toString();
  User.findByIdAndUpdate(userId, {userPicture: req.file.path }, {new: true})
  console.log("file is: ", req.file.path)
  console.log("User ID:", userId);
    res.json({ fileUrl: req.file.path });
  }); */

module.exports = router;