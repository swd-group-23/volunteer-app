import { Request } from "express";
import { CreateEventRequest } from "../../models/events.model";

export const mockGetUserByIdRequestSuccessMongo = {
    params: { id: '6716e1677e6f955f4a567f00' },
  } as Request<{ id: string }>;

export const mockGetUserByIdRequestFailureMongo = {
    params: { id: '1' },
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