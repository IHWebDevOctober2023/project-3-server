const express = require("express");
const router = express.Router();
const HelpPost = require("../models/HelpPost.model");

/* router.get("/createtehelp", (req, res, next) => {
    HelpPost.find()
        .then((allHelpPosts) => res.json(allHelpPosts))
}); */

router.post("/createhelp", (req, res, next) => {
    const { title, location, description, helpImageUrl, creator, category} = req.body;
    
    HelpPost.create({
        title,
        location,
        description,
        helpImageUrl,
        creator,
        category,
        
    })
    .then((createdTestimony) => {
        res.json(createdTestimony)
        console.log(createdTestimony);
        console.log("este es el req",creator);
        })
        .catch((err)=>(err))
});

module.exports = router;
