const express = require('express');
const { getUser, updateUser, deleteUser } = require('../controllers/userController');
const { authenticate, authorize } = require('../middlewares/auth');

const router = express.Router();

router.get('/:id', authenticate, authorize(['admin']), getUser);
router.put('/:id', authenticate, authorize(['admin', 'user']), updateUser);
router.delete('/:id', authenticate, authorize(['admin']), deleteUser);

module.exports = router;
