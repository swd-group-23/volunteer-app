import {Router} from "express";
import { getUsers, getUsersById, createUser, loginUser, deleteUser} from "../handlers/users";


const router = Router();

router.get('/', getUsers);
router.get('/login', loginUser);
router.get('/:id', getUsersById);
router.post('/login', loginUser);
router.post('/', createUser);
router.delete('/:id', deleteUser);


export default router;