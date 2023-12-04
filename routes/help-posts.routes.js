const express = require("express");
const router = express.Router();
const HelpPost = require("../models/HelpPost.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

router.get("/:helpId", (req, res, next) => {

    const { helpId } = req.params
    console.log(helpId);

    HelpPost.findById(helpId)

        .populate("creator")
        .then((foundHelpPost) => {
            const {title, description, location, category, volunteer, creator} = foundHelpPost
            console.log("helpPost", {foundHelpPost});

            res.send({ foundHelpPost })
        })

        .catch((err) => {
            console.log("couldn't find help post", err)
            next(err)
        })
});


router.post("/createhelp", (req, res, next) => {

    const { title, location, description, helpImageUrl, creator, category } = req.body;

    HelpPost.create({
        title,
        location,
        description,
        helpImageUrl,
        creator,
        category,

    })
        .then((createdHelp) => {
            res.json(createdHelp)
            /* console.log(createdHelp);
            console.log("este es el req", createdHelp); */
        })
        .catch((err) => (err))
});

module.exports = router;
