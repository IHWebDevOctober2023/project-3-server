const fileUploader = require("../config/cloudinary.config");
const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
router.get("/allusers", (req, res, next) => {
  User.find().then((allUsers) => {
    console.log(allUsers);
    res.json(allUsers);
  });
});
router.post(
  "/uploaduserpicture",
  fileUploader.single("userPicture"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        throw new Error("No file uploaded!");
      }
      const userId = req.body.userId.toString();
      const cloudinaryUrl = req.file.path;
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { userPicture: cloudinaryUrl },
        { new: true }
      );
      console.log("userId", userId);
      console.log("clodinaryUrl", cloudinaryUrl);
      if (!updatedUser) {
        throw new Error("User not found or failed to update!");
      }
      res.json({ fileUrl: cloudinaryUrl });
    } catch (error) {
      console.error("Error uploading user picture:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);
module.exports = router;
