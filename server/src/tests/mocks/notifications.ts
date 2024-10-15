import { Request, Response } from "express";
import { createNotif, Notification} from "../../models/notifications.model";


  export const mockGetNotifSuccess = {
    body: {
        id: "string",
        userId: "string",
        time: new Date('2024-12-01'),
        eventId: "string",
        message: "string",
    }
} as Request<{}, {}, Notification>;


export const mockGetNotifFailure = {
    body: {
        id: "",
        userId: "",
        time: new Date('2024-12-01'),
        eventId: "",
        message: "",
    }
} as Request<{}, {}, Notification>;

export const mockGetNotifByIdRequestSuccess = {
    params: { id: "string" },
  } as Request<{ id: string }>;

export const mockGetNotifByIdRequestFailure = {
    params: { id: "" },
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