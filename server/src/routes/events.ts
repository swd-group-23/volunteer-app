import {Router} from "express";
import { createEvent, deleteEventByIndex, getEvents,getEventsById } from "../handlers/events";


const router = Router();

router.get('/', getEvents);
router.get('/:id', getEventsById);
router.post('/', createEvent);
router.delete('/:id', deleteEventByIndex)
export default router;