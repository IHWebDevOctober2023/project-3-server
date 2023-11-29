const express = require("express");
const router = express.Router();
//dont forget to require the models you are trying to access!



router.get("/home", (req, res, next) => {
  Posts.find()
    .then((allPosts) => res.json(allPosts))
});


module.exports = router;
