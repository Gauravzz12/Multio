const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/refresh', authController.refreshToken);
router.post('/logout', authController.logOut);


module.exports = router;
 