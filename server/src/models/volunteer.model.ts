export interface Volunteer {
    id: string;
    userId: string;
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


export interface MatchVolunteerRequest {
    volunteerId: string;
    eventId: string;
}

export interface MatchVolunteerResponse{
    volunteer_id: string;
    volunteer_name: string;
    event_id: string;
    event_name: string;
    event_time: Date;
    event_description: string;
}
export interface CreateVolunteerRequest {
    userId: string;
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
}