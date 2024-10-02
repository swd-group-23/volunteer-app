import { Request, Response } from "express";
import { CreateUserRequest, LoginUserRequest, LoginUserResponse, User } from "../models/users.model";
import { users } from "../data";

export function getUsers(request: Request, response: Response<User[]>) {
    return response.send(users);
}

export function loginUser(request: Request<{}, {}, LoginUserRequest>, response: Response<LoginUserResponse | string>){
    const user = users.find((user) => user.email == request.body.email && user.password == request.body.password);
    if(user){
        return response.send({
            id: user.id,
            role: user.role
        });
    }
    return response.status(404).send("User not found");
}

export function getUsersById(request: Request<{id: number}>, response: Response<User>) { 
    const id = request.params.id
    const user = users.find((user) => user.id == id.toString())
    if(id <= users.length - 1){
        return response.send(user);
    }
    return response.status(404);
}

export function createUser(request: Request<{}, {}, CreateUserRequest>, response: Response<User>){
    const newUser = request.body
    console.log("Created new user: ", newUser);
    if(newUser){
        const user = {
            id: Math.floor((Math.random() * 100) + 1).toString(),
            email: newUser.email,
            password: newUser.password,
            role: newUser.role
        }
        users.push(user);

        return response.status(201).send(user);
    }
    return response.status(404);

}