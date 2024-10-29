import {Router} from "express";
import { getHistory, getHistoryById, getHistoryByIdMongo, getHistoryMongo } from "../handlers/history";


const router = Router();

//mongo routes
router.get('/mongo/:id', getHistoryByIdMongo);
router.get('/mongo', getHistoryMongo);

router.get('/:id', getHistoryById);
router.get('/', getHistory);


export default router;