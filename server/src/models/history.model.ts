
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
    eventId: string;
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
    volunteerId: ObjectId;
    eventId: ObjectId;
    status: string[];
    _id?: ObjectId;
}

export interface MongoVolunteer {
  _id?: ObjectId;
  userId: ObjectId;
  name: string;
  email: string;
  password: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: number;
  skills: string[];
  preferences?: string;
  availability: Date[];
};

export interface MongoEvent {
  _id: ObjectId;
  name: string;
  description: string;
  location: string;
  dateTime: Date;
  skills: string[];
  urgency: string;
};