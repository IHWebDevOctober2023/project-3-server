const express = require("express");
const router = express.Router();
const Task = require("../models/Task.model");
const Family = require("../models/Family.model");

router.post("/task", (req, res, next) => {
  const {
    taskAssignedTo,
    taskDescription,
    taskTime,
    taskWeekDay,
    taskFamily,
    taskIsDone,
  } = req.body;
  Task.create({
    taskDescription,
    taskTime,
    taskWeekDay,
    taskAssignedTo,
    taskFamily,
    taskIsDone,
  })
    .then((newTask) => {
      res.json(newTask);
    })
    .catch((error) => {
      console.error(error);
    });
});
router.get("/tasks/:_id/tasksByFamily", (req, res, next) => {
  const familyId = req.params._id;
  console.log("hello", familyId);
  const response = {
    tasksByFamily: 0,
    tasksDoneByFamily: 0,
    tasksPendingByFamily: 0,
    tasksDoneByUser: [],
    tasksPendingByUser: [],
    kpiByFamily: 0,
    kpiByUser: 0,
  };
  Task.find({ taskFamily: familyId })
    .then((tasksbyFamily) => {
      response.tasksByFamily = tasksbyFamily.length;
      response.tasksDoneByFamily = tasksbyFamily.filter((eachTask) => {
        return eachTask.taskIsDone === true;
      }).length;
      response.tasksPendingByFamily = tasksbyFamily.filter((eachTask) => {
        return eachTask.taskIsDone === false;
      }).length;
      res.json(response);
    })
    .catch((error) => console.log(error));
});
router.get("/tasks/:_id/:dayName", (req, res, next) => {
  const dayName = req.params.dayName;
  const currentDate = new Date();
  console.log(currentDate);
  const familyId = req.params._id;
  Task.find({ taskFamily: familyId, taskWeekDay: dayName })
    .populate("taskAssignedTo")
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((error) => console.log(error));
});
router.delete("/deletetask/:_id", (req, res) => {
  const taskId = req.params._id;
  Task.findByIdAndDelete(taskId)
    .then((taskDeleted) => {
      res.json("deletetask");
    })
    .catch((error) => console.log(error));
});
router.post("/taskisdone/:_id", (req, res) => {
  const taskIsDone = req.body.taskIsDone;
  console.log("TASK IS DONE:", taskIsDone);
  Task.findByIdAndUpdate(req.params._id, { taskIsDone })
    .then((taskIsDone) => {
      res.json("taskisdone");
    })
    .catch((error) => console.log(error));
});
module.exports = router;
