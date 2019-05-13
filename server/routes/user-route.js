const express = require("express");
const database = require('../config/database');

router = express.Router();

router.get("/", async function (req, res) {
    try{
        result = await database.query("SELECT * FROM users");
        res.status(200).json(result.rows[0]);
    }catch(err){
        throw(err);
    }
});



module.exports = router;