

const express = require("express");
const router = express.Router();

// requires the model for Task, Family and User
const Task = require("../models/Task.model");

router.get('/task', (req, res)=>{
    Task.find()
    .then((allTask) =>{
        res.json(allTask)
        console.log(allTask)
    })
    .catch((error) => console.log(error))
})

module.exports = router;

    