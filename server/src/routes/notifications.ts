import {Router} from "express";
import {getNotificationsMongo, getNotifsByIdMongo, createNotificationsMongo, deleteNotificationMongo, getNotifications ,getNotifsById ,createNotifications, deleteNotification} from "../handlers/notifications";

const router = Router();
router.get('/mongo', getNotificationsMongo);
router.get('/mongo/:id', getNotifsByIdMongo);
router.post('/mongo', createNotificationsMongo);
router.delete('/mongo/:id', deleteNotificationMongo);


router.get('/', getNotifications);
router.get('/:id', getNotifsById);
router.post('/', createNotifications);
router.delete('/:id', deleteNotification);

export default router;