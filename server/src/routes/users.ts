import {Router} from "express";
import { getUsers, getUsersById, createUser, loginUser, deleteUser} from "../handlers/users";
import {checkSchema} from 'express-validator';
import { createUserValidationSchema } from "../utils/validationSchemas";


const router = Router();

router.get('/', getUsers);
router.post('/login', loginUser);
router.get('/:id', getUsersById);
router.post('/', checkSchema(createUserValidationSchema), createUser);
router.delete('/:id', deleteUser);


export default router;  