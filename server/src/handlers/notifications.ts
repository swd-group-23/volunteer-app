import { Request, Response } from "express";
import {createNotif, Notification} from "../models/notifications.model";
import { notifications } from "../data";



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

