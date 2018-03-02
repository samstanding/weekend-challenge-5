const express = require('express');
const app = express();

app.use(express.static('server/public'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//COMMENTING OUT DB STUFF-- WILL WAIT TO USE UNTIL I START USING DB
// const mongoose = require('mongoose');
// const databaseUrl = 'mongodb://localhost:27017/games';

// mongoose.connection.on('connected', function () {
//     console.log('mongoose connected to: ', databaseUrl);
// })

// mongoose.connection.on('error', function (error) {
//     console.log('mongoose connection error: ', error);
// })

// mongoose.connect(databaseUrl);

// const swRouter = require('./routers/sw-router');
// app.use('/sw', swRouter);

const port = process.env.PORT || 5000;

app.listen(port, function () {
    console.log('listening on port: ', port);
})