import express from 'express'

import authAPI from './auth'
import eventsAPI from './events'

var router = express.Router();

router.use('/auth', authAPI)
router.use('/events', eventsAPI)

export default router;