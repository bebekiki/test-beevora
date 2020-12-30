const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search');

router.get('/etage', searchController.etage);
router.get('/user', searchController.user);

module.exports = router;