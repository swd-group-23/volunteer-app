import { Request, Response } from "express";

export const mockRequest = {} as Request;
export const mockResponse = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(), 
} as unknown as Response;