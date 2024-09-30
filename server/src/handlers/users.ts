import { Request, Response } from "express";
import { CreateUserRequest, User } from "../models/users.model";
import { users } from "../data";

export function getUsers(request: Request, response: Response<User[]>) {
    return response.send(users);
}

export function getUsersById(request: Request<{id: number}>, response: Response<User>) { 
    const id = request.params.id
    const user = users.find((user) => user.id == id.toString())
    if(id <= users.length - 1){
        return response.send(user);
    }
    return response.status(404);
}

export function createUser(request: Request<{}, {}, User>, response: Response<User>){
    const newUser = request.body
    return response.status(201).send(newUser);
}