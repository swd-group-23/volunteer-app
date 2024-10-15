import {Router} from "express";
import { getHistory, getHistoryById } from "../handlers/history";


const router = Router();


router.get('/:id', getHistoryById);
router.get('/', getHistory);


export default router;