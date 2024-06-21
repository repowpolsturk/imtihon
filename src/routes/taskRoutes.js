const express = require('express');
const { createTask, getTask, updateTask, deleteTask } = require('../controllers/taskController');
const { authenticate, authorize } = require('../middlewares/auth');

const router = express.Router();

router.post('/', authenticate, authorize(['admin', 'manager', 'user']), createTask);
router.get('/:id', authenticate, getTask);
router.put('/:id', authenticate, authorize(['admin', 'manager', 'user']), updateTask);
router.delete('/:id', authenticate, authorize(['admin', 'manager', 'user']), deleteTask);

module.exports = router;
