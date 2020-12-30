const express = require('express');
const router = express.Router();
const parkingController = require('../controllers/parking');

router.post('/create', parkingController.create);
router.post('/assign', parkingController.assign);
router.post('/deassign', parkingController.deassign);

module.exports = router;