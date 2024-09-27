import {Router} from "express";
import { getVolunteerById, getVolunteers } from "../handlers/volunteer";


const router = Router();

router.get('/', getVolunteers);
router.get('/:id', getVolunteerById);


export default router;