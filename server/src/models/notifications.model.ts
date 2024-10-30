import { ObjectId } from "mongodb";


export interface MongoNotification {
    _id: ObjectId;
    userId: ObjectId;
    time: Date;
    eventId: ObjectId;
    message: string;
};

export interface MongoCreateNotif {
    userId: string;
    time: Date;
    eventId: string;
    message: string;
};

export interface MongoGetNotificationsResponse {
    _id: ObjectId;
    userId: ObjectId;
    time: Date;
    eventId: ObjectId;
    eventName: string;
    eventDate: Date;
    message: string;
};

export interface Notification {
    id: string;
    userId: string;
    time: Date;
    eventId: string;
    message: string;
};

export interface createNotif {
    id: string;
    userId: string;
    time: Date;
    eventId: string;
    message: string;
};

export interface GetNotificationsResponse{
    id: string;
    userId: string;
    time: Date;
    eventId: string;
    eventName: string;
    eventDate: Date;
    message: string;
};