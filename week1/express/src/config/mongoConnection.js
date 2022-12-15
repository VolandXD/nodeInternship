const mongoose = require('mongoose');

const connection = (server, options) => mongoose.connect(server, options)
    .catch((err) => { console.log(err.reason); });

module.exports = {
    connection,
};
/* ToDO question for lessons */
/*
async function dataBaseConnection(server, options) {
    const connection = await mongoose.createConnection(server, options);

    connection.on('connecting', () => {
        console.log('\x1b[32m', 'MongoDB :: connecting');
    });
    connection.on('error', (error) => {
        console.log('\x1b[31m', `MongoDB :: connection ${error}`);
    });
    connection.on('connected', () => {
        console.log('\x1b[32m', 'MongoDB :: connected');
    });
    connection.on('open', () => {
        console.log('\x1b[32m', 'MongoDB :: connection opened');
    });
    connection.on('reconnected', () => {
        console.log('\x1b[33m', 'MongoDB :: reconnected');
    });
    connection.on('reconnectFailed', () => {
        console.log('\x1b[31m', 'MongoDB :: reconnectFailed');
    });
    connection.on('disconnected', () => {
        console.log('\x1b[31m', 'MongoDB :: disconnected');
    });
    connection.on('fullsetup', () => {
        console.log('\x1b[33m', 'MongoDB :: reconnecting... %d');
    });
}
module.exports = {
    dataBaseConnection,
}; */
