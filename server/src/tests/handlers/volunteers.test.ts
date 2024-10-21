import { volunteers } from "../../data";
import { createVolunteer, getVolunteerById, getVolunteers, postVolunteerMatch, updateVolunteer} from "../../handlers/volunteer";
import { mockRequest,mockResponse } from "../mocks";
import { mockCreateExistingVolunteer, mockCreateVolunteerFailure, mockCreateVolunteerSuccess, mockGetVolunteerByIdRequestFailure, mockGetVolunteerByIdRequestSuccess, mockMatchVolunteerRequestDuplicate, mockMatchVolunteerRequestFailure, mockMatchVolunteerRequestFailure2, mockMatchVolunteerRequestSuccess, mockUpdateVolunteerFailure, mockUpdateVolunteerSuccess } from "../mocks/volunteers";

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
    it('should update a user by id', () =>{
        updateVolunteer(mockUpdateVolunteerSuccess, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    })

    it('should call updateUser with 404 when user not found', () =>{
        updateVolunteer(mockUpdateVolunteerFailure, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
})