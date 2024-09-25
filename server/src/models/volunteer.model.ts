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
