import { Request, Response } from "express";
import { CreateEventRequest, Event } from "../models/events.model";
import { events, histories } from "../data";
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
    const event = request.body
    const result = validationResult(request);
    if(!event){
        return response.status(400).send("No Body!");
    }
    if(!result.isEmpty()){
        const errors = result.array().map((error) => error.msg)
        return response.status(400).send(errors)
    }
    const newEvent = {
        id: (events.length+1).toString(),
        name: event.name,
        description: event.description,
        location: event.location,
        dateTime: event.dateTime,
        skills: event.skills,
        urgency: event.urgency
    };
    events.push(newEvent);
    return response.status(201).send(newEvent);
}

export function deleteEventById(request: Request<{id: number}>, response: Response<Event | string>){
    const id = request.params.id; 
  
    const event = events.find((event) => event.id == id.toString())
    if(event){
        const index = events.indexOf(event);
        events.splice(index, 1);
        const history_list = histories.filter((history) => history.eventId == event.id)
        if(history_list){
            history_list.map((history) => histories.splice(histories.indexOf(history), 1))
        }
        return response.status(200).send(event);
    }
    return response.status(404);
}

