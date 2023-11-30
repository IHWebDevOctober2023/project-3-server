const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");


router.get("/:userId", (req, res, next) => {
const id = req.params.userId;
console.log(req.params);

    User.findById(id)
    .populate("helpPosts")
        .then((user) => {
            const {tokens, helpPosts, _id, email, name, profilePicture, testimonies} = user;
            res.send({tokens, helpPosts, _id, email, name, profilePicture, testimonies});
           // console.log(user)
        })
        .catch((err)=>console.log(err))
});

module.exports = router;
