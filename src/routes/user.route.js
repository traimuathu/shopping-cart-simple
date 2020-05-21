const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

const handle = require('../utils/handle');

// Login
router.get('/login', userController.LoginPage);

router.post('/login', userController.Login);
// router.post('/login', passport.authenticate('local.login', {
//   successRedirect: '/',
//   failureRedirect: '/user/login',
//   failureFlash: false
// }));

// Register
router.get('/register', userController.RegisterPage);

router.post('/register', userController.Register);

router.get('/logout', handle.isLoggedIn, userController.Logout);

module.exports = router;