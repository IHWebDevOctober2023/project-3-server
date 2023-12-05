

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
    taskFamily,
    taskIsDone

  } = req.body;

  // Create a new task
  Task.create({
    taskDescription,
    taskTime,
    taskWeekDay,
    taskAssignedTo,
    taskFamily,
    taskIsDone
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

router.get("/tasks/:_id/:dayName", (req, res, next) => {
  const dayName = req.params.dayName
  const currentDate = new Date();
  console.log(currentDate);
 // const dayOfWeek = currentDate.getDay();
  //const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  //const dayName = daysOfWeek[dayOfWeek];
  const familyId = req.params._id
  Task.find({ taskFamily: familyId, taskWeekDay: dayName})
    .then((tasks) => {
      res.json(tasks)
    })
    .catch((error) => console.log(error))
})
router.delete("/deletetask/:_id", (req, res) =>{
  const taskId = req.params._id
  Task.findByIdAndDelete(taskId)
.then((taskDeleted) =>{
  res.json("deletetask")
})
.catch((error) => console.log(error))
})

router.post("/taskisdone/:_id", (req, res) =>{
  const taskIsDone = req.body.taskIsDone;
  console.log("TASK IS DONE:",taskIsDone);
  Task.findByIdAndUpdate(req.params._id, {taskIsDone})
  .then((taskIsDone) =>{
    res.json("taskisdone")

  })
  .catch((error) => console.log(error))
})
module.exports = router;
