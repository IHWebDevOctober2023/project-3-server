const express = require("express");
const router = express.Router();
const Family = require("../models/Family.model");
const User = require("../models/User.model");

router.get("/family/all", (req, res, next) => {
  Family.find()
    .then((allfamilies) => {
      console.log("test", allfamilies);
      res.json(allfamilies);
    })
    .catch((error) => console.log(error));
});
router.post("/create", (req, res) => {
  const familyName = req.body.familyName;
  const userId = req.body.userId;
  function generateRandomNumber() {
    const randomFraction = Math.random();

    const randomNumberInRange =
      Math.floor(randomFraction * (999999 - 100000 + 1)) + 100000;
    return randomNumberInRange;
  }
  const newFamilyCode = generateRandomNumber();
  Family.create({
    familyCode: newFamilyCode,
    familyName: familyName,
    familyMembers: [userId],
  })
    .then((newFamilyCreated) => {
      return newFamilyCreated;
    })
    .then((newFamilyCreated) => {
      return User.findByIdAndUpdate(userId, {
        family: newFamilyCreated._id,
      }).then(() => newFamilyCreated);
    })
    .then((newFamilyCreated) => {
      res.json(newFamilyCreated);
    })
    .catch((error) => console.log(error));
});

router.post("/join", (req, res) => {
  const familyCode = req.body.familyCode;
  const userId = req.body.userId;
  Family.find({ familyCode })
    .then((familyFound) => {
      const familyId = familyFound[0]._id;
      return User.findByIdAndUpdate(
        userId,
        { family: familyId },
        { new: true }
      );
    })
    .then((updatedUser) => {
      return Family.findByIdAndUpdate(updatedUser.family, {
        $push: { familyMembers: userId },
      });
    })
    .then((familyUpdated) => {
      res.json(familyUpdated);
    })
    .catch((error) => console.log(error));
});

router.post("/createtask", (req, res) => {
  const task = req.body.task;
  res.json(task);
});

module.exports = router;

router.get("/familymembers/:_id", (req, res) => {
  const familyId = req.params._id;
  Family.findById(familyId)
    .populate("familyMembers")
    .then((familyFound) => {
      res.json(familyFound.familyMembers);
    });
});
