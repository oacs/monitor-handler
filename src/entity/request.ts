import { connect, Schema, model } from 'mongoose';
import { Request, Response } from 'express';
import { IncomingHttpHeaders } from 'http';

const urlMongo = process.env.url || 'localhost';
const portMongo = process.env.port || 27017;
const dbMongo = process.env.db || 'local';

const uri: string = `mongodb://${urlMongo}:${portMongo}/${dbMongo}`;

connect(uri, (err: any) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Succesfully Connected!")
    }
});

// const req: Request = {} as Request;
// req.baseUrl;
// req.body;
// req.connection.remotePort
// req.connection.remoteFamily
// req.connection.remoteAddress
// req.connection.localPort
// req.connection.localAddress
// req.connection.address
// req.cookies
// req.eventNames
// req.headers
// req.hostname
// req.httpVersion
// req.ip
// req.ips
// req.method
// req.originalUrl
// req.params
// req.path
// req.protocol
// req.query
// req.secure
// req.statusCode
// req.statusMessage
// req.subdomains
// req.trailers
// req.url
// req.xhr
const r: Response = {} as Response;

export const RequestSchema = new Schema({
    req: {
        type: {
            typeOfRequest: { type: String, required: false },
            duration: { type: String, required: false },
            statusOfRequest: { type: Number, required: false },
            message: { type: String, required: false },
            baseUrl: { type: String, required: false },
            body: { type: Object, required: false },
            connection: {
                type: {
                    remotePort: { type: Number, required: false },
                    remoteFamily: { type: String, required: false },
                    remoteAddress: { type: String, required: false },
                    localPort: { type: Number, required: false },
                    localAddress: { type: String, required: false },
                    address: {
                        type: {
                            address: { type: String },
                            family: { type: String },
                            port: { type: Number },
                        }
                        , required: false
                    },
                }, required: false
            },

            cookies: { type: Object, required: false },
            eventNames: { type: [String], required: false },
            headers: { type: Object, required: false },
            hostname: { type: String, required: false },
            httpVersion: { type: String, required: false },
            ip: { type: String, required: false },
            ips: { type: [String], required: false },
            method: { type: String, required: false },
            originalUrl: { type: String, required: false },
            params: { type: Object, required: false },
            path: { type: String, required: false },
            protocol: { type: String, required: false },
            query: { type: Object, required: false },
            secure: { type: Boolean, required: false },
            statusCode: { type: Number, required: false },
            statusMessage: { type: String, required: false },
            subdomains: { type: [String], required: false },
            trailers: { type: Object, required: false },
            url: { type: String, required: false },
            xhr: { type: Boolean, required: false }
        }
    },
    res: {
        type: {
            connection: {
                type: {
                    remotePort: { type: Number, required: false },
                    remoteFamily: { type: String, required: false },
                    remoteAddress: { type: String, required: false },
                    localPort: { type: Number, required: false },
                    localAddress: { type: String, required: false },
                    address: {
                        type: {
                            address: { type: String },
                            family: { type: String },
                            port: { type: Number },
                        }
                        , required: false
                    },
                }, required: false
            },
            finished: { type: Boolean, required: false },
            headers: { type: Object, required: false },
            headersSent: { type: Boolean, required: false },
            locals: { type: Object, required: false },
            shouldKeepAlive: { type: Boolean, required: false },
            statusCode: { type: Number, required: false },
            statusMessage: { type: String, required: false },
            upgrading: { type: Boolean, required: false },
        }
    },
    duration: { type: Number }

});

const Request = model('request', RequestSchema);
export default Request;