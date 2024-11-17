import { validationResult } from "express-validator";
import { notifications, users } from "../../data";
import {getNotificationsMongo, getNotifsByIdMongo, createNotificationsMongo, deleteNotificationMongo,getNotifications, getNotifsById, createNotifications,deleteNotification} from "../../handlers/notifications"
import { mockRequest, mockResponse } from "../mocks";
import { mockGetNotificationsByIdRequestSuccessMongo,mockGetNotificationsByIdRequestFailureMongo , mockCreateNotifSuccess,mockCreateNotifFailure, mockGetNotifByIdRequestSuccess,mockGetNotifByIdRequestFailure, mockDeleteNotifByIdRequestSuccess,mockDeleteNotifByIdRequestFailure, mockCreateNotifSuccessMongo, mockDeleteNotificationrByIdRequestSuccessMongo} from "../mocks/notifications";
import { closeDatabaseConnection, collections } from "../../configs/database.service";
import { connectToDatabase } from "../../configs/database.service";
import { ObjectId } from "mongodb";


// jest.mock("express-validator", () => ({
//     validationResult: jest.fn(() => ({
//         isEmpty: jest.fn(() => false),
//         array: jest.fn(() => [{msg: "Invalid field"}])
//     }))
// }))

describe("Notification Handlers with MongoDB", () => {
    beforeAll(async() => {
        await connectToDatabase(true);
    })

    afterAll(async () => {
        await closeDatabaseConnection();
    })

    describe('getNotifications ', () => {
        it('should return an array of notifications', async () => {
            await getNotificationsMongo(mockRequest, mockResponse)
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });
    });

    describe('getNotifsById', () => {
        it('should get a user by id', async () =>{
                await getNotifsByIdMongo(mockGetNotificationsByIdRequestSuccessMongo, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(200);
        })

        it('should call getNotifsById with 404 when user not found', async () =>{
                await getNotifsByIdMongo(mockGetNotificationsByIdRequestFailureMongo, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(404);
        });
    });


    describe('createNotification', () => {
        it('should create a notification given the body', async () =>{
                await createNotificationsMongo(mockCreateNotifSuccessMongo, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(201);
                // clean up
                await collections.notification?.deleteOne({message: "Mock"})

        })
        it('should call createNotif with 400 when there are errors', async () =>{
                await createNotificationsMongo(mockCreateNotifFailure, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(400);
        })
    })


    describe('deleteNotificationbyId', () => {
        it('should delete a notification given the notification id', async () =>{
                await deleteNotificationMongo(mockDeleteNotificationrByIdRequestSuccessMongo, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(201);
                // clean up
                await collections.notification?.insertOne({
                    _id: new ObjectId("6716e58a2dd5346d39bdf338"),
                    userId:new ObjectId( "671ab0d478b529b84a55f76a"),
                    time: "2024-12-01T00:00:00",
                    eventId: new ObjectId("6716e4ab2dd5346d39bdf322"),
                    message: "YourHouston Food Bank Shift is coming up!!"
                })

        })
        it('should call deleteNotificationbyId with 400 when there are errors', async () =>{
                await deleteNotificationMongo(mockGetNotificationsByIdRequestFailureMongo, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(400);
        })
    })

})


describe('getNotifications', () =>{
    it('should return an array of notifications', () =>{
        getNotifications(mockRequest, mockResponse);
        expect(mockResponse.send).toHaveBeenCalledWith(notifications);
    })
})

describe('getNotifsById', () =>{
    it('should get a notification by id', () =>{
        getNotifsById(mockGetNotifByIdRequestSuccess, mockResponse);
        expect(mockResponse.send).toHaveBeenCalledWith(notifications);
    })

    it('should call getNotifsById with 404 when user not found', () =>{
        getNotifsById(mockGetNotifByIdRequestFailure, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
})

describe('createNotifications', () => {
    it('should create a user given the email and password', () =>{
        createNotifications(mockCreateNotifSuccess, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
    })
    it('should call createNotifications with 404 when there are errors', () =>{
        createNotifications(mockCreateNotifFailure, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
    })
})

describe('deleteNotification', () =>{
    it('should delete a notification by id', () =>{
        deleteNotification(mockDeleteNotifByIdRequestSuccess, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(204);
    })

    it('should call deleteNotification with 404 when notification not found', () =>{
        deleteNotification(mockDeleteNotifByIdRequestFailure, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
})