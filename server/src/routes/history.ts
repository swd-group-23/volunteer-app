import {Router} from "express";
import { getHistory, getHistoryById } from "../handlers/history";


const router = Router();

//mongo routes
router.get('/mongo/:id', getHistoryById);
router.get('/mongo', getHistory);

router.get('/:id', getHistoryById);
router.get('/', getHistory);


export default router;