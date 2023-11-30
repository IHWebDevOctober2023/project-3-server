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



module.exports = router;