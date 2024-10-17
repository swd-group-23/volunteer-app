import {Router} from "express";
import { createEvent, deleteEventByIndex, getEvents,getEventsById } from "../handlers/events";
import { checkSchema } from "express-validator";
import { createEventValidation } from "../utils/validationSchemas";


const router = Router();

router.get('/', getEvents);
router.get('/:id', getEventsById);
router.post('/', checkSchema(createEventValidation),  createEvent);
router.delete('/:id', deleteEventByIndex)
export default router;