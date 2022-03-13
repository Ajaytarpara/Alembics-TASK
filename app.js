const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const { authLimiter } = require('./middleware/rateLimiter');
dotenv.config({ path: '.env' });
global.__basedir = __dirname;
require('./config/db.js');
const passport = require('passport');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const { clientPassportStrategy } = require('./config/clientPassportStrategy');
const app = express();

const corsOptions = { origin: process.env.ALLOW_ORIGIN, };
app.use(cors(corsOptions));

app.use(require('./utils/responseHandler'));

//all routes 
const routes = require('./routes/index');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(routes);

// set security HTTP headers
app.use(helmet());

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

clientPassportStrategy(passport);

app.use('/', authLimiter);

app.get('/', (_req, res) => {
	res.status(200).send('Successfully Connected');
});

app.listen(process.env.PORT, () => {
	console.log(`your application is running on ${process.env.PORT}`);
});
