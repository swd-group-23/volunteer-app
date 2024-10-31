import { Request } from "express";
import { CreateVolunteerRequest, MatchVolunteerRequest } from "../../models/volunteer.model";


export const mockGetVolunteerByIdRequestSuccessMongo = {
    params: { id: '6716e5dc2dd5346d39bdf33e' },
  } as Request<{ id: string }>;

export const mockGetVolunteerByIdRequestFailureMongo = {
    params: { id: '1' },
 } as Request<{ id: string }>;






//DUMMY
export const mockGetVolunteerByIdRequestSuccess = {
    params: { id: "1" },
  } as Request<{ id: string }>;

export const mockGetVolunteerByIdRequestFailure = {
    params: { id: "200" },
} as Request<{ id: string }>;

export const mockCreateVolunteerSuccess = {
    body: {
        userId: '6716e1677e6f955f4a567f01',
        name: 'mock',
        email: 'mock@gmail.com',
        password: 'test',
        address1: '12345678',
        address2: 'drive',
        city: 'houston',
        state: '6716e4d6daa3a6f650baf855',
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


export const mockMatchVolunteerRequestSuccessMongo  = {
    body:{
        volunteerId: '6716e5dc2dd5346d39bdf33e',
        eventId: '6716e4ab2dd5346d39bdf322'
    }

} as Request<{}, {}, MatchVolunteerRequest>;

export const mockMatchVolunteerRequestFailure2Mongo  = {
    body:{
        volunteerId: '6716e5dc2dd5346d39bdf33e'
    }
} as Request<{}, {}, MatchVolunteerRequest>;

export const mockMatchVolunteerRequestDuplicateMongo  = {
    body:{
        volunteerId: '6716e5dc2dd5346d39bdf33d',
        eventId: '6716e4ab2dd5346d39bdf320'
    }

} as Request<{}, {}, MatchVolunteerRequest>;

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

export const mockUpdateVolunteerSuccess = {
    body: {
        _id:"6716e5dc2dd5346d39bdf33d",
        userId: "6716e1677e6f955f4a567f00",
        name: "Testing User Six",
        email: "volunteer@gmail.com",
        address1: "Testing new address",
        address2: "testing2",
        city: "Houston",
        state: "AR",
        zip: "77089",
        skills: "Project Management",
        preferences: "testing1234",
        availability: [
            "2024-10-19T05:00:00.000Z"
        ]
    }
  } as Request<{ id: number }>;

export const mockUpdateVolunteerFailure = {
    body: {
        _id:"1",
        userId: "1",
        name: "Testing User",
        email: "volunteer@gmail.com",
        address1: "Testing new address",
        address2: "testing2",
        city: "Houston",
        state: "AR",
        zip: "77089",
        skills: "Project Management",
        preferences: "testing1234",
        availability: [
            "2024-10-19T05:00:00.000Z"
        ]
    }
} as Request<{ id: number }>;