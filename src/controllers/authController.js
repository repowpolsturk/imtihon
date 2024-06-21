const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const main = require('../utils/sendOTP');
const db = require('../config/db');
const { generate} = require('otp-generator')
const {userValidate}= require('../validators/validator')

let otps = {};

exports.signup = async (req, res) => {
    const { error } = await userValidate(req.body);
    if (error) {
        console.log('Validation Error:', error.details);
        return res.status(400).json({ msg: "Bad request" });
    }

    try {
        console.log(req.body);
        const { email, username, password, role, firstName, lastName } = req.body;

        // Ensure the password is hashed before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ email, username, password: hashedPassword, role, firstName, lastName });

        const otp = generate(5, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        });

        otps[user.id] = otp;

        main(otp, email)
        .then(()=>{console.log('Jonatildi')})
        res.status(201).json({ message: 'User created', userId: user.id, otpSent: true });
    } catch (err) {
        console.log('Internal Server Error:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.verifyOTP = [
  body('userId').isUUID(),
  body('otp').isLength({ min: 6, max: 6 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId, otp } = req.body;
    if (otps[userId] === otp) {
      db('users').where({ id: userId }).update({ status: 'active' }).then(() => {
        delete otps[userId];
        res.status(200).json({ message: 'OTP verified, account activated' });
      });
    } else {
      res.status(400).json({ message: 'Invalid OTP' });
    }
  }
];

exports.signin = [
  body('email').isEmail(),
  body('password').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await db('users').where({ email }).first();
      if (!user || user.status !== 'active') {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const { accessToken, refreshToken } = generateToken(user);
      res.status(200).json({ accessToken, refreshToken });
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
];

exports.getMe = (req, res) => {
  db('users').where({ id: req.user.id }).first().then(user => {
    res.status(200).json(user);
  }).catch(err => {
    res.status(500).json({ message: 'Internal Server Error' });
  });
};

exports.refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: 'No refresh token provided' });
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateToken(decoded);
    res.status(200).json({ accessToken, refreshToken: newRefreshToken });
  });
};
