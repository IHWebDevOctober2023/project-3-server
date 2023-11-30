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


module.exports = router;
