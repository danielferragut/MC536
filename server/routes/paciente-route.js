const express = require("express");
const pacienteController = require('../controllers/paciente-controller');
router = express.Router();

router.route('/')
    .get(pacienteController.getPacientes)
    .post(pacienteController.createPaciente);

router.route('/:cpf')
    .get(pacienteController.getPacientePrimary)

module.exports = router;