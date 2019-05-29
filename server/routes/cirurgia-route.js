const express = require("express");
const cirurgiaController = require('../controllers/cirurgia-controller');
router = express.Router();

router.route('/')
    .get(cirurgiaController.getCirurgias)
    .post(cirurgiaController.createCirurgia);

router.route('/:primaryKey')
    .get(cirurgiaController.getCirurgiaPrimary);

module.exports = router;