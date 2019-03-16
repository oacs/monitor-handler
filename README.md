# Monitor-Handler

[![Build Status](https://travis-ci.org/oacs/monitor-handler.svg?branch=master)](https://travis-ci.org/oacs/monitor-handler)

It's an middleware that can take the time of a request on Express and save it in a mongo database with another information about the success or error on the request
## Installation

Npm:

    npm install -s monitor-hanlder

Example of use on express

    const monitor = await handler.monitor({
        db: {
            url: 'localhost',
            port: 27017,
            db: 'local',

            user: 'root',
            password: 'example'
        }
    });
    app.use(monitor);

Touples of the mongodb example:

    {
        "_id": "5c8d71b30f9e854388a8108a",
        "req": {
            "baseUrl": "",
            "body": {
                "hello": "world"
            },
            "connection": {
                "remotePort": "61740",
                "remoteFamily": "IPv6",
                "remoteAddress": "::1",
                "localPort": 3000,
                "localAddress": "::1",
                "address": {
                    "address": "::1",
                    "family": "IPv6",
                    "port": 3000
                }
            },
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache",
                "postman-token": "7be8038e-4759-4249-8bed-af07ed038930",
                "user-agent": "PostmanRuntime/7.6.0",
                "accept": "*/*",
                "host": "localhost:3000",
                "accept-encoding": "gzip, deflate",
                "content-length": "11",
                "connection": "keep-alive"
            },
            "hostname": "localhost",
            "httpVersion": "1.1",
            "ip": "::1",
            "ips": [],
            "method": "PUT",
            "originalUrl": "/",
            "path": "/",
            "protocol": "http",
            "secure": false,
            "statusCode": 0,
            "statusMessage": "",
            "subdomains": [],
            "url": "/",
            "xhr": false
        },
        "res": {
            "connection": {
                "remotePort": "",
                "remoteFamily": "",
                "remoteAddress": "",
                "localPort": 0,
                "localAddress": null,
                "address": null
            },
            "finished": true,
            "headers": {
                "x-powered-by": "Express",
                "access-control-allow-origin": "*",
                "content-type": "text/html; charset=utf-8",
                "content-length": "30",
                "etag": "W/\"1e-occ1cqCg7J67tDxCU1797QB4HbE\""
            },
            "headersSent": true,
            "shouldKeepAlive": true,
            "statusCode": 200,
            "statusMessage": "OK"
        },
        "duration": 13.42,
        "createdAt": "2019-03-16T21:59:15.534Z",
        "__v": 0
    }
