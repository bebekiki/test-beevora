const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/read', userController.read);
router.post('/update', userController.update);
router.delete('/delete', userController.delete);

module.exports = router;