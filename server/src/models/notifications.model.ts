export interface Notification {
    id: string;
    userId: string;
    time: Date;
    eventId: string;
    message: string;
};

export interface createNotif {
    id: string;
    userId: string;
    time: Date;
    eventId: string;
    message: string;
};

export interface GetNotificationsResponse{
    id: string;
    userId: string;
    time: Date;
    eventId: string;
    eventName: string;
    eventDate: Date;
    message: string;
};