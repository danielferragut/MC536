const express = require("express");
const atendimentoController = require('../controllers/atendimento-controller');
router = express.Router();

router.route('/')
    .get(atendimentoController.getAtendimentos)
    .post(atendimentoController.createAtendimento);

router.route('/:primaryKey')
    .get(atendimentoController.getAtendimentoPrimary);

module.exports = router;