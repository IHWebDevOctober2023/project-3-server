const express = require("express");
const router = express.Router();

// requires the model  User
const User = require("../models/User.model")
router.get('/alluser', (req, res, next) =>{
    User.find()
    .then((allUser) =>{
        console.log(allUser)
        res.json(allUser)
    })
})



module.exports = router;