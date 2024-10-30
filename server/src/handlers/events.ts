import { Request, Response } from "express";
import { CreateEventRequest, Event, MongoEvent } from "../models/events.model";
import { events, histories } from "../data";
import { validationResult } from "express-validator";
import { collections } from "../configs/database.service";
import { DeleteResult, ObjectId } from "mongodb";

export async function getEventsMongo(request: Request, response: Response<MongoEvent[]>) {
    try {
        const events = await collections.event?.find({}).toArray() as unknown as MongoEvent[];
        return response.status(events ? 200 : 500).send(events || []);
    } catch {
        return response.status(500);
    }
}

export async function getEventsByIdMongo(request: Request<{id: string}>, response: Response<MongoEvent | string>) { 
    const id = request.params.id
    try {
        const query = { _id: new ObjectId(id) };
        const event = (await collections.event?.findOne(query)) as unknown as MongoEvent;
        if (event) {
            return response.send(event);
        }
    } catch (error) {
        return response.status(404).send("Event not found");
    }
}


export async function createEventMongo(request: Request<{}, {}, CreateEventRequest>, response: Response<String | String[]>){
    const newEvent = request.body
    const result = validationResult(request);
    if(!newEvent){
        return response.status(400).send("No body!");
    }
    
    if(!result.isEmpty()){
        const errors = result.array().map((error) => error.msg)
        return response.status(400).send(errors)
    }
    try{
        const createResult = await collections.event?.insertOne(newEvent);
        return response.status(201).send(createResult?.insertedId.toString());
    } catch (error){
        return response.status(400).send("Could not insert event")
    }
}

export async function deleteEventMongo(request: Request<{id: string}>, response: Response<DeleteResult | String>){
    const id = request.params.id;

    try{
        // delete from events collection 
        const deleteEvent = await collections.event?.deleteOne({ _id: new ObjectId(id) });

        if(deleteEvent && deleteEvent.deletedCount){
            await collections.history?.deleteMany({eventId: new ObjectId(id)})
            return response.status(202).send(deleteEvent);
        } else if (!deleteEvent) {
            return response.status(400).send(`Failed to remove event with id ${id}`);
        } else if (!deleteEvent.deletedCount) {
            return response.status(404).send(`Event with id ${id} does not exist`);
        }
        return response.status(404);

    } catch (error) {
        return response.status(404);
    }

}



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

