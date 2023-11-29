const express = require("express");
const router = express.Router();

// requires the model for Family
const Family = require("../models/Family.model")
router.get("/family/all", (req, res, next) =>{
    Family.find()
    .then((allfamilies) =>{
        console.log("test", allfamilies)
        res.json(allfamilies)
    })
    .catch(error => console.log(error))
})


module.exports = router;

/* 
This is a test
 */