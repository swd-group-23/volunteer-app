import { getUsers } from "../../handlers/users"
import { mockRequest, mockResponse } from "../mocks";

describe('getUsers', () =>{
    it('should return an array of users', () =>{
        getUsers(mockRequest, mockResponse);
        expect(mockResponse.send).toHaveBeenCalledWith(['alan', 'alina', 'josh', 'jusvin']);
    })
})