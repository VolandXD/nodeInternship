const http = require('http');
require('dotenv').config()
const mogoose = require('mongoose');

const server = require('./server');
const events = require('./events');

const PORT = server.get('port');
const start = async () => {
    try {
        await mogoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
        })
        events.bind(http.createServer(server).listen(PORT));
    } catch (e) {
        console.log(e)
    }
}

start();
