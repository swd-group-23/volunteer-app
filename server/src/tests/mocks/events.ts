import { Request } from "express";
import { CreateEventRequest } from "../../models/events.model";

export const mockGetEventByIdRequestSuccessMongo = {
    params: { id: '6716e4ab2dd5346d39bdf320' },
  } as Request<{ id: string }>;

export const mockGetEventByIdRequestFailureMongo = {
    params: { id: '1' },
} as Request<{ id: string }>;

export const mockDeleteEventByIdRequestSuccessMongo = {
    params: { id: '6716e4ab2dd5346d39bdf325' },
  } as Request<{ id: string }>;

export const mockDeleteEventByIdRequestFailureMongo = {
    params: { id: '200' },
} as Request<{ id: string }>;




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
        location: 'mock',
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
        location: 'Portwall, Houston, Texas. 77546',
        dateTime: new Date('2024-09-14'),
        skills: ['packing', 'carrying'],
        urgency: 'mild'
    }
} as Request<{}, {}, CreateEventRequest>;

export const mockDeleteEventByIdRequestSuccess1 = {
    params: { id: 5 },
  } as Request<{ id: number }>;
  export const mockDeleteEventByIdRequestSuccess4 = {
    params: { id: 4 },
  } as Request<{ id: number }>;

export const mockDeleteEventByIdRequestFailure = {
    params: { id: 200 },
} as Request<{ id: number }>;