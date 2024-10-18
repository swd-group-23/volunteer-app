import { users } from "../../data";
import { createUser, deleteUser, getUsers, getUsersById, loginUser } from "../../handlers/users"
import { mockRequest, mockResponse } from "../mocks";
import { mockCreateExistingUser, mockCreateUserFailure, mockCreateUserSuccess, mockDeleteUserByIdRequestFailure, mockDeleteUserByIdRequestSuccess, mockGetUserByIdRequestFailure, mockGetUserByIdRequestSuccess, mockLoginUserFailure, mockLoginUserSuccess} from "../mocks/users";

// jest.mock("express-validator", () => ({
//     validationResult: jest.fn(() => ({
//         isEmpty: jest.fn(() => false),
//         array: jest.fn(() => [{msg: "Invalid field"}])
//     }))
// }))

describe('getUsers', () =>{
    it('should return an array of users', () =>{
        getUsers(mockRequest, mockResponse);
        expect(mockResponse.send).toHaveBeenCalledWith(users);
    })
})

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
    it('should delete a user by id', () =>{
        deleteUser(mockDeleteUserByIdRequestSuccess, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    })

    it('should call deleteUser with 404 when user not found', () =>{
        deleteUser(mockDeleteUserByIdRequestFailure, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
})