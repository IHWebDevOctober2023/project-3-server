

const express = require("express");
const router = express.Router();
const Task = require("../models/Task.model");
const Family = require("../models/Family.model")

router.post('/task', (req, res, next) => {
  // Extract task data from the request body
  const {
    taskAssignedTo,
    taskDescription,
    taskTime,
    taskWeekDay,
    taskFamily
  
  } = req.body;

  // Create a new task
  Task.create({
    taskDescription,
    taskTime,
    taskWeekDay,
    taskAssignedTo,
    taskFamily
  })

  .then((newTask) => {
    // Send the newly created task as a JSON response
    res.json(newTask);
  })
  .catch((error) => {
    console.error(error);
    // Send an error response if there's an issue creating the task
  });
});

router.get("/tasks/:_id", (req, res, next) =>{
  const familyId= req.params._id  
  Task.find({taskFamily:familyId})
    .then((tasks) => {
        res.json(tasks)
    })
    .catch((error) => console.log(error))
})

module.exports = router;
