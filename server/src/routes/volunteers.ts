import {Router} from "express";
import { getVolunteerById, getVolunteers, postVolunteerMatch } from "../handlers/volunteer";


const router = Router();

router.get('/', getVolunteers);
router.get('/:id', getVolunteerById);
router.post('/match', postVolunteerMatch);


export default router;