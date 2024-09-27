import { Request, Response } from "express";
import { volunteers } from "../data";
import { Volunteer } from "../models/volunteer.model";

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

