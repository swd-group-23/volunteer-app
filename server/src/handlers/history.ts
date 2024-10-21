import { Request, Response } from "express";
import { histories, volunteers, events } from "../data";
import { GetHistoryResponse } from "../models/history.model";

export function getHistoryById(request: Request<{ id: string }>, response: Response<GetHistoryResponse[] | string>) {
    const historyRecords = histories.filter((history) => history.volunteerId === request.params.id);
    
    if (historyRecords.length > 0) {
        const historyResponse: GetHistoryResponse[] = historyRecords.map((record) => {
            const volunteer = volunteers.find((v) => v.id === record.volunteerId);
            const event = events.find((e) => e.id === record.eventId);

            if(event && volunteer){
                return {
                    id: record.id,
                    volunteerId: record.volunteerId,
                    volunteerName: volunteer.name,
                    eventName: event.name,
                    eventDescription: event.description,
                    location: event.location,
                    skills: event.skills,
                    urgency: event.urgency,
                    eventDate: event.dateTime,
                    status: record.status
                };
            }else{
                return {
                    id: record.id,
                    volunteerId: record.volunteerId,
                    volunteerName: "Unknown",
                    eventName:  "Unknown",
                    eventDescription: "No description",
                    location: "Unknown", //theres address in event but not in history
                    skills: [],
                    urgency: "Unknown",
                    eventDate: new Date(),
                    status: record.status
                };
            }
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
            if(event && volunteer){
                return {
                    id: record.id,
                    volunteerId: record.volunteerId,
                    volunteerName: volunteer.name,
                    eventName: event.name,
                    eventDescription: event.description,
                    location: event.location,
                    skills: event.skills,
                    urgency: event.urgency,
                    eventDate: event.dateTime,
                    status: record.status
                };
            }else{
                return {
                    id: record.id,
                    volunteerId: record.volunteerId,
                    volunteerName: "Unknown",
                    eventName:  "Unknown",
                    eventDescription: "No description",
                    location: "Unknown", //theres address in event but not in history
                    skills: [],
                    urgency: "Unknown",
                    eventDate: new Date(),
                    status: record.status
                };
            }
          
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