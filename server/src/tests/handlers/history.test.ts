import { Request } from "express";
import { connectToDatabase, closeDatabaseConnection, collections } from "../../configs/database.service";
import { getHistoryMongo, getHistoryByIdMongo } from "../../handlers/history";
import { ObjectId } from "mongodb";

// Sample data for testing
const sampleHistoryData = [
    {
        _id: new ObjectId("6527fbf19b7f4b4aabd4c6f7"),
        volunteerId: new ObjectId("6716e1677e6f955f4a567f00"),
        eventId: new ObjectId("6716e1677e6f955f4a567f01"),
        status: ["Participated"]
    }
];

const sampleVolunteerData = [
    {
        _id: new ObjectId("6716e1677e6f955f4a567f00"),
        userId: new ObjectId(),
        name: "Alan",
        email: "alan@example.com",
        password: "password123",
        address1: "123 Main St",
        address2: "Apt 1",
        city: "Houston",
        state: "TX",
        zip: 77001,
        skills: ["packing", "carrying"],
        availability: [new Date("2024-09-14T00:00:00.000Z")],
    }
];

const sampleEventData = [
    {
        _id: new ObjectId("6716e1677e6f955f4a567f01"),
        name: "Houston Food Bank",
        description: "Feeding the community",
        location: "Portwall, Houston, Texas. 77546",
        dateTime: new Date("2024-09-14T00:00:00.000Z"),
        skills: ["packing", "carrying"],
        urgency: "mild"
    }
];

// Mock response
const mockResponse = () => {
    const res = {} as any;
    res.status = jest.fn().mockReturnThis();
    res.send = jest.fn().mockReturnThis();
    return res;
};

describe("History Handlers with MongoDB", () => {
    beforeAll(async () => {
        await connectToDatabase(true); // Connect to test database
    });

    afterAll(async () => {
        await closeDatabaseConnection(); // Close database connection after all tests
    });

    beforeEach(async () => {
        // Clear collections and insert sample data
        await collections.history?.deleteMany({});
        await collections.volunteer?.deleteMany({});
        await collections.event?.deleteMany({});
        
        await collections.history?.insertMany(sampleHistoryData);
        await collections.volunteer?.insertMany(sampleVolunteerData);
        await collections.event?.insertMany(sampleEventData);
    });

    describe("getHistoryMongo", () => {
        it("should return an array of histories", async () => {
            const req = {} as Request;
            const res = mockResponse();

            await getHistoryMongo(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(expect.arrayContaining([
                expect.objectContaining({
                    id: sampleHistoryData[0]._id.toString(),
                    volunteerId: sampleVolunteerData[0]._id.toString(),
                    volunteerName: "Alan",
                    eventName: "Houston Food Bank",
                })
            ]));
        });

        it("should return 404 when no histories are found", async () => {
            await collections.history?.deleteMany({}); // Clear the history collection

            const req = {} as Request;
            const res = mockResponse();

            await getHistoryMongo(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith("Event History not found");
        });
    });

    describe("getHistoryByIdMongo", () => {
        it("should return a history by volunteer id", async () => {
            const req = { params: { id: sampleVolunteerData[0]._id.toString() } } as Request<{ id: string }>;
            const res = mockResponse();

            await getHistoryByIdMongo(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(expect.arrayContaining([
                expect.objectContaining({
                    id: sampleHistoryData[0]._id.toString(),
                    volunteerId: sampleVolunteerData[0]._id.toString(),
                    volunteerName: "Alan",
                    eventName: "Houston Food Bank",
                })
            ]));
        });

        it("should return 404 when history for volunteer id is not found", async () => {
            const req = { params: { id: new ObjectId().toString() } } as Request<{ id: string }>; // Non-existent ID
            const res = mockResponse();

            await getHistoryByIdMongo(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith("Volunteer History not found");
        });

        it("should return 400 when id format is invalid", async () => {
            const req = { params: { id: "invalid-id" } } as Request<{ id: string }>; // Invalid ObjectId format
            const res = mockResponse();

            await getHistoryByIdMongo(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith("Invalid ID format");
        });
    });
});











/*import { histories } from "../../data";
import { getHistoryById, getHistory, getHistoryMongo, getHistoryByIdMongo} from "../../handlers/history"
import { History } from "../../models/history.model";
import { mockRequest, mockResponse} from "../mocks";
import { mockGetHistoryByIdRequestFailure, mockGetHistoryByIdRequestSuccess, mockGetHistoryByIdRequestSuccessMongo, mockGetHistoryByIdRequestFailureMongo} from "../mocks/history";
import { closeDatabaseConnection, collections } from "../../configs/database.service";
import { connectToDatabase } from "../../configs/database.service";
import { ObjectId } from "mongodb";
import { Request } from "express";


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





//DUMMY DATA TESTS
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
})*/