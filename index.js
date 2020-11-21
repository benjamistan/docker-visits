const express = require('express');
const redis = require('redis');
const process = require('process');

const app = express();
const client = redis.createClient({
    host: 'redis-server',                // Provided in docker container via the service name in docker-compose.yml
    port: 6379
});
client.set('visits', 0);

app.get('/', (req, res) => {
    process.exit(0);
    client.get('visits', (err, visits) => {
        res.send('Number of visits is ' + visits);
        client.set('visits', parseInt(visits) + 1);
        console.log('Another visit recorded.');
    });
});

app.listen(8081, () => {
    console.log('Listening on port 8081');
});