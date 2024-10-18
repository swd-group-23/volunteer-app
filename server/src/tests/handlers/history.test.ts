import { histories } from "../../data";
import { getHistoryById, getHistory} from "../../handlers/history"
import { History } from "../../models/history.model";
import { mockRequest, mockResponse } from "../mocks";
import { mockGetHistoryByIdRequestFailure, mockGetHistoryByIdRequestSuccess } from "../mocks/history";


const expectedResponse = [
    {
        id: "1",
        volunteerId: "1",
        volunteerName: "Alan",
        eventName: "Houston Food Bank",
        eventDescription: "Feeding the community",
        location: "Portwall, Houston, Texas. 77546",
        skills: ["packing", "carrying"],
        urgency: "mild",
        eventDate: new Date("2024-09-14T00:00:00.000Z"),
        status: ["Participated"]
    },
    {
        id: "3",
        volunteerId: "1",
        volunteerName: "Alan",
        eventName: "Public Library",
        eventDescription: "Knowledge for the community",
        location: "Smith Street, Houston, Texas. 77546",
        skills: ["organizing", "helping"],
        urgency: "low",
        eventDate: new Date("2024-11-08T00:00:00.000Z"),
        status: ["Canceled"]
    }
];

const expectedGetHistoryResponse = [
    {
        id: "1",
        volunteerId: "1",
        volunteerName: "Alan",
        eventName: "Houston Food Bank",
        eventDescription: "Feeding the community",
        location: "Portwall, Houston, Texas. 77546",
        skills: ["packing", "carrying"],
        urgency: "mild",
        eventDate: new Date("2024-09-14T00:00:00.000Z"),
        status: ["Participated"]
    },
    {
        id: "2",
        volunteerId: "2",
        volunteerName: "Alina",
        eventName: "Homeless Shelter",
        eventDescription: "Feeding the homeless",
        location: "Westhiemer, Houston, Texas. 77546",
        skills: ["packing", "carrying"],
        urgency: "mild",
        eventDate: new Date("2024-10-15T00:00:00.000Z"),
        status: ["Participated"]
    },
    {
        id: "3",
        volunteerId: "1",
        volunteerName: "Alan",
        eventName: "Public Library",
        eventDescription: "Knowledge for the community",
        location: "Smith Street, Houston, Texas. 77546",
        skills: ["organizing", "helping"],
        urgency: "low",
        eventDate: new Date("2024-11-08T00:00:00.000Z"),
        status: ["Canceled"]
    },
    {
        id: "4",
        volunteerId: "3",
        volunteerName: "Josh",
        eventName: "Blood Drive",
        eventDescription: "Saving lives",
        location: "Midtown, Houston, Texas. 77546",
        skills: ["packing", "assisting"],
        urgency: "high",
        eventDate: new Date("2024-12-01T00:00:00.000Z"),
        status: ["No show"]
    }
];


describe('getHistoryById', () =>{
    it('should get a history by id', () =>{
        getHistoryById(mockGetHistoryByIdRequestSuccess, mockResponse);
        expect(mockResponse.send).toHaveBeenCalledWith(expectedResponse);
    })

    it('should call getHistoryById with 404 when user not found', () =>{
        getHistoryById(mockGetHistoryByIdRequestFailure, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
})

describe('getHistory', () =>{
    it('should return an array of histories', () =>{
        getHistory(mockRequest, mockResponse);
        expect(mockResponse.send).toHaveBeenCalledWith(expectedGetHistoryResponse);
    })
    it('should return with 404 when histories is empty', () =>{
        const originalHistories = [...histories];
        histories.length = 0
        getHistory(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        histories.push(...originalHistories);
    })
})


/*
describe('getHistory', () => {

    it('should return an array of histories', () => {
        getHistory(mockRequest, mockResponse);
        expect(mockResponse.send).toHaveBeenCalledWith(expectedGetHistoryResponse);
    });

    it('should return 404 when no histories are found', () => {
        (histories as any).length = 0; 
        getHistory(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.send).toHaveBeenCalledWith('Event History not found');
    });
});*/

