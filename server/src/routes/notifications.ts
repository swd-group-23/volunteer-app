import {Router} from "express";
import {getNotifications ,getNotifsById ,createNotifications, /*deleteNotification*/ } from "../handlers/notifications";


const router = Router();
router.get('/', getNotifications);
router.get('/:id', getNotifsById);
router.post('/', createNotifications);
//router.delete('/:id', deleteNotification);

export default router;