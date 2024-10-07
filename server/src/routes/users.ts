import {Router} from "express";
import { getUsers, getUsersById, createUser, loginUser, deleteUser, updateUser} from "../handlers/users";


const router = Router();

router.get('/', getUsers);
router.post('/login', loginUser);
router.get('/:id', getUsersById);
router.post('/', createUser);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser)


export default router;