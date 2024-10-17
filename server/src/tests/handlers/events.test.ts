import { events } from "../../data";
import { createEvent, deleteEventByIndex, getEvents, getEventsById } from "../../handlers/events";
import { mockRequest, mockResponse } from "../mocks";
import { mockCreateEventFailure, mockCreateEventSuccess, mockCreateExistingEvent, mockDeleteEventByIdRequestFailure, mockDeleteEventByIdRequestSuccess, mockGetEventByIdRequestFailure, mockGetEventByIdRequestSuccess } from "../mocks/events";

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

    it('should call getEventsById with 404 when user not found', () =>{
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
    it('should delete a event by id', () =>{
        deleteEventByIndex(mockDeleteEventByIdRequestSuccess, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    })

    it('should call deleteEvent with 404 when user not found', () =>{
        deleteEventByIndex(mockDeleteEventByIdRequestFailure, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
})

