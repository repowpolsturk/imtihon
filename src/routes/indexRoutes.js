const {Router} = require('express') 

const authRoutes = require('./authRoutes');
const projectRoutes = require('./projectRoutes');
const taskRoutes = require('./taskRoutes');
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');

const router = Router()


router.use('/auth', authRoutes)
router.use('/project', projectRoutes)
router.use('/task', taskRoutes)
router.use('/user', userRoutes)
router.use('/comment', commentRoutes)

module.exports = router

