const express = require("express");
const medicoController = require('../controllers/medico-controller');
router = express.Router();

router.route('/')
    .get(medicoController.getMedicos)
    .post(medicoController.createMedico);

router.route('/:crm')
    .get(medicoController.getMedicoPrimary);

module.exports = router;