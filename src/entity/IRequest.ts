
export interface IRequest {
    baseUrl: string;
    body: any;
    connection: {
        remotePort: string;
        remoteFamily: string;
        remoteAddress: string;
        localPort: number;
        localAddress: string;
        address: {
            address: string,
            family: string,
            port: number,
        }
    };
    cookies: any;
    headers: any;
    hostname: string;
    httpVersion: string;
    ip: string;
    ips: string[];
    method: string;
    originalUrl: string;
    params: any;
    path: string;
    protocol: string;
    query: any;
    secure: boolean;
    statusCode: number;
    statusMessage: string;
    subdomains: string[];
    trailers: any;
    url: string;
    xhr: boolean;
}
