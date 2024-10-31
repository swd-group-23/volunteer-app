import { ObjectId } from "mongodb";

export interface Event {
    id: string;
    name: string;
    description: string;
    location: string;
    dateTime: Date;
    skills: string[];
    urgency: string;
};

export interface CreateEventRequest {
    name: string;
    description: string;
    location: string;
    dateTime: Date;
    skills: string[];
    urgency: string;
};

export interface MongoEvent{
    _id?: ObjectId;
    name: string;
    description: string;
    location: string;
    dateTime: Date;
    skills: string[];
    urgency: string;
}

