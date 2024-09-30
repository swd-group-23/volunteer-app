import { Request, Response } from "express";
import { volunteers } from "../data";
import { CreateVolunteerRequest, Volunteer } from "../models/volunteer.model";

export function getVolunteers(request: Request, response: Response<Volunteer[]>) {
    return response.send(volunteers);
}

export function getVolunteerById(request: Request<{id: string}>, response: Response<Volunteer | string>) { 
    const volunteer = volunteers.find((volunteer) => volunteer.id == request.params.id);
    if(volunteer) {
        return response.send(volunteer);
    }
    else{
        return response.status(404).send('Volunteer not found');
    }
}

export function createVolunteer(request: Request<{}, {}, CreateVolunteerRequest>, response: Response<Volunteer>){
    const newUser = request.body
    return response.status(201).send({
        id: Math.floor((Math.random() * 100) + 1).toString(),
        userId: newUser.userId,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        address1: newUser.address1,
        address2: newUser.address2,
        city: newUser.city,
        state: newUser.state,
        zip: newUser.zip,
        skills: newUser.skills,
        preferences: newUser.preferences,
        availability: newUser.availability
    });
}