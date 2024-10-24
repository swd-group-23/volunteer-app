import { Request } from "express";
import { CreateUserRequest, LoginUserRequest } from "../../models/users.model";

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
