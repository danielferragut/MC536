const express = require("express");
const consultaController = require('../controllers/consulta-controller');
router = express.Router();

router.route('/')
    .get(consultaController.getConsultas)
    .post(consultaController.createConsulta);

router.route('/:primaryKey')
    .get(consultaController.getConsultaPrimary);

module.exports = router;