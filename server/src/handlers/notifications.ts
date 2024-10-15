import { Request, Response } from "express";
import {createNotif, Notification} from "../models/notifications.model";
import { notifications } from "../data";



export function getNotifications(request: Request, response: Response<Notification[]>) {
    return response.send(notifications);
}

export function getNotifsById(request: Request<{id: string}>, response: Response<Notification | string>) { 
    const notif = notifications.find((notif) => notif.id == request.params.id);
    if(notif) {
        return response.send(notif);
    }
    else{
        return response.status(404).send('Notifications not found');
    }
}


export function createNotifications(request: Request<{}, {}, createNotif>, response: Response<Notification>){
    return response.status(201).send({
        id: "", 
        userId: 'testUser',
        eventId: 'test',
        time: new Date(),
        message: 'your event starts now'})
}

/*export function deleteNotification(
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

*/