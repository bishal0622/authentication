const env = require('dotenv').config({path: './.env'}).parsed;
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');
const errorcreate = require('http-errors');

var userRouter = require('./routes/user.route');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(morgan('dev'));


// Set up mongoose connection
mongoose.connect(env.MONGODB_URI);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//routes
app.use('/api/user', userRouter);

app.listen(env.PORT, () => {
    console.log('Server is up and running on port number ' + env.PORT);
});
