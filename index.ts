import { Request, Response, NextFunction } from "express";

export function monitor(req: Request, res: Response, next: NextFunction) {
    let start = new Date;
    res.on('finish', function () {
        const duration: number = Math.abs(new Date().getTime() - start.getTime());;
        const typeOfRequest = req.method;
        const statusOfRequest = res.statusCode;
        const message = res.statusMessage;
        console.log(duration, typeOfRequest, statusOfRequest, message);
    });
    next();
};

module.exports = {
    monitor
}