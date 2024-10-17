import { validationResult } from "express-validator";
import { histories, historyResponse } from "../../data";
import { getHistoryById } from "../../handlers/history"
import { mockRequest, mockResponse } from "../mocks";
import { mockGetHistoryByIdRequestFailure, mockGetHistoryByIdRequestSuccess } from "../mocks/history";


const expectedResponse = [
    {
        id: "1",
        volunteerId: "1",
        volunteerName: "Alan",
        eventName: "Houston Food Bank",
        eventDescription: "Feeding the community",
        location: "Portwall",
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
        location: "Portwall",
        skills: ["organizing", "helping"],
        urgency: "low",
        eventDate: new Date("2024-11-08T00:00:00.000Z"),
        status: ["Canceled"]
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
