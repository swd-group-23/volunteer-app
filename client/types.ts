export interface User {
    id: string;
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

export interface Event {
    id: string;
    name: string;
    description: string;
    address: string;
    city: string;
    state: string;
    zip: number;
    dateTime: Date;
    skills: string[];
    urgency: string;
};

export interface History {
    id: string;
    eventName: string;
    eventDescription: string;
    location: string;
    skills: string[];
    urgency: string;
    eventDate: Date;
    status: string[];

};
