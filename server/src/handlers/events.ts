import { Request, Response } from "express";
import { CreateEventRequest, Event } from "../models/events.model";
import { events } from "../data";

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


export function createEvent(request: Request<{}, {}, CreateEventRequest>, response: Response<Event>){
    const newUser = request.body
    return response.status(201).send({
        id: Math.floor((Math.random() * 100) + 1).toString(),
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

export function deleteEventByIndex(request: Request<{}, {}, { index: number }>, response: Response) {
    const { index } = request.body;  // Destructure the index from the request body

    if (index >= 0 && index < events.length) {  // Ensure the index is valid
        events.splice(index, 1);  // Remove the event at the given index
        return response.status(200).send({ message: "Event deleted successfully" });
    }

    return response.status(404).send({ message: "Invalid index, event not found" });
}

