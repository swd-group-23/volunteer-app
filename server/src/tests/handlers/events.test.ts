import { ObjectId } from "mongodb";
import { closeDatabaseConnection, collections, connectToDatabase } from "../../configs/database.service";
import { events } from "../../data";
import { createEvent, createEventMongo, deleteEventById, deleteEventMongo, getEvents, getEventsById, getEventsByIdMongo, getEventsMongo } from "../../handlers/events";
import { mockRequest, mockResponse } from "../mocks";
import { mockCreateEventFailure, mockCreateEventSuccess, mockCreateExistingEvent, mockDeleteEventByIdRequestFailure, mockDeleteEventByIdRequestFailureMongo, mockDeleteEventByIdRequestSuccess1, mockDeleteEventByIdRequestSuccessMongo, mockGetEventByIdRequestFailure, mockGetEventByIdRequestFailureMongo, mockGetEventByIdRequestSuccess, mockGetEventByIdRequestSuccessMongo } from "../mocks/events";

describe('getEvents', () =>{
    it('should return an array of event', async () => {
        await connectToDatabase(true).then(async () => {
            await getEventsMongo(mockRequest, mockResponse)
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            await closeDatabaseConnection();
        });
    });
});

describe('getEventsById', () => {
    it('should get a event by id', async () =>{
        await connectToDatabase(true).then(async () => {
            await getEventsByIdMongo(mockGetEventByIdRequestSuccessMongo, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            await closeDatabaseConnection();
        })
    })

    it('should call getEventsById with 404 when event not found', async () =>{
        await connectToDatabase(true).then(async() => {
            await getEventsByIdMongo(mockGetEventByIdRequestFailureMongo, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(404);
            await closeDatabaseConnection();
        })
    });
});

//do i need to add the things you need to create event?
describe('createEvent', () => {
    it('should create a event', async () =>{
        await connectToDatabase(true).then(async() => {
            await createEventMongo(mockCreateEventSuccess, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            // clean up
            await collections.event?.deleteMany({name: "mock event"})
            await closeDatabaseConnection();
        })

    })
    

    it('should call createEvent with 400 when there are errors', async () =>{
        await connectToDatabase(true).then(async() => {
            await createEventMongo(mockCreateEventFailure, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(400);
            await closeDatabaseConnection();
        })
    })
})

describe('deleteEvent', () => {
    it('should call deleteEvent with 404 when event not found', async () => {
        await connectToDatabase(true).then(async () => {
            await deleteEventMongo(mockDeleteEventByIdRequestFailureMongo, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(404);
            await closeDatabaseConnection();
        });
    });

    it('should delete an event by id when found', async () => {
        await connectToDatabase(true).then(async () => {
            // Insert a mock event to be deleted with a unique ID
            const mockEvent = {
                _id: new ObjectId('6716e4ab2dd5346d39bdf325'),
                name: "Mock Event",
                description: "Feeding the community",
                location: "Portwall, Houston, Texas. 77546",
                dateTime: "2024-09-14T00:00:00",
                skills: ["Organizing", "Logistics"],
                urgency: "mild"
            };
            await collections.event?.insertOne(mockEvent);
    
            // Attempt to delete the mock event
            await deleteEventMongo(mockDeleteEventByIdRequestSuccessMongo, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
    
            // Clean up to ensure no leftover data
            await collections.event?.deleteOne({ _id: mockEvent._id });
            await closeDatabaseConnection();
        });
    });
    
});

//DUMMY
describe('getEvents', () =>{
    it('should return an array of events', () =>{
        getEvents(mockRequest, mockResponse);
        expect(mockResponse.send).toHaveBeenCalledWith(events);
    })
})


describe('getEventsById', () =>{
    it('should get a event by its correspoing data', () =>{
        getEventsById(mockGetEventByIdRequestSuccess, mockResponse);
        expect(mockResponse.send).toHaveBeenCalledWith(events[0]);
    })

    it('should call getEventsById with 404 when event not found', () =>{
        getEventsById(mockGetEventByIdRequestFailure, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
})


describe('createEvent', () => {
    it('should create a event given ...', () =>{
        createEvent(mockCreateEventSuccess, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
    })
    it('should call createEvent with 400 when a event already exists', () =>{
        createEvent(mockCreateExistingEvent, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
    })
    
    it('should call createEvent with 400 when there are errors', () =>{
        createEvent(mockCreateEventFailure, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
    })
        
})

describe('deleteEvent', () =>{
    it('should delete a event by id without history', () =>{
        deleteEventById(mockDeleteEventByIdRequestSuccess1, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    })
    it('should delete a event by id with history', () =>{
        deleteEventById(mockDeleteEventByIdRequestSuccess1, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    })

    it('should call deleteEvent with 404 when event not found', () =>{
        deleteEventById(mockDeleteEventByIdRequestFailure, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
})

