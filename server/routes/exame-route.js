const express = require("express");
const exameController = require('../controllers/exame-controller');
router = express.Router();

router.route('/')
    .get(exameController.getExames)
    .post(exameController.createExame);

router.route('/:primaryKey')
    .get(exameController.getExamePrimary);

module.exports = router;