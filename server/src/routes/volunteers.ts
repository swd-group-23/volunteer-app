import {Router} from "express";
import { getVolunteerById, getVolunteers, createVolunteer, postVolunteerMatch, updateVolunteer } from "../handlers/volunteer";
import { checkSchema } from "express-validator";
import { createVolunteerValidation } from "../utils/validationSchemas";


const router = Router();

router.get('/', getVolunteers);
router.get('/:id', getVolunteerById);
router.post('/match', postVolunteerMatch);
router.post('/', checkSchema(createVolunteerValidation),  createVolunteer);
router.patch('/', checkSchema(createVolunteerValidation), updateVolunteer);

export default router;