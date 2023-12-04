

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

router.get("/tasks/:_id/:dayName", (req, res, next) => {
  const dayName = req.params.dayName
  const currentDate = new Date();
  console.log(currentDate);
  const familyId = req.params._id
  Task.find({ taskFamily: familyId, taskWeekDay: dayName })
    .populate("taskAssignedTo")
    .then((tasks) => {
      res.json(tasks)
    })
    .catch((error) => console.log(error))
})


///////////////////// MANAGING FAMILY PERFORMANCE ////////////////////
// CREATING a route to calculate TASKS by Family
 router.get("/tasks/:_id/:tasksByFamily", (req, res, next) => {
  const familyId = req.params._id
  Task.find({ taskFamily: familyId})
    .then((TasksbyFamily) => {
      res.json(TasksbyFamily)
    })
    .catch((error) => console.log(error))
})
// CREATING a route to calculate all the Tasks DONE by Family
router.get("/tasks/:_id/:tasksDoneByFamily", (req, res, next) => {
  const familyId = req.params._id
  Task.find({ taskFamily: familyId, taskIsDone: true })
    .then((TasksDonebyFamily) => {
      res.json(TasksDonebyFamily)
    })
    .catch((error) => console.log(error))
})
// CREATING a route to calculate all the Tasks PENDING by Family
router.get("/tasks/:_id/:tasksPendingByFamily", (req, res, next) => {
  const familyId = req.params._id
  Task.find({ taskFamily: familyId, taskIsDone: true })
    .then((TasksPendingbyFamily) => {
      res.json(TasksPendingbyFamily)
    })
    .catch((error) => console.log(error))
})

////////////////////// MANAGING USER PERFORMANCE ////////////////////////
// CREATING a route to calculate all the Tasks DONE by User
router.get("/tasks/:_id/:tasksDoneByUserDone", (req, res, next) => {
  const familyId = req.params._id
  Task.find({ taskAssignedTo: familyId, taskIsDone: true })
    .then((TasksDonebyUser) => {
      res.json(TasksDonebyUser)
    })
    .catch((error) => console.log(error))
})
// CREATING a route to calculate all the Tasks PENDING by User
router.get("/tasks/:_id/:tasksPendingByUserDone", (req, res, next) => {
  const familyId = req.params._id
  Task.find({ taskAssignedTo: familyId, taskIsDone: false })
    .then((TasksDonebyUser) => {
      res.json(TasksDonebyUser)
    })
    .catch((error) => console.log(error))
})

module.exports = router;
