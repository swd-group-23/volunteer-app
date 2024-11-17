import { users } from "../../data";
import { createUser, deleteUser, getUsersMongo, getUsersById, loginUser, getUsersByIdMongo, loginUserMongo, createUserMongo, deleteUserMongo, updateUserMongo } from "../../handlers/users"
import { mockRequest, mockResponse } from "../mocks";
import { mockCreateExistingUser, mockCreateUserFailure, mockCreateUserSuccess, mockDeleteUserByIdRequestFailure, mockDeleteUserByIdRequestFailureMongo, mockDeleteUserByIdRequestSuccess1, mockDeleteUserByIdRequestSuccess1Mongo, mockDeleteUserByIdRequestSuccess2, mockDeleteUserByIdRequestSuccess2Mongo, mockDeleteUserByIdRequestSuccess3, mockDeleteUserByIdRequestSuccess3Mongo, mockGetUserByIdRequestFailure, mockGetUserByIdRequestFailureMongo, mockGetUserByIdRequestSuccess, mockGetUserByIdRequestSuccessMongo, mockLoginUserFailure, mockLoginUserSuccess, mockUpdateUserFailure, mockUpdateUserSuccess} from "../mocks/users";
import { closeDatabaseConnection, collections } from "../../configs/database.service";
import { connectToDatabase } from "../../configs/database.service";
import { ObjectId } from "mongodb";


// jest.mock("express-validator", () => ({
//     validationResult: jest.fn(() => ({
//         isEmpty: jest.fn(() => false),
//         array: jest.fn(() => [{msg: "Invalid field"}])
//     }))
// }))

describe("Users Handlers with MongoDB", () => {
    beforeAll(async() => {
        await connectToDatabase(true);
    })

    afterAll(async () => {
        await closeDatabaseConnection();
    })

    describe('getUsers', () => {
        it('should return an array of users', async () => {
            await getUsersMongo(mockRequest, mockResponse)
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });
    });

    describe('getUsersById', () => {
        it('should get a user by id', async () =>{
                await getUsersByIdMongo(mockGetUserByIdRequestSuccessMongo, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(200);
        })

        it('should call getUsersById with 404 when user not found', async () =>{
                await getUsersByIdMongo(mockGetUserByIdRequestFailureMongo, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(404);
        });
    });

    describe('loginUser', () =>{
        it('should login user by email and password', async () =>{
                await loginUserMongo(mockLoginUserSuccess, mockResponse);
                expect(mockResponse.send).toHaveBeenCalledWith({
                    id: "6716e1677e6f955f4a567f04",
                    role: 'admin'
                });
        })

        it('should call loginUser with 404 when user not found', async () =>{
                await loginUserMongo(mockLoginUserFailure, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(404);
        });
    })

    describe('createUser', () => {
        it('should create a user given the email and password', async () =>{
                await createUserMongo(mockCreateUserSuccess, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(201);
                // clean up
                await collections.user?.deleteMany({email: "mock@gmail.com"})

        })
        
        it('should call createUser with 400 when a user already exists', async () =>{
                await createUserMongo(mockCreateExistingUser, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(400);

        })

        it('should call createUser with 400 when there are errors', async () =>{
                await createUserMongo(mockCreateUserFailure, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(400);
        })
    })


    describe('deleteUser', () =>{
        it('should delete a user by id that is not a volunteer', async () =>{
                await deleteUserMongo(mockDeleteUserByIdRequestSuccess1Mongo, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(202);
                // clean up
                await collections.user?.insertOne({
                    email: "volunteer@gmail.com",
                    password: "$2b$10$TKOVMEgEdzIpbYDB4vJDB.cmELcuPHvDpQ/Z7FUpxyE6jd4lBVqZq",
                    role: "volunteer",
                    _id: new ObjectId("6716e1677e6f955f4a567f05")
                })
        })

        it('should delete a user by id that is a volunteer', async () =>{
                await deleteUserMongo(mockDeleteUserByIdRequestSuccess2Mongo, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(202);
                // clean up
                await collections.user?.insertOne({
                    email: "jusvin@gmail.com",
                    password: "$2b$10$1Yku8WZ.AyayI4SZvSfVAePB16Metrii72Tnt2xk8r6w44PcE/LhS",
                    role: "volunteer",
                    _id: new ObjectId("6716e1677e6f955f4a567f03")
                })
                await collections.volunteer?.insertOne({
                    _id: new ObjectId("6716e5dc2dd5346d39bdf340"),
                    userId: new ObjectId("6716e1677e6f955f4a567f03"),
                    name: "Jusvin",
                    email: "jusvin@gmail.com",
                    password: "test",
                    address1: "123",
                    address2: "drive",
                    city: "houston",
                    state: "tx",
                    zip: 1234,
                    skills: ["deploy", "code"],
                    preferences: "night",
                    availability: [
                    "2024-12-01T00:00:00",
                    "2024-12-05T00:00:00"
                    ]
                });
        })

        it('should delete a user by id that is a volunteer and has history', async () =>{
                await deleteUserMongo(mockDeleteUserByIdRequestSuccess3Mongo, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(202);
                // clean up
                await collections.user?.insertOne({
                    _id: new ObjectId("6716e1677e6f955f4a567f00"),
                    email: "alan@gmail.com",
                    password: "$2b$10$OM3ImU7atYxvqdAgZ8CYV.r.dWTYR5uDv11/S.Z/AMBVtlUuo8ku2",
                    role: "volunteer"
                })
                await collections.volunteer?.insertOne({
                    _id: new ObjectId("6716e5dc2dd5346d39bdf33d"),
                    userId: new ObjectId("6716e1677e6f955f4a567f00"),
                    name: "Alan",
                    email: "alan@gmail.com",
                    password: "test",
                    address1: "123",
                    address2: "drive",
                    city: "houston",
                    state: "tx",
                    zip: 1234,
                    skills: ["sleep", "eat"],
                    preferences: "morning",
                    availability: [
                    "2024-09-12T00:00:00",
                    "2024-09-14T00:00:00"
                    ]
                })
                await collections.history?.insertMany([
                    {
                        _id: new ObjectId("6716e5602dd5346d39bdf32e"),
                        volunteerId: new ObjectId("6716e5dc2dd5346d39bdf33d"),
                        eventId: new ObjectId("6716e4ab2dd5346d39bdf320"),
                        status: ["Participated"]
                    },
                    {
                        _id: new ObjectId("6716e5602dd5346d39bdf330"),
                        volunteerId: new ObjectId("6716e5dc2dd5346d39bdf33d"),
                        eventId: new ObjectId("6716e4ab2dd5346d39bdf322"),
                        status: ["Canceled"]
                    }
                ])
        })

        it('should call deleteUser with 404 when user not found', async () =>{
                await deleteUserMongo(mockDeleteUserByIdRequestFailureMongo, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(404);
        });
    })

    describe('updateUser', () => {
        it('should update a user by id', async () => {
                await updateUserMongo(mockUpdateUserSuccess, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(200);
                // clean up
                await collections.user?.updateOne({_id: new ObjectId('6716e1677e6f955f4a567f04')}, {
                    $set: {
                        email: "admin@gmail.com",
                        password: "$2b$10$TKOVMEgEdzIpbYDB4vJDB.cmELcuPHvDpQ/Z7FUpxyE6jd4lBVqZq",
                        role: "admin"
                    } 
                })
        })

        it('should call updateUser with 404 for unknown user', async () => {
                await updateUserMongo(mockUpdateUserFailure, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(404);
        })

    })

})


// DUMMY DATA - IGNORE
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