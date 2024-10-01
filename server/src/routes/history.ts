import {Router} from "express";
import { getHistoryById } from "../handlers/history";


const router = Router();


router.get('/:id', getHistoryById);


export default router;