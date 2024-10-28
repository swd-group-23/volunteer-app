
import { ObjectId } from "mongodb";
export interface History {
    id: string;
    volunteerId: string;
    eventId: string;
    status: string[];

};

export interface GetHistoryResponse {
    id: string;
    volunteerId: string;
    volunteerName: string;
    eventName: string;
    eventDescription: string;
    location: string;
    skills: string[];
    urgency: string;
    eventDate: Date;
    status: string[];
  }

  export interface MongoHistory {
    volunteerId: string;
    eventId: string;
    status: string[];
    _id?: ObjectId;
}