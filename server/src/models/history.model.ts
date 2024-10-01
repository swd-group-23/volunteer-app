export interface History {
    id: string;
    userId: string;
    eventName: string;
    eventDescription: string;
    location: string;
    skills: string[];
    urgency: string;
    eventDate: Date;
    status: string[];

};