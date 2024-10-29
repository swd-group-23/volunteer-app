import { Request, Response } from "express";
import { events, histories, volunteers } from "../data";
import { CreateVolunteerRequest, CreateVolunteerRequestMongo, MatchVolunteerRequest, MatchVolunteerResponse, MongoVolunteer, UpdateVolunteerRequest, UpdateVolunteerRequestMongo, Volunteer } from "../models/volunteer.model";
import { validationResult } from "express-validator";
import { collections } from "../configs/database.service";
import { ObjectId } from "mongodb";


export async function getVolunteersMongo(request: Request, response: Response<MongoVolunteer[]>) {
    try{
        const volunteers = await collections.volunteer?.find({}).toArray() as unknown as MongoVolunteer[];
        return response.status(volunteers ? 200 : 500).send(volunteers || []);

    }catch {
    return response.status(500);
    }
}


export async function getVolunteerByIdMongo(request: Request<{id: string}>, response: Response<MongoVolunteer | string>) { 
    const id = request.params.id
    try {
        const query = { _id: new ObjectId(id) };
        const volunteer = (await collections.volunteer?.findOne(query)) as unknown as MongoVolunteer;
        if (volunteer) {
            return response.send(volunteer);
        }
    } catch (error) {
        return response.status(404).send("Volunteer not found");
    }
}

export async function createVolunteerMongo(request: Request<{}, {}, CreateVolunteerRequestMongo>, response: Response<String | String[]>){
    const newVolunteer = request.body
    const result = validationResult(request);
    if(!newVolunteer){
        return response.status(400).send("No body!");
    }
    
    if(!result.isEmpty()){
        const errors = result.array().map((error) => error.msg)
        return response.status(400).send(errors)
    }

    const query = {email: newVolunteer.email };
    const exist = (await collections.volunteer?.findOne(query)) as unknown as MongoVolunteer;

    if(exist){
        return response.status(400).send("Volunteer already exists");
    } 
    else {
        try{
            const newVolunteerMongo: MongoVolunteer = {...newVolunteer, userId: new ObjectId(newVolunteer.userId), state: new ObjectId(newVolunteer.state)}
            const createResult = await collections.volunteer?.insertOne(newVolunteerMongo);
            return response.status(201).send(createResult?.insertedId.toString());
        } catch (error){
            return response.status(400).send("Could not insert Volunteer")
        }

    }

}

export async function updateVolunteerMongo(request: Request<{}, {}, UpdateVolunteerRequestMongo>, response: Response<MongoVolunteer | String>){
    const updateVolunteer = request.body
    try{
         const volunteer = (await collections.volunteer?.findOne({_id: new ObjectId(updateVolunteer._id)})) as unknown as MongoVolunteer;
         if(volunteer){
            const updatedVolunteer: MongoVolunteer = updateVolunteer as unknown as MongoVolunteer
            const query = { _id: new ObjectId(updateVolunteer._id) };
            const updateVolunteerMongo: MongoVolunteer = {...updateVolunteer, _id: new ObjectId(updateVolunteer._id), userId: new ObjectId(updateVolunteer.userId), state: new ObjectId(updateVolunteer.state)}
            const result = await collections.volunteer?.updateOne(query, { $set: updateVolunteerMongo });
    
            return result
                ? response.status(200).send(updatedVolunteer)
                : response.status(304).send(`Volunteer with id: ${volunteer._id} not updated`);
        }
        return response.status(404);
    } catch(error){
        return response.status(404);
    }
    
}


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
    if(!newMatch){
        return response.status(404);
    }
    const volunteer = volunteers.find((volunteer) => volunteer.id == newMatch.volunteerId);
    const event = events.find((event) => event.id == newMatch.eventId)
    if(newMatch && volunteer && event){
        const history = histories.find((history) => history.eventId==newMatch.eventId && history.volunteerId==newMatch.volunteerId)
        if(history){
            return response.status(400);
        }
        // add to histories data
        histories.push({
            id: Math.floor((Math.random() * 100) + 1).toString(),
            volunteerId: volunteer.id,
            eventId: event.id,
            status: ["Scheduled"],
        })
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

}

export function createVolunteer(request: Request<{}, {}, CreateVolunteerRequest>, response: Response<Volunteer | String | String[]>){
    const newUser = request.body
    const result = validationResult(request)
    if(!newUser){
        return response.status(400).send("No Body!");
    }
    if(!result.isEmpty()){
        const errors = result.array().map((error) => error.msg)
        console.log(errors);
        return response.status(400).send(errors)
    }

    const volunteer = {
        id: (volunteers.length+1).toString(),
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
    }
    volunteers.push(volunteer)
    return response.status(201).send(volunteer);
}

export function updateVolunteer(request: Request<{}, {}, UpdateVolunteerRequest>, response: Response<Volunteer>){
    const updateVolunteer = request.body
    const volunteer = volunteers.find((volunteer) => volunteer.userId == updateVolunteer.userId)
    if(volunteer){
        const index = volunteers.indexOf(volunteer);
        volunteers[index] = {
            ...volunteer,
            name: updateVolunteer.name,
            email: updateVolunteer.email,
            password: updateVolunteer.password,
            address1: updateVolunteer.address1,
            address2: updateVolunteer.address2,
            city: updateVolunteer.city,
            state: updateVolunteer.state,
            zip: updateVolunteer.zip,
            skills: updateVolunteer.skills,
            preferences: updateVolunteer.preferences,
            availability: updateVolunteer.availability
        }
        return response.status(200).send(volunteers[index]);
    }
    return response.status(404);
}