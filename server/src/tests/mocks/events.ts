import { Request } from "express";
import { CreateEventRequest } from "../../models/events.model";

export const mockGetEventByIdRequestSuccess = {
    params: { id: 1 },
  } as Request<{ id: number }>;

export const mockGetEventByIdRequestFailure = {
    params: { id: 200 },
} as Request<{ id: number }>;


export const mockCreateEventSuccess = {
    body: {
        name: 'mock event',
        description: 'mock',
        address: 'street',
        city: 'Houston',
        state: 'Texas',
        zip: 77546,
        dateTime: new Date('2024-09-14'),
        skills: ['mock1', 'mock2'],
        urgency: 'mock'
    }
} as Request<{}, {}, CreateEventRequest>;

export const mockCreateEventFailure = {
} as Request<{}, {}, CreateEventRequest>;

export const mockCreateExistingEvent = {
    body: {
        name: 'Houston Food Bank',
        description: 'Feeding the community',
        address: 'Portwall',
        city: 'Houston',
        state: 'Texas',
        zip: 77546,
        dateTime: new Date('2024-09-14'),
        skills: ['packing', 'carrying'],
        urgency: 'mild'
    }
} as Request<{}, {}, CreateEventRequest>;

export const mockDeleteEventByIdRequestSuccess = {
    params: { id: 2 },
  } as Request<{ id: number }>;

export const mockDeleteEventByIdRequestFailure = {
    params: { id: 200 },
} as Request<{ id: number }>;