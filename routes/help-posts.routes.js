const express = require("express");
const router = express.Router();
const HelpPost = require("../models/HelpPost.model");

router.get("/:helpId", (req, res, next) => {

    const {helpId} = req.params

    HelpPost.findById(helpId)
    
        .populate("creator")
        .then((helpPost) => {
            const {title, volunteers, description,location,category, creator } = helpPost
            res.send({title, volunteers, description,location,category, creator})
        })
        .catch((err)=>("couldn't find help post", err))
});

router.post("/createhelp", (req, res, next) => {
   
    const { title, location, description, helpImageUrl, creator, category} = req.body;
    console.log("reqbody", req.body);
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
        console.log(createdHelp);
        console.log("este es el req",createdHelp);
        })
        .catch((err)=>(err))
});

module.exports = router;
