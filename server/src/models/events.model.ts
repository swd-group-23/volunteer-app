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

export interface CreateEventRequest {
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