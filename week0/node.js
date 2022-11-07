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

const mode = process.env.MODE || 'DEV';
const getResponse = async (mode) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const responseMode = mode === 'DEV' ? await fetch(`https://jsonplaceholder.typicode.com/albums`) : await fetch(`https://jsonplaceholder.typicode.com/todos`);
    const data = await response.json();
    const dataMode = await responseMode.json();
    const fs = require('fs')
    fs.writeFileSync('users.json', JSON.stringify(data));
    fs.writeFileSync(mode === 'DEV' ? 'albums.json' : 'todos.json', JSON.stringify(dataMode));
}
getResponse(mode);