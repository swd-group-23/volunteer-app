import {Router} from "express";
import { getVolunteerById, getVolunteers, createVolunteer } from "../handlers/volunteer";


const router = Router();

router.get('/', getVolunteers);
router.get('/:id', getVolunteerById);
router.post('/', createVolunteer);

export default router;