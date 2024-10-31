import { Request } from "express";


export const mockGetHistoryByIdRequestSuccessMongo = {
  params: { id: '6716e1677e6f955f4a567f00' },
} as Request<{ id: string }>;

export const mockGetHistoryByIdRequestFailureMongo = {
  params: { id: '6716e1677e6f955f4a567f01' }, // Another valid ObjectId format, not found in the database
} as Request<{ id: string }>;

export const mockGetHistoryByIdRequestSuccess = {
  params: { id: '1' }, 
} as unknown as Request<{ id: string }>;


export const mockGetHistoryByIdRequestFailure = {
  params: { id: '200' }, 
} as unknown as Request<{ id: string }>;