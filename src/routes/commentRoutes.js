const express = require('express');
const { createComment, getComment, updateComment, deleteComment } = require('../controllers/commentController');
const { authenticate, authorize } = require('../middlewares/auth');

const router = express.Router();

router.post('/', authenticate, authorize(['admin', 'manager', 'user']), createComment);
router.get('/:id', authenticate, getComment);
router.put('/:id', authenticate, authorize(['admin', 'manager', 'user']), updateComment);
router.delete('/:id', authenticate, authorize(['admin', 'manager', 'user']), deleteComment);

module.exports = router;
