const express = require('express');
const { createProject, getProject, updateProject, deleteProject } = require('../controllers/projectController');
const { authenticate, authorize } = require('../middlewares/auth');

const router = express.Router();

router.post('/', authenticate, authorize(['admin', 'manager']), createProject);
router.get('/:id', authenticate, getProject);
router.put('/:id', authenticate, authorize(['admin', 'manager']), updateProject);
router.delete('/:id', authenticate, authorize(['admin', 'manager']), deleteProject);

module.exports = router;
