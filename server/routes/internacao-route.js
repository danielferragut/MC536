const express = require("express");
const internacaoController = require('../controllers/internacao-controller');
router = express.Router();

router.route('/')
    .get(internacaoController.getInternacaos)
    .post(internacaoController.createInternacao);

router.route('/:primaryKey')
    .get(internacaoController.getInternacaoPrimary);

module.exports = router;