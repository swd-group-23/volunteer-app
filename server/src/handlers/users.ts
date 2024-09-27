import { Request, Response } from "express";
import { CreateUserRequest, User } from "../models/users.model";

export function getUsers(request: Request, response: Response) {
    return response.send(['alan', 'alina', 'josh', 'jusvin']);
}

export function getUsersById(request: Request<{id: number}>, response: Response<User>) { 
    if(request.params.id == 1){
        return response.send({
            id: 1, 
            username: 'test',
            email: 'test@gmail.com'});
    }
    return response.status(404);
}

export function createUser(request: Request<{}, {}, CreateUserRequest>, response: Response<User>){
    return response.status(201).send({
        id: 1, 
        username: 'test',
        email: 'brown@gmail.com'})
}