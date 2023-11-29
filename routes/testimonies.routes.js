const express = require("express");
const router = express.Router();

// /testimonies/landing
router.get("/landing", (req, res, next) => {
    Testimonies.find().slice(4, 0)
        .then((allTestimonies) => res.json(allTestimonies))
});


module.exports = router;
