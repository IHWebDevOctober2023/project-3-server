const express = require("express");
const router = express.Router();
//
const mongoose = require("mongoose");
const Testimony = require("../models/Testimony.Model");

// /testimonies/landing
router.get("/landing", (req, res, next) => {
    Testimony.find().slice(4, 0)
        .then((allTestimonies) => res.json(allTestimonies))
});

router.get("/createtestimony", (req, res, next) => {
    Testimony.find().slice(4, 0)
        .then((allTestimonies) => res.json(allTestimonies))
});

router.post("/createtestimony", (req, res, next) => {
    const { text, rating, creator } = req.body;
    const user = req.session
    // const {_id} = req.payload
    Testimony.create({
        text,
        rating,
        creator
    
        
    })
    .then((createdTestimony) => {
        res.json(createdTestimony)
        console.log(createdTestimony._id);
        console.log("este es el req",req.session.currentUser);
        })
        .catch((err)=>(err))
});

module.exports = router;
