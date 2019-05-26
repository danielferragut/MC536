const express = require("express");
const pacienteController = require('../controllers/paciente-controller');
router = express.Router();

router.route('/')
    .get(pacienteController.getPacientes);

router.route('/:cpf')
    .get(pacienteController.getPacientePrimary);
    // .post(pacienteController.postPaciente);

module.exports = router;