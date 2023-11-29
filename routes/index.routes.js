const express = require("express");
const router = express.Router();
//
const mongoose = require("mongoose");
const HelpPost = require("../models/HelpPost.Model");



router.get("/home", (req, res, next) => {
  HelpPost.find()
    .then((allPosts) => res.json(allPosts))
});


module.exports = router;

