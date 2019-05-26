const express = require("express");
const medicoController = require('../controllers/medico-controller');
router = express.Router();

router.route('/')
    .get(medicoController.getMedicos);

router.route('/:crm')
    .get(medicoController.getMedicoPrimary);
    // .post(medicoController.postmedico);

module.exports = router;