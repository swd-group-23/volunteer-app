import {Router} from "express";
import { getVolunteerById, getVolunteers, createVolunteer, postVolunteerMatch, updateVolunteer, getVolunteersMongo, getVolunteerByIdMongo, createVolunteerMongo, updateVolunteerMongo, postVolunteerMatchMongo } from "../handlers/volunteer";
import { checkSchema } from "express-validator";
import { createVolunteerValidation } from "../utils/validationSchemas";


const router = Router();

router.get('/mongo',getVolunteersMongo)
router.get('/mongo/:id',getVolunteerByIdMongo)
router.post('/mongo/match', postVolunteerMatchMongo);
router.post('/mongo',checkSchema(createVolunteerValidation),createVolunteerMongo)
router.patch('/mongo',updateVolunteerMongo)


router.get('/', getVolunteers);
router.get('/:id', getVolunteerById);
router.post('/match', postVolunteerMatch);
router.post('/', checkSchema(createVolunteerValidation),  createVolunteer);
router.patch('/', checkSchema(createVolunteerValidation), updateVolunteer);

export default router;