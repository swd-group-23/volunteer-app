import { Request, Response } from "express";

export const mockGetHistoryByIdRequestSuccess = {
  params: { id: '1' }, 
} as unknown as Request<{ id: string }>;


export const mockGetHistoryByIdRequestFailure = {
  params: { id: '200' }, 
} as unknown as Request<{ id: string }>;