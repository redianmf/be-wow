require('dotenv').config();
const express = require('express');

//Import routes
const router = require('./src/routes');

const app = express();
const port = 5000;

app.use(express.json());

// Router group
app.use('/api/v1/', router);

// Set public folder
app.use('/uploads', express.static('uploads'));

app.listen(port, () => console.log(`Listening on port ${port}!`));
