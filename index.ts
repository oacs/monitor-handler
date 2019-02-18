import { Request, Response, NextFunction } from "express";
import RequestC from "./src/entity/request";
import { IRequest } from "./src/entity/IRequest";
import { AddressInfo } from "net";
import { IResponse } from "./src/entity/IResponse";
import onHeaders from 'on-headers';
import onFinished = require("on-finished");

export function monitor(req: Request, res: Response, next: NextFunction) {
    let start = new Date;
    const reqAny: any = req;
    const resAny: any = res;
    reqAny._startAt = undefined
    reqAny._startTime = undefined

    // response data
    resAny._startAt = undefined
    resAny._startTime = undefined

    recordStartTime.call(reqAny);
    onHeaders(res, recordStartTime)
    onFinished(res, function () {
        // const duration: number = Math.abs(new Date().getTime() - start.getTime());
        const duration: any = getResponseTimeToken(reqAny, resAny, 3);
        // req.app.routes
        const newRequest: IRequest = {
            baseUrl: req.baseUrl,
            body: req.body,
            connection: {
                remotePort: req.connection.remotePort ? req.connection.remotePort + '' : '',
                remoteFamily: req.connection.remoteFamily ? req.connection.remoteFamily : '',
                remoteAddress: req.connection.remoteAddress ? req.connection.remoteAddress : '',
                localPort: req.connection.localPort ? req.connection.localPort : 0,
                localAddress: req.connection.localAddress,
                address: req.connection.address() as AddressInfo,
            },
            cookies: req.cookies,
            headers: req.headers,
            hostname: req.hostname,
            httpVersion: req.httpVersion,
            ip: req.ip,
            ips: req.ips,
            method: req.method,
            originalUrl: req.originalUrl,
            params: req.params,
            path: req.path,
            protocol: req.protocol,
            query: req.query,
            secure: req.secure,
            statusCode: req.statusCode ? req.statusCode : 0,
            statusMessage: req.statusMessage ? req.statusMessage : '',
            subdomains: req.subdomains,
            trailers: req.trailers,
            url: req.url,
            xhr: req.xhr,
        }
        const newResponse: IResponse = {
            connection: {
                remotePort: res.connection && res.connection.remotePort ? res.connection.remotePort + '' : '',
                remoteFamily: res.connection && res.connection.remoteFamily ? res.connection.remoteFamily : '',
                remoteAddress: res.connection && res.connection.remoteAddress ? res.connection.remoteAddress : '',
                localPort: res.connection && res.connection.localPort ? res.connection.localPort : 0,
                localAddress: res.connection && res.connection.localAddress,
                address: res.connection && res.connection.address() as AddressInfo,
            },
            finished: res.finished,
            headers: res.getHeaders(),
            headersSent: res.headersSent,
            locals: res.locals,
            shouldKeepAlive: res.shouldKeepAlive,
            upgrading: res.upgrading,
            statusCode: res.statusCode ? res.statusCode : 0,
            statusMessage: res.statusMessage ? res.statusMessage : '',
        }
        const requestC = new RequestC(
            // {
            // duration, typeOfRequest, statusOfRequest, message
            // }
            {
                req: newRequest,
                res: newResponse,
                duration: duration
            }
        );
        requestC.save();
    })
    // res.on('finish', function () {
    //     // const duration: number = Math.abs(new Date().getTime() - start.getTime());
    //     const duration: any = getResponseTimeToken(reqAny, resAny, 3);
    //     // req.app.routes
    //     const newRequest: IRequest = {
    //         baseUrl: req.baseUrl,
    //         body: req.body,
    //         connection: {
    //             remotePort: req.connection.remotePort ? req.connection.remotePort + '' : '',
    //             remoteFamily: req.connection.remoteFamily ? req.connection.remoteFamily : '',
    //             remoteAddress: req.connection.remoteAddress ? req.connection.remoteAddress : '',
    //             localPort: req.connection.localPort ? req.connection.localPort : 0,
    //             localAddress: req.connection.localAddress,
    //             address: req.connection.address() as AddressInfo,
    //         },
    //         cookies: req.cookies,
    //         headers: req.headers,
    //         hostname: req.hostname,
    //         httpVersion: req.httpVersion,
    //         ip: req.ip,
    //         ips: req.ips,
    //         method: req.method,
    //         originalUrl: req.originalUrl,
    //         params: req.params,
    //         path: req.path,
    //         protocol: req.protocol,
    //         query: req.query,
    //         secure: req.secure,
    //         statusCode: req.statusCode ? req.statusCode : 0,
    //         statusMessage: req.statusMessage ? req.statusMessage : '',
    //         subdomains: req.subdomains,
    //         trailers: req.trailers,
    //         url: req.url,
    //         xhr: req.xhr,
    //     }
    //     const newResponse: IResponse = {
    //         connection: {
    //             remotePort: res.connection && res.connection.remotePort ? res.connection.remotePort + '' : '',
    //             remoteFamily: res.connection && res.connection.remoteFamily ? res.connection.remoteFamily : '',
    //             remoteAddress: res.connection && res.connection.remoteAddress ? res.connection.remoteAddress : '',
    //             localPort: res.connection && res.connection.localPort ? res.connection.localPort : 0,
    //             localAddress: res.connection && res.connection.localAddress,
    //             address: res.connection && res.connection.address() as AddressInfo,
    //         },
    //         finished: res.finished,
    //         headers: res.getHeaders(),
    //         headersSent: res.headersSent,
    //         locals: res.locals,
    //         shouldKeepAlive: res.shouldKeepAlive,
    //         upgrading: res.upgrading,
    //         statusCode: res.statusCode ? res.statusCode : 0,
    //         statusMessage: res.statusMessage ? res.statusMessage : '',
    //     }
    //     const requestC = new RequestC(
    //         // {
    //         // duration, typeOfRequest, statusOfRequest, message
    //         // }
    //         {
    //             req: newRequest,
    //             res: newResponse,
    //             duration: duration
    //         }
    //     );
    //     requestC.save();
    // });
    next();
};

function getResponseTimeToken(req: any, res: any, digits: number) {
    if (!req._startAt || !res._startAt) {
        // missing request and/or response start time
        return
    }

    // calculate diff
    var ms = (res._startAt[0] - req._startAt[0]) * 1e3 +
        (res._startAt[1] - req._startAt[1]) * 1e-6

    // return truncated value
    return ms.toFixed(digits === undefined ? 3 : digits)
}

function recordStartTime(this: any) {
    this._startAt = process.hrtime()
    this._startTime = new Date()
}
module.exports = {
    monitor
}