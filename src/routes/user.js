const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/allusers', userController.allUsers);
router.get('/usingRegex', userController.usingRegex)

module.exports = router;