const express = require("express");
const pacienteController = require('../controllers/paciente-controller');
router = express.Router();

router.route('/')
    .get(pacienteController.getAllPacientes);

router.route('/:cpf')
    .get(pacienteController.getPaciente);
    // .post(pacienteController.postPaciente);

module.exports = router;