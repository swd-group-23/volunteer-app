import { Request, Response } from "express";
import {createNotif, MongoCreateNotif, MongoNotification, Notification} from "../models/notifications.model";
import { notifications } from "../data";
import { collections } from "../configs/database.service";
import {DeleteResult,ObjectId } from 'mongodb';



export async function getNotificationsMongo(request: Request, response: Response<MongoNotification[]>) {
    try{
        const notifications = await collections.notification?.find({}).toArray() as unknown as MongoNotification[];
        return response.status(notifications ? 200 : 500).send(notifications || []);
    } catch(error){
        return response.status(500);
    }

}



export async function getNotifsByIdMongo(request: Request<{ id: number }>,response: Response<MongoNotification[] | string>): Promise<Response<MongoNotification[] | string>> {
    try {
        const { id } = request.params;

        // Check if the provided ID is a valid ObjectId
        if (!ObjectId.isValid(id)) {
            return response.status(400).send("Invalid user ID format");
        }

        // Convert the user ID to ObjectId and query for notifications with this userId
        const userId = new ObjectId(id);
        const query = { userId };

        // Retrieve notifications with the specified userId
        const notifs = (await collections.notification?.find(query).toArray()) as MongoNotification[];

        if (notifs && notifs.length > 0) {
            return response.send(notifs);
        } else {
            return response.status(404).send("No notifications found for the user");
        }
    } catch (error) {
        console.error(error);
        return response.status(500).send("Error retrieving notifications");
    }
}



export async function createNotificationsMongo(request: Request<{}, {}, MongoCreateNotif>,response: Response<MongoNotification | string>): Promise<Response<MongoNotification | string>> {
    const notification = request.body;
    
    try {
        if (!notification) {
            return response.status(400).send("Notification data is missing.");
        }
        const newNotif = {
            _id: new ObjectId(), 
            userId: new ObjectId(notification.userId),
            eventId: new ObjectId(notification.eventId),
            time: notification.time,
            message: notification.message
        };

        // Insert the new notification into the notifications collection
        const result = await collections.notification?.insertOne(newNotif);

        if (result?.insertedId) {
            // If insertion is successful, return the inserted notification
            return response.status(201).send(newNotif);
        } else {
            return response.status(500).send("Failed to insert notification.");
        }
    } catch (error) {
        console.error("Error inserting notification:", error);
        return response.status(500).send("Error inserting notification.");
    }
}


export async function deleteNotificationMongo(request: Request<{ id: ObjectId }>,response: Response<DeleteResult | string>): Promise<Response<DeleteResult | string>> {
    const { id } = request.params;

    try {
        // Delete the notification from MongoDB using the provided ObjectId directly
        const result = await collections.notification?.deleteOne({ _id: id });

        if (result?.deletedCount === 0) {
            return response.status(404).send("Notification not found");
        }

        return response.status(204).send(result);
    } catch (error) {
        console.error(error);
        return response.status(500).send("Error deleting notification");
    }
}




export function getNotifications(request: Request, response: Response<Notification[]>) {
    return response.send(notifications);
}

export function getNotifsById(request: Request<{id: string}>, response: Response<Notification[] | string>) { 
    const notif = notifications.filter((n) => n.userId === request.params.id);
    
    if(notif.length > 0) {
        return response.send(notif);
    }
    else{
        return response.status(404).send('Notifications not found');
    }
}


export function createNotifications(request: Request<{}, {}, createNotif>, response: Response<Notification>){
    const notification = request.body
    if(!notification){
        return response.status(400).send(notification)
    }
    const newNotif = {
        id: (notifications.length+1).toString(), 
        userId: notification.userId,
        eventId: notification.eventId,
        time: notification.time,
        message: notification.message
    }
    notifications.push(newNotif)
    return response.status(201).send(newNotif)
}

export function deleteNotification(
    request: Request<{ id: string }>, 
    response: Response
): Response {
    const { id } = request.params;

    const notificationIndex = notifications.findIndex(n => n.id === id);

    if (notificationIndex === -1) {
       
        return response.status(404).send({ message: "Notification not found" });
    }

    notifications.splice(notificationIndex, 1);
    return response.status(204).send();
}

