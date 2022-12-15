const http = require('http');

require('dotenv').config();
const mongoConnection = require('../config/mongoConnection');
const server = require('./server');
const events = require('./events');

const PORT = server.get('port');
const start = async () => {
    try {
        await mongoConnection.connection(process.env.DB_URL, {
            useNewUrlParser: true,
        });
        /* ToDo question for lessons */
        /* await mongoConnection.dataBaseConnection(process.env.DB_URL, {
            useNewUrlParser: true,
        }); */
        events.bind(http.createServer(server).listen(PORT));
    } catch (e) {
        console.log(e);
    }
};

start();
