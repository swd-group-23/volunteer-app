import {Router} from "express";
import { getUsers, getUsersById, createUser, loginUser} from "../handlers/users";


const router = Router();

router.get('/', getUsers);
router.get('/login', loginUser);
router.get('/:id', getUsersById);
router.post('/login', loginUser);
router.post('/', createUser);


export default router;