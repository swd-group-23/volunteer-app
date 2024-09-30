import { Request, Response } from "express";
import { volunteers } from "../data";
import { MatchVolunteerRequest, MatchVolunteerResponse, Volunteer } from "../models/volunteer.model";

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

export function postVolunteerMatch(request: Request<{}, {}, MatchVolunteerRequest>, response: Response<MatchVolunteerResponse>){
    const newMatch = request.body
    const volunteer = volunteers.find((volunteer) => volunteer.id == newMatch.volunteerId);
    if(newMatch && volunteer){
        return response.status(201).send(
            {
                volunteer_name: volunteer.name,
                event_name: "random",
                event_time: new Date()
            }
    );
    }
    return response.status(404);

}