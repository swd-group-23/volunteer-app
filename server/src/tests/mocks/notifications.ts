import { Request, Response } from "express";
import { createNotif, Notification} from "../../models/notifications.model";


  export const mockGetNotifSuccess = {
    body: {
        id: "1",
        userId: "1",
        time: new Date('2024-12-01'),
        eventId: "1",
        message: "Your Houston Food Bank Shift is coming up!",
    }
} as Request<{}, {}, Notification>;


export const mockGetNotifFailure = {
    body: {
        id: "300",
        userId: "300",
        time: new Date('2024-12-01'),
        eventId: "300",
        message: "Your Houston Food Bank Shift is coming up!",
    }
} as Request<{}, {}, Notification>;

export const mockGetNotifByIdRequestSuccess = {
    params: { id: "1" },
  } as Request<{ id: string }>;

export const mockGetNotifByIdRequestFailure = {
    params: { id: "200" },
} as Request<{ id: string }>;

export const mockCreateNotifSuccess = {
    body: {
        id: "string",
        userId: "string",
        time: new Date('2024-12-01'),
        eventId: "string",
        message: "string",
    }
} as Request<{}, {}, createNotif>;

export const mockCreateNotifFailure = {
} as Request<{}, {}, createNotif>;

export const mockDeleteNotifByIdRequestSuccess = {
    params: { id: '1' },
  } as Request<{ id: string }>;

export const mockDeleteNotifByIdRequestFailure = {
    params: { id: '100' },
} as Request<{ id: string }>;