export interface IResponse {
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
    finished: boolean;
    headers: any;
    headersSent: boolean;
    locals: any;
    shouldKeepAlive: boolean;
    statusCode: number;
    statusMessage: string;
    upgrading: boolean;
}
