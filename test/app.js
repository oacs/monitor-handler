async function app() {
    const express = (require("express"));

    const cors = (require("cors"));

    const bodyParser = (require("body-parser"));

    const handler = require("../dist");

    const app = express();
    const port = process.env.PORT || '3000';

    app.use(cors());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    const monitor = await handler.monitor({
        url: 'localhost',
        port: 27017,
        db: 'local',

        user: 'root',
        password: 'example'
    });
    app.use(monitor);

    app.get('/', (req, res) => {
        res.send('hello world!');
    });

    app.post('/', (req, res) => {
        res.send('hello added to your world!');
    });
    app.put('/', (req, res) => {
        res.send('hello changed from your world!');
    });

    app.delete('/', (req, res) => {
        res.send('hello deleted from your world! :(');
    });

    app.listen(port, () => console.log(`listening on http://localhost:${port}`));
}
app();