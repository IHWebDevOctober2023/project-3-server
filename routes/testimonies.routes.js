const express = require("express");
const router = express.Router();
//
const mongoose = require("mongoose");
const Testimony = require("../models/Testimony.model");

// /testimonies/landing
router.get("/landing", (req, res, next) => {
    Testimony.find().slice(4, 0)
        .then((allTestimonies) => res.json(allTestimonies))
});

router.get("/createtestimony", (req, res, next) => {
    Testimony.find()
    .then((alltestimonies) => {
        console.log("Alltestimonies: ", alltestimonies);
    
    })/* slice(4, 0)
        .then((allTestimonies) => res.json(allTestimonies)) */
});

router.post("/createtestimony", (req, res, next) => {
    const { text, rating, creator } = req.body;
    
    Testimony.create({
        text,
        rating,
        creator,
    })
    .then((createdTestimony) => {
        res.json(createdTestimony)
        console.log(createdTestimony);
        console.log("este es el req",creator);
        })
        .catch((err)=>(err))
});

module.exports = router;
