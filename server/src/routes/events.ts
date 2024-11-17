import {Router} from "express";
import { createEvent, createEventMongo, deleteEventById, deleteEventMongo, getEvents,getEventsById, getEventsByIdMongo, getEventsMongo } from "../handlers/events";
import { checkSchema } from "express-validator";
import { createEventValidation } from "../utils/validationSchemas";


const router = Router();

router.get('/mongo', getEventsMongo)
router.get('/mongo/:id', getEventsByIdMongo)
router.post('/mongo',checkSchema(createEventValidation),createEventMongo)
router.delete('/mongo/:id', deleteEventMongo)

router.get('/', getEvents);
router.get('/:id', getEventsById);
router.post('/', checkSchema(createEventValidation),  createEvent);
router.delete('/:id', deleteEventById)
export default router;