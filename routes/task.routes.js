const express = require("express");
const router = express.Router();
const Task = require("../models/Task.model");

router.post('/task', (req, res, next) => {
  // Extract task data from the request body
  const {
    taskDescription,
    taskTime,
    taskWeekDay,
  
  } = req.body;

  // Create a new task
  Task.create({
    taskDescription,
    taskTime,
    taskWeekDay,
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

router.get('/tasks', (req, res, next) =>{
    Task.find()
    .then((tasks) => {

        res.json(tasks)
    })
    .catch((error) => console.log(error))
})

module.exports = router;