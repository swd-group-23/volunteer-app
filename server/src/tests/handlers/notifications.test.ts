import { validationResult } from "express-validator";
import { notifications, users } from "../../data";
import { getNotifications, getNotifsById, createNotifications} from "../../handlers/notifications"
import { mockRequest, mockResponse } from "../mocks";
import { mockCreateNotifSuccess,mockCreateNotifFailure, mockGetNotifByIdRequestSuccess,mockGetNotifByIdRequestFailure, mockGetNotifSuccess,mockGetNotifFailure} from "../mocks/notifications";



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