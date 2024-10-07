import { users } from "../../data";
import { createUser, deleteUser, getUsers, getUsersById, loginUser } from "../../handlers/users"
import { mockRequest, mockResponse } from "../mocks";
import { mockCreateExistingUser, mockCreateUserSuccess, mockDeleteUserByIdRequestFailure, mockDeleteUserByIdRequestSuccess, mockGetUserByIdRequestFailure, mockGetUserByIdRequestSuccess, mockLoginUserFailure, mockLoginUserSuccess, mockUpdateUserFailure, mockUpdateUserSuccess } from "../mocks/users";

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
            id: "1",
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
    it('should call createUser with ', () =>{
        createUser(mockCreateExistingUser, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(403);
    })
})

describe('deleteUser', () =>{
    it('should delete a user by id', () =>{
        deleteUser(mockDeleteUserByIdRequestSuccess, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    })

    it('should call deleteUser with 404 when user not found', () =>{
        getUsersById(mockDeleteUserByIdRequestFailure, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
})

describe('updateUser', () =>{
    it('should update a user by id', () =>{
        deleteUser(mockUpdateUserSuccess, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    })

    it('should call updateUser with 404 when user not found', () =>{
        getUsersById(mockUpdateUserFailure, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
})