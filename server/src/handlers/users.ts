import { Request, Response } from "express";
import { CreateUserRequest, LoginUserRequest, LoginUserResponse, User } from "../models/users.model";
import { histories, users, volunteers } from "../data";
import {validationResult} from 'express-validator';


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

export function getUsersById(request: Request<{id: number}>, response: Response<User | string>) { 
    const id = request.params.id
    const user = users.find((user) => user.id == id.toString())
    if(user){
        return response.send(user);
    }
    return response.status(404).send("User not found");
}

export function createUser(request: Request<{}, {}, CreateUserRequest>, response: Response<User | String | String[]>){
    const newUser = request.body
    const result = validationResult(request);
    console.log(result);
    if(!newUser){
        return response.status(400).send("No body!");
    }
    
    if(!result.isEmpty()){
        const errors = result.array().map((error) => error.msg)
        return response.status(400).send(errors)
    }

    const exist = users.find((user) => user.email == newUser.email)
    if(exist){
        return response.status(400).send("Username already exists");
    }
    else {
        console.log("Created new user: ", newUser);
        const user = {
            id: (users.length+1).toString(),
            email: newUser.email,
            password: newUser.password,
            role: newUser.role
        }
        users.push(user);

        return response.status(201).send(user);
    }

}

export function deleteUser(request: Request<{id: number}>, response: Response<User>){
    const id = request.params.id;

    const user = users.find((user) => user.id == id.toString())
    if(user){
        const index = users.indexOf(user);
        users.splice(index, 1);
        const volunteer = volunteers.find((volunteer) => volunteer.userId == user.id)
        if(volunteer){
            const index = volunteers.indexOf(volunteer)
            volunteers.splice(index, 1);
            const history_list = histories.filter((history) => history.volunteerId == volunteer.id)
            if(history_list){
                history_list.map((history) => {
                    histories.splice(histories.indexOf(history),1)
                })
            }
        }
        return response.status(200).send(user);
    }
    return response.status(404);
}