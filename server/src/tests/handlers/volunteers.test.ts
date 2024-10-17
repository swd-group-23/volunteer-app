import { volunteers } from "../../data";
import { createVolunteer, getVolunteerById, getVolunteers} from "../../handlers/volunteer";
import { mockRequest,mockResponse } from "../mocks";
import { mockCreateExistingVolunteer, mockCreateVolunteerFailure, mockCreateVolunteerSuccess, mockGetVolunteerByIdRequestFailure, mockGetVolunteerByIdRequestSuccess } from "../mocks/volunteers";

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


describe('createUser', () => {
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