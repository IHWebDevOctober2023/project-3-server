const express = require("express");
const router = express.Router();

// INIT: Requires the model for Family
const Family = require("../models/Family.model");
const User = require("../models/User.model");
router.get("/family/all", (req, res, next) => {
    Family.find()
        .then((allfamilies) => {
            console.log("test", allfamilies)
            res.json(allfamilies)
        })
        .catch(error => console.log(error))
})

// STEP 1 -  Creating a new Family
router.post("/create", (req, res) => {
    const familyName = req.body.familyName
    const userId = req.body.userId

    // Creating a random number for get a FamilyCode
    function generateRandomNumber() {
        // Step 1 - Generate a random number between 0 and 1
        const randomFraction = Math.random();
        // Step 2 - Scale the random fraction to fit the range [100000, 999999]
        const randomNumberInRange = Math.floor(randomFraction * (999999 - 100000 + 1)) + 100000;
        return randomNumberInRange;
    }
// STEP 1.1 - After create the family, you are the first member
    const newFamilyCode = generateRandomNumber()
    Family.create({ familyCode: newFamilyCode, familyName: familyName, familyMembers: [userId] })
        .then((newFamilyCreated) => {
            // This return is required for the next then step
            return newFamilyCreated
        })
        .then((newFamilyCreated) => {
            return User.findByIdAndUpdate(userId, { family: newFamilyCreated._id })
                .then(() => newFamilyCreated)
        })
        .then((newFamilyCreated) => {
            res.json(newFamilyCreated)
        })
        .catch(error => console.log(error))
})

// STEP 2 - Creating a Route a NEW MEMBER to join the family typing the FAMILY CODE
router.post("/join", (req, res) => {
    const familyCode = req.body.familyCode
    const userId = req.body.userId
    Family.find({ familyCode })
        .then((familyFound) => {
            // Warning: The Find Method always returns and ARRAY!
            const familyId = familyFound[0]._id
            return User.findByIdAndUpdate(userId, { family: familyId }, { new: true })
        })
        .then((updatedUser) => {
            return Family.findByIdAndUpdate(updatedUser.family, { $push: { familyMembers: userId } })
        })
        .then((familyUpdated) => {
            res.json(familyUpdated)
        })
        .catch(error => console.log(error))
})


// Creating a new Task

router.post("/createtask", (req,res) =>{
    const task = req.body.task
    res.json(task)
})

module.exports = router;

// Creating a route to populate de family members

router.get("/familymembers/:_id", (req, res)=>{
const familyId= req.params._id
Family.findById(familyId)
.populate("familyMembers")
.then ((familyFound)=>{
    res.json(familyFound.familyMembers)
})
})
