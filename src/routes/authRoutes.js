const express = require('express');
const { signup, verifyOTP, signin, getMe, refreshToken } = require('../controllers/authController');
const { authenticate } = require('../middlewares/auth');
const validateRequest = require('../middlewares/validateRequest');

const router = express.Router();

router.post('/signup', validateRequest, signup);
router.post('/verify-otp', validateRequest, verifyOTP);
router.post('/signin', validateRequest, signin);
router.get('/me', authenticate, getMe);
router.post('/refresh-token', refreshToken);

module.exports = router;
