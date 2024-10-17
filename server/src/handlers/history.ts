// handlers/history.ts
import { Request, Response } from "express";
import { histories, volunteers, events, historyResponse } from "../data";
import { History, GetHistoryResponse } from "../models/history.model";

/*
export function getHistoryById(
    request: Request<{ id: string }>,
    response: Response<GetHistoryResponse[] | string>) {
    const historyRecords = histories.filter(
        (history) => history.volunteerId === request.params.id
    );

    if (historyRecords.length > 0) {
        const historyResponse: GetHistoryResponse[] = historyRecords.map((record) => {
            const volunteer = volunteers.find((v) => v.id === record.volunteerId);
            const event = events.find((e) => e.id === record.eventId);

            return {
                id: record.id,
                volunteerId: record.volunteerId,
                volunteerName: volunteer ? volunteer.name : 'Unknown',
                eventName: event ? event.name : 'Unknown',
                eventDescription: event ? event.description : 'No description',
                location: event ? event.address : 'Unknown',
                skills: event ? event.skills : [],
                urgency: event ? event.urgency : 'Unknown',
                eventDate: event ? event.dateTime : new Date(),
                status: record.status,
            };
        });

        return response.send(historyResponse);
    } else {
        return response.status(404).send('Event History not found');
    }
}

*/

export function getHistoryById(request: Request<{ id: string }>, response: Response<GetHistoryResponse[] | string>) {
    const historyRecords = histories.filter((history) => history.volunteerId === request.params.id);
    
    if (historyRecords.length > 0) {
        const historyResponse: GetHistoryResponse[] = historyRecords.map((record) => {
            const volunteer = volunteers.find((v) => v.id === record.volunteerId);
            const event = events.find((e) => e.id === record.eventId);

            return {
                id: record.id,
                volunteerId: record.volunteerId,
                volunteerName: volunteer ? volunteer.name : "Unknown",
                eventName: event ? event.name : "Unknown",
                eventDescription: event ? event.description : "No description",
                location: event ? event.address : "Unknown", //theres address in event but not in history
                skills: event ? event.skills : [],
                urgency: event ? event.urgency : "Unknown",
                eventDate: event ? event.dateTime : new Date(),
                status: record.status
            };
        });
        
        return response.send(historyResponse);
    } else {
        return response.status(404).send('Event History not found');
    }
}

export function getHistory(request: Request, response: Response<GetHistoryResponse[] | string>) {
    if (histories.length > 0) {
        const historyResponse: GetHistoryResponse[] = histories.map((record) => {
            const volunteer = volunteers.find((v) => v.id === record.volunteerId);
            const event = events.find((e) => e.id === record.eventId);

            return {
                id: record.id,
                volunteerId: record.volunteerId,
                volunteerName: volunteer ? volunteer.name : "Unknown",
                eventName: event ? event.name : "Unknown",
                eventDescription: event ? event.description : "No description",
                location: event ? event.address : "Unknown", //theres address in event but not in history
                skills: event ? event.skills : [],
                urgency: event ? event.urgency : "Unknown",
                eventDate: event ? event.dateTime : new Date(),
                status: record.status
            };
        });
        
        return response.send(historyResponse);
    } else {
        return response.status(404).send('Event History not found');
    }
}















/*import { Request, Response } from "express";
import { histories } from "../data";
import { History } from "../models/history.model";

export function getHistoryById(request: Request<{ id: string }>, response: Response<History[] | string>) {
    const history = histories.filter((history) => history.userId == request.params.id);
    if (history.length > 0) {
        return response.send(history); // Now it's returning an array of History
    } else {
        return response.status(404).send('Event History not found');
    }
}
*/