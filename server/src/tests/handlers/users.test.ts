import { users } from "../../data";
import { createUser, deleteUser, getUsersMongo, getUsersById, loginUser } from "../../handlers/users"
import { mockRequest, mockResponse } from "../mocks";
import { mockCreateExistingUser, mockCreateUserFailure, mockCreateUserSuccess, mockDeleteUserByIdRequestFailure, mockDeleteUserByIdRequestSuccess1, mockDeleteUserByIdRequestSuccess2, mockDeleteUserByIdRequestSuccess3, mockGetUserByIdRequestFailure, mockGetUserByIdRequestSuccess, mockLoginUserFailure, mockLoginUserSuccess} from "../mocks/users";
import { closeDatabaseConnection, collections } from "../../configs/database.service";
import { connectToDatabase } from "../../configs/database.service";
import { MongoUser } from "../../models/users.model";

declare global{
    var __MONGO_URI__: string;
    var __MONGO_DB_NAME__: string
}

// jest.mock("express-validator", () => ({
//     validationResult: jest.fn(() => ({
//         isEmpty: jest.fn(() => false),
//         array: jest.fn(() => [{msg: "Invalid field"}])
//     }))
// }))


describe('MongoDB User Service Tests', () => {
    connectToDatabase()
    .then(() => {
        describe('getUsers', () => {
            it('should return an array of users', async () => {
                const users = await collections.user?.find({}).toArray() as unknown as MongoUser[];
                getUsersMongo(mockRequest, mockResponse);
                expect(mockResponse.send).toEqual(users);
                });
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });

    closeDatabaseConnection()
    .then(() => {})
    .catch(() => {})

  });


describe('getUsersById', () =>{
    it('should get a user by id', () =>{
        getUsersById(mockGetUserByIdRequestSuccess, mockResponse);
        expect(mockResponse.send).toHaveBeenCalledWith(users[0]);
    })

    it('should call getUsersById with 404 when user not found', () =>{
        getUsersById(mockGetUserByIdRequestFailure, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
})


describe('loginUser', () =>{
    it('should login user by email and password', () =>{
        loginUser(mockLoginUserSuccess, mockResponse);
        expect(mockResponse.send).toHaveBeenCalledWith({
            id: "5",
            role: 'admin'
        });
    })

    it('should call loginUser with 404 when user not found', () =>{
        loginUser(mockLoginUserFailure, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
})


describe('createUser', () => {
    it('should create a user given the email and password', () =>{
        createUser(mockCreateUserSuccess, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
    })
    it('should call createUser with 400 when a user already exists', () =>{
        createUser(mockCreateExistingUser, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
    })
    it('should call createUser with 400 when there are errors', () =>{
        createUser(mockCreateUserFailure, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
    })
})

describe('deleteUser', () =>{
    it('should delete a user by id that is not a volunteer', () =>{
        deleteUser(mockDeleteUserByIdRequestSuccess1, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    })
    it('should delete a user by id that is a volunteer', () =>{
        deleteUser(mockDeleteUserByIdRequestSuccess2, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    })
    it('should delete a user by id that is a volunteer and has history', () =>{
        deleteUser(mockDeleteUserByIdRequestSuccess3, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    })


    it('should call deleteUser with 404 when user not found', () =>{
        deleteUser(mockDeleteUserByIdRequestFailure, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
})