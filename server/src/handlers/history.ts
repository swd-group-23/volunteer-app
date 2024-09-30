import { Request, Response } from "express";
import { histories } from "../data";
import { History } from "../models/history.model";


export function getHistoryById(request: Request<{id: string}>, response: Response<History | string>) { 
    const history = histories.find((history) => history.id == request.params.id);
    if(history) {
        return response.send(history);
    }
    else{
        return response.status(404).send('Event History not found');
    }
}