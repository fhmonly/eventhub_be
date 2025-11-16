import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware';
import { authAdminMiddleware } from '../middleware/roleMiddleware';
import { getEventDetailController, getEventsController } from '../controller/events/showEventController';
import { createEventController } from '../controller/events/createEventController';
import { deleteEventController, updateEventController } from '../controller/events/updateEventController';
var router = express.Router();

router.use('/', authMiddleware)
router.get('/', ...getEventsController)
router.get('/:id', ...getEventDetailController)
router.use('/', authAdminMiddleware)
router.post('/', ...createEventController)
router.put('/:id', ...updateEventController)
router.delete('/:id', ...deleteEventController)

export default router