import { Request, Response } from "express";
import { events, volunteers } from "../data";
import { CreateVolunteerRequest, MatchVolunteerRequest, MatchVolunteerResponse, Volunteer } from "../models/volunteer.model";
import { validationResult } from "express-validator";

export function getVolunteers(request: Request, response: Response<Volunteer[]>) {
    return response.send(volunteers);
}

export function getVolunteerById(request: Request<{id: string}>, response: Response<Volunteer | string>) { 
    const volunteer = volunteers.find((volunteer) => volunteer.userId == request.params.id);
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
    const event = events.find((event) => event.id == newMatch.eventId)
    if(newMatch && volunteer && event){
        // add to histories data
        return response.status(201).send(
            {
                volunteer_id: volunteer.id,
                volunteer_name: volunteer.name,
                event_id: event.id,
                event_name: event.name,
                event_time: event.dateTime,
                event_description: event.description
            }
        );
    }

    return response.status(404);

}export function createVolunteer(request: Request<{}, {}, CreateVolunteerRequest>, response: Response<Volunteer | String | String[]>){
    const newUser = request.body
    const result = validationResult(request)
    if(!newUser){
        return response.status(400).send("No Body!");
    }
    if(!result.isEmpty()){
        const errors = result.array().map((error) => error.msg)
        return response.status(400).send(errors)
    }

    volunteers.push(newUser)
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