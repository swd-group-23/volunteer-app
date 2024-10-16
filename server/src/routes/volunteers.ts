import {Router} from "express";
import { getVolunteerById, getVolunteers, createVolunteer, postVolunteerMatch } from "../handlers/volunteer";
import { checkSchema } from "express-validator";
import { createVolunteerValidation } from "../utils/validationSchemas";


const router = Router();

router.get('/', getVolunteers);
router.get('/:id', getVolunteerById);
router.post('/match', postVolunteerMatch);
router.post('/', checkSchema(createVolunteerValidation),  createVolunteer);

export default router;