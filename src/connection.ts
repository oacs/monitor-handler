import { connect } from 'mongoose';


export function connectDB(options?: any): any {
    const urlMongo = options.url || 'localhost';
    const portMongo = options.port || 27017;
    const dbMongo = options.db || 'admin';

    const userMongo = options.user || 'root';
    const passwordMongo = options.password || 'example';

    const uri: string = `mongodb://${userMongo}:${passwordMongo}@${urlMongo}:${portMongo}/${dbMongo}`;

    console.log(uri);

    connect(uri, { useNewUrlParser: true }, (err: any) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Succesfully Connected!");
        }
    });
}