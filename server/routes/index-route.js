const express = require("express");
const router = express.Router();


router.get("/", function (req, res) {
    res.send("Index!").status(200);
});



module.exports = router;