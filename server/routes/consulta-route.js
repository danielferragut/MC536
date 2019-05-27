const express = require("express");
const consultaController = require('../controllers/consulta-controller');
router = express.Router();

router.route('/')
    .get(consultaController.getConsultas);

router.route('/:primaryKey')
    .get(consultaController.getConsultaPrimary);
    // .post(consultaController.postconsulta);

module.exports = router;