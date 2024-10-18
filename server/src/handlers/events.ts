import { Request, Response } from "express";
import { CreateEventRequest, Event } from "../models/events.model";
import { events } from "../data";
import { validationResult } from "express-validator";

export function getEvents(request: Request, response: Response<Event[]>) {
    return response.send(events);
}

export function getEventsById(request: Request<{id: number}>, response: Response<Event>) { 
    const id = request.params.id
    const event = events.find((event) => event.id == id.toString())
    if(id <= events.length - 1){
        return response.send(event);
    }
    return response.status(404);
}


export function createEvent(request: Request<{}, {}, CreateEventRequest>, response: Response<Event | String | String[]>){
    const newUser = request.body
    const result = validationResult(request);
    if(!newUser){
        return response.status(400).send("No Body!");
    }
    if(!result.isEmpty()){
        const errors = result.array().map((error) => error.msg)
        return response.status(400).send(errors)
    }
    return response.status(201).send({
        id: events.length.toString(),
        name: newUser.name,
        description: newUser.description,
        address: newUser.address,
        city: newUser.city,
        state: newUser.state,
        zip: newUser.zip,
        dateTime: newUser.dateTime,
        skills: newUser.skills,
        urgency: newUser.urgency
    });
}

export function deleteEventByIndex(request: Request<{id: number}>, response: Response<Event | string>){
    const id = request.params.id;  // Destructure the index from the request body
  
    const event = events.find((event) => event.id == id.toString())
    if(event){
        const index = events.indexOf(event);
        events.splice(index, 1);
        return response.status(200).send(event);
    }
    return response.status(404);
}

