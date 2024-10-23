import { Request, Response } from "express";
import { CreateUserRequest, LoginUserRequest, LoginUserResponse, UpdateUserRequest, User} from "../models/users.model";
import { histories, users, volunteers } from "../data";
import {validationResult} from 'express-validator';
import { collections } from "../configs/database.service";
import {MongoUser} from "../models/users.model";
import { DeleteResult, ObjectId } from "mongodb";
import { MongoVolunteer } from "../models/volunteer.model";

export async function getUsersMongo(request: Request, response: Response<MongoUser[]>) {
    try {
        const users = await collections.user?.find({}).toArray() as unknown as MongoUser[];
        return response.status(users ? 200 : 500).send(users || []);
    } catch {
        return response.status(500);
    }
}

export async function getUsersByIdMongo(request: Request<{id: number}>, response: Response<MongoUser | string>) { 
    const id = request.params.id
    try {
        const query = { _id: new ObjectId(id) };
        const user = (await collections.user?.findOne(query)) as unknown as MongoUser;
        if (user) {
            return response.send(user);
        }
    } catch (error) {
        return response.status(404).send("User not found");
    }
}

export async function loginUserMongo(request: Request<{}, {}, LoginUserRequest>, response: Response<LoginUserResponse | string>){
    try {
        const query = {email: request.body.email, password: request.body.password };
        const user = (await collections.user?.findOne(query)) as unknown as MongoUser;
        if (user) {
            return response.send({
                id: user._id!.toString(),
                role: user.role
            });
        }
    } catch (error) {
        return response.status(404).send("User not found");
    }
}

export async function createUserMongo(request: Request<{}, {}, CreateUserRequest>, response: Response<String | String[]>){
    const newUser = request.body
    const result = validationResult(request);
    if(!newUser){
        return response.status(400).send("No body!");
    }
    
    if(!result.isEmpty()){
        const errors = result.array().map((error) => error.msg)
        return response.status(400).send(errors)
    }

    const query = {email: newUser.email };
    const exist = (await collections.user?.findOne(query)) as unknown as MongoUser;

    if(exist){
        return response.status(400).send("Username already exists");
    } 
    else {
        try{
            const createResult = await collections.user?.insertOne(newUser);
            return response.status(201).send(createResult?.insertedId.toString());
        } catch (error){
            return response.status(400).send("Could not insert user")
        }

    }

}

export async function deleteUserMongo(request: Request<{id: number}>, response: Response<DeleteResult | String>){
    const id = request.params.id;

    try{
        // delete from users collection 
        const deleteUser = await collections.user?.deleteOne({ _id: new ObjectId(id) });

        if(deleteUser && deleteUser.deletedCount){
            const volunteer = (await collections.user?.findOne({userId: new ObjectId(id)})) as unknown as MongoVolunteer;
            if(volunteer){
                // delete from volunteer collection
                const deleteVolunteer = await collections.volunteer?.deleteOne({userId: new ObjectId(id)})

                // delete history
                const history_list = await collections.history?.deleteMany({volunteerId: new ObjectId(volunteer._id)})
            }
            return response.status(202).send(deleteUser);

        } else if (!deleteUser) {
            return response.status(400).send(`Failed to remove user with id ${id}`);
        } else if (!deleteUser.deletedCount) {
            return response.status(404).send(`User with id ${id} does not exist`);
        }
        return response.status(404);

    } catch (error) {
        return response.status(404);
    }

}

export async function updateUserMongo(request: Request<{}, {}, UpdateUserRequest>, response: Response<MongoUser | String>){
    const updateUser = request.body
    try{
         const user = (await collections.user?.findOne({_id: new ObjectId(updateUser.id)})) as unknown as MongoUser;
        if(user){
            const updatedUser: MongoUser = updateUser as unknown as MongoUser
            const query = { _id: new ObjectId(updateUser.id) };
            const result = await collections.user?.updateOne(query, { $set: updateUser });
    
            return result
                ? response.status(200).send(updatedUser)
                : response.status(304).send(`User with id: ${user._id} not updated`);
        }
        return response.status(404);
    } catch(error){
        return response.status(404);
    }
    
}

// DUMMY DATA

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