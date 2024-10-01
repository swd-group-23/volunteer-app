import {Router} from "express";
import { getVolunteerById, getVolunteers, createVolunteer, postVolunteerMatch } from "../handlers/volunteer";


const router = Router();

router.get('/', getVolunteers);
router.get('/:id', getVolunteerById);
router.post('/match', postVolunteerMatch);
router.post('/', createVolunteer);

export default router;