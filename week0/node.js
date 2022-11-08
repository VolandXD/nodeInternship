/**
 * 1. call https://jsonplaceholder.typicode.com/users and write it to file users.json
 * todo: install module to call this API, and use node FS module
 */


/**
 * 2. Let's work with running node script with some environment variables
 * todo: Pass parameter ENV when you run this script. 
 * If param is PRODUCTION  get data from https://jsonplaceholder.typicode.com/todos and write it to file todos.json
 * If param is DEV get data from https://jsonplaceholder.typicode.com/albums and write if to file albums.json
 */
require('dotenv').config()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs = require('fs')
const conf = require('./config.js');
const mode = process.env.MODE || 'DEV';
const getResponse = async (mode) => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
        const responseMode = await fetch(`${conf.api[`${mode}`]}`);
        const data = await response.json();
        const dataMode = await responseMode.json();
        fs.writeFile('users.json', JSON.stringify(data), () => {});
        fs.writeFile(`${conf.filename[`${mode}`]}`, JSON.stringify(dataMode), () => {});
}
getResponse(mode);