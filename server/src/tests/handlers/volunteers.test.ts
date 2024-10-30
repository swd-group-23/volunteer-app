import { ObjectId } from "mongodb";
import { closeDatabaseConnection, collections, connectToDatabase } from "../../configs/database.service";
import { volunteers } from "../../data";
import { createVolunteer, createVolunteerMongo, getVolunteerById, getVolunteerByIdMongo, getVolunteers, getVolunteersMongo, postVolunteerMatch, updateVolunteer, updateVolunteerMongo} from "../../handlers/volunteer";
import { mockRequest,mockResponse } from "../mocks";
import { mockCreateExistingVolunteer, mockCreateVolunteerFailure, mockCreateVolunteerSuccess, mockGetVolunteerByIdRequestFailure, mockGetVolunteerByIdRequestFailureMongo, mockGetVolunteerByIdRequestSuccess, mockGetVolunteerByIdRequestSuccessMongo, mockMatchVolunteerRequestDuplicate, mockMatchVolunteerRequestFailure, mockMatchVolunteerRequestFailure2, mockMatchVolunteerRequestSuccess, mockUpdateVolunteerFailure, mockUpdateVolunteerSuccess } from "../mocks/volunteers";

describe('getVolunteers', () => {
    it('should return an array of volunteer', async () => {
        await connectToDatabase(true).then(async () => {
            await getVolunteersMongo(mockRequest, mockResponse)
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            await closeDatabaseConnection();
        });
    });
});

describe('getVolunteersById', () => {
    it('should get a volunteer by id', async () =>{
        await connectToDatabase(true).then(async () => {
            await getVolunteerByIdMongo(mockGetVolunteerByIdRequestSuccessMongo, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            await closeDatabaseConnection();
        })
    })

    it('should call getVolunteersById with 404 when volunteer not found', async () =>{
        await connectToDatabase(true).then(async() => {
            await getVolunteerByIdMongo(mockGetVolunteerByIdRequestFailureMongo, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(404);
            await closeDatabaseConnection();
        })
    });
});
describe('createVolunteer', () => {
    it('should create a volunteer given the email and password', async () =>{
        await connectToDatabase(true).then(async() => {
            await createVolunteerMongo(mockCreateVolunteerSuccess, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            // clean up
            await collections.volunteer?.deleteMany({email: "mock@gmail.com"})
            await closeDatabaseConnection();
        })

    })
    
    it('should call createVolunteer with 400 when a volunteer already exists', async () =>{
        await connectToDatabase(true).then(async() => {
            await createVolunteerMongo(mockCreateExistingVolunteer, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(400);
            await closeDatabaseConnection();
        })

    })

    it('should call createVolunteer with 400 when there are errors', async () =>{
        await connectToDatabase(true).then(async() => {
            await createVolunteerMongo(mockCreateVolunteerFailure, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(400);
            await closeDatabaseConnection();
        })
    })
})

describe('updateVolunteer', () => {
    it('should update a volunteer by id', async () => {
        await connectToDatabase(true).then(async () => {
            await updateVolunteerMongo(mockUpdateVolunteerSuccess, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(200);

            // Clean up
            await collections.volunteer?.updateOne({ _id: new ObjectId("6716e5dc2dd5346d39bdf33d") },{
                    $set: {
                        userId: new ObjectId("6716e1677e6f955f4a567f00"),
                        name: "Alan",
                        email: "alan@gmail.com",
                        password: "test",
                        address1: "123",
                        address2: "drive",
                        city: "houston",
                        state: new ObjectId("6716e4d6daa3a6f650baf855"),
                        zip: "1234",
                        skills: ["Cooking", "Organizing"],
                        preferences: "morning",
                        availability: ["Monday", "Wednesday"]
                    }
                }
            );
            await closeDatabaseConnection();
        });
    });

    it('should call updateVolunteer with 404 for unknown volunteer', async () => {
        await connectToDatabase(true).then(async () => {
            await updateVolunteerMongo(mockUpdateVolunteerFailure, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(404);
            await closeDatabaseConnection();
        });
    });
});




//DUMMY
describe('getVolunteers', () =>{
    it('should return an array of volunteers', () =>{
        getVolunteers(mockRequest, mockResponse);
        expect(mockResponse.send).toHaveBeenCalledWith(volunteers);
    })
})

describe('getVolunteersById', () =>{
    it('should get a volunteer by id', () =>{
        getVolunteerById(mockGetVolunteerByIdRequestSuccess, mockResponse);
        expect(mockResponse.send).toHaveBeenCalledWith(volunteers[0]);
    })

    it('should call getVolunteersById with 404 when volunteer not found', () =>{
        getVolunteerById(mockGetVolunteerByIdRequestFailure, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
})


describe('creatVolunteer', () => {
    it('should create a volunteer given the corresponding data', () =>{
        createVolunteer(mockCreateVolunteerSuccess, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
    })
    it('should call createVolunteer with 400 when a volunteer already exists', () =>{
        createVolunteer(mockCreateExistingVolunteer, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
    })
    it('should call createVolunteer with 400 when there are errors', () =>{
        createVolunteer(mockCreateVolunteerFailure, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
    })
})

describe('matchVolunteer', () => {
    it('should match a volunteer given the corresponding data', () =>{
        postVolunteerMatch(mockMatchVolunteerRequestSuccess, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
    })
    it('should call matchVolunteer with 400 when there are errors', () =>{
        postVolunteerMatch(mockMatchVolunteerRequestFailure, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
    })
    it('should call matchVolunteer with 400 when there are errors', () =>{
        postVolunteerMatch(mockMatchVolunteerRequestFailure2, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
    })
    it('should call matchVolunteer with 400 when the volunteer is already matched for the event', () =>{
        postVolunteerMatch(mockMatchVolunteerRequestDuplicate, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
    })
})

describe('updateVolunteer', () =>{
    it('should update a volunteer by id', () =>{
        updateVolunteer(mockUpdateVolunteerSuccess, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    })

    it('should call updateVolunteer with 404 when volunteer not found', () =>{
        updateVolunteer(mockUpdateVolunteerFailure, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
})