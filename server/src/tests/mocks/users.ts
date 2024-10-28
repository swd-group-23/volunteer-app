import { Request } from "express";
import { CreateUserRequest, LoginUserRequest, UpdateUserRequest } from "../../models/users.model";
import { ObjectId } from "mongodb";

export const mockGetUserByIdRequestSuccessMongo = {
    params: { id: '6716e1677e6f955f4a567f00' },
  } as Request<{ id: string }>;

export const mockGetUserByIdRequestFailureMongo = {
    params: { id: '1' },
} as Request<{ id: string }>;

export const MockGetUserByIdResponseSucessMongo = {_id:  new ObjectId('6716e1677e6f955f4a567f00'), email: "alan@gmail.com", password: "12345678", role: "volunteer"}   

export const mockDeleteUserByIdRequestSuccess1Mongo = {
    params: { id: '6716e1677e6f955f4a567f05' },
  } as Request<{ id: string }>;
  export const mockDeleteUserByIdRequestSuccess2Mongo = {
    params: { id: '6716e1677e6f955f4a567f03' },
  } as Request<{ id: string }>;
  export const mockDeleteUserByIdRequestSuccess3Mongo = {
    params: { id: '6716e1677e6f955f4a567f00' },
  } as Request<{ id: string }>;

export const mockDeleteUserByIdRequestFailureMongo = {
    params: { id: '200' },
} as Request<{ id: string }>;


// Dummy data mocks

export const mockGetUserByIdRequestSuccess = {
    params: { id: 1 },
  } as Request<{ id: number }>;

export const mockGetUserByIdRequestFailure = {
    params: { id: 200 },
} as Request<{ id: number }>;


export const mockLoginUserSuccess = {
    body: {
        email: "admin@gmail.com",
        password: "12345678"
    }
} as Request<{}, {}, LoginUserRequest>;

export const mockLoginUserFailure = {
    body: {
        email: "admin@gmail.com",
        password: "123"
    }
} as Request<{}, {}, LoginUserRequest>;

export const mockCreateUserSuccess = {
    body: {
        email: "mock@gmail.com",
        password: "1234",
        role: "volunteer"
    }
} as Request<{}, {}, CreateUserRequest>;

export const mockCreateUserFailure = {
} as Request<{}, {}, CreateUserRequest>;

export const mockCreateExistingUser = {
    body: {
        email: "admin@gmail.com",
        password: "12345678",
        role: "admin"
    }
} as Request<{}, {}, CreateUserRequest>;

export const mockUpdateUserSuccess = {
    body: {
        email: "admin@gmail.com",
        password: "12345678Update",
        role: "volunteer"
    }
} as Request<{}, {}, UpdateUserRequest>;
export const mockUpdateUserFailure = {
    body: {
        email: "tester@gmail.com",
        password: "12345678Update",
        role: "volunteer"
    }
} as Request<{}, {}, UpdateUserRequest>;

export const mockDeleteUserByIdRequestSuccess1 = {
    params: { id: 6 },
  } as Request<{ id: number }>;
  export const mockDeleteUserByIdRequestSuccess2 = {
    params: { id: 4 },
  } as Request<{ id: number }>;
  export const mockDeleteUserByIdRequestSuccess3 = {
    params: { id: 1 },
  } as Request<{ id: number }>;

export const mockDeleteUserByIdRequestFailure = {
    params: { id: 200 },
} as Request<{ id: number }>;
