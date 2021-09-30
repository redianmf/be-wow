const express = require('express');

//Import routes
const router = require('./src/routes');

const app = express();
const port = 5000;

app.use(express.json());

//Create endpoint grouping and router here
app.use('/api/v1/', router);

app.listen(port, () => console.log(`Listening on port ${port}!`));
