import { Request, Response } from "express";
import { histories } from "../data";
import { History } from "../models/history.model";

export function getHistoryById(request: Request<{ id: string }>, response: Response<History[] | string>) {
    const history = histories.filter((history) => history.userId == request.params.id);
    if (history.length > 0) {
        return response.send(history); // Now it's returning an array of History
    } else {
        return response.status(404).send('Event History not found');
    }
}
