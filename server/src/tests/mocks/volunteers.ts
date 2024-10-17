import { Request,Response } from "express";
import { CreateVolunteerRequest, MatchVolunteerRequest } from "../../models/volunteer.model";

export const mockGetVolunteerByIdRequestSuccess = {
    params: { id: "1" },
  } as Request<{ id: string }>;

export const mockGetVolunteerByIdRequestFailure = {
    params: { id: "200" },
} as Request<{ id: string }>;

export const mockCreateVolunteerSuccess = {
    body: {
        id: '1',
        userId: '1',
        name: 'mock',
        email: 'mock@gmail.com',
        password: 'test',
        address1: '123',
        address2: 'drive',
        city: 'houston',
        state: 'tx',
        zip: 1234,
        skills: ['test', 'code'],
        preferences: 'afternoon',
        availability: [new Date('2024-11-03'), new Date('2024-11-08')]
    }
} as Request<{}, {}, CreateVolunteerRequest>;

export const mockCreateVolunteerFailure = {
} as Request<{}, {}, CreateVolunteerRequest>;

export const mockCreateExistingVolunteer = {
    body: {
        id: '1',
        userId: '1',
        name: 'Alan',
        email: 'alan@gmail.com',
        password: 'test',
        address1: '123',
        address2: 'drive',
        city: 'houston',
        state: 'tx',
        zip: 1234,
        skills: ['sleep', 'eat'],
        preferences: 'morning',
        availability: [new Date('2024-09-12'), new Date('2024-09-14')]
    }
} as Request<{}, {}, CreateVolunteerRequest>;

export const mockMatchVolunteerRequestSuccess  = {
    body:{
        volunteerId: '2',
        eventId: '3'
    }

} as Request<{}, {}, MatchVolunteerRequest>;

export const mockMatchVolunteerRequestFailure  = {
} as Request<{}, {}, MatchVolunteerRequest>;

export const mockMatchVolunteerRequestFailure2  = {
    body:{
        volunteerId: '2'
    }
} as Request<{}, {}, MatchVolunteerRequest>;

export const mockMatchVolunteerRequestDuplicate  = {
    body:{
        volunteerId: '1',
        eventId: '1'
    }

} as Request<{}, {}, MatchVolunteerRequest>;
