import {Router} from "express";
import { getUsers, getUsersById, createUser, loginUser, deleteUser, getUsersMongo, getUsersByIdMongo, loginUserMongo, createUserMongo, updateUserMongo, deleteUserMongo} from "../handlers/users";
import {checkSchema} from 'express-validator';
import { createUserValidationSchema } from "../utils/validationSchemas";


const router = Router();

// mongo routes
router.get('/mongo', getUsersMongo);
router.get('/mongo/:id', getUsersByIdMongo);
router.post('/login/mongo', loginUserMongo);
router.post('/mongo', checkSchema(createUserValidationSchema), createUserMongo);
router.patch('/mongo', updateUserMongo)
router.delete('/mongo/:id', deleteUserMongo);


router.get('/', getUsers);
router.post('/login', loginUser);
router.get('/:id', getUsersById);
router.post('/', checkSchema(createUserValidationSchema), createUser);
router.delete('/:id', deleteUser);



export default router;  