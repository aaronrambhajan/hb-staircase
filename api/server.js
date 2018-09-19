import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import path from 'path';
import mongoose from 'mongoose';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import { config } from 'dotenv';
import Response from './models/response';

const app = express();
const router = express.Router();

// Set environment
config({ path: '../.env' });

// Configure DB, session data
mongoose.connect(process.env.DB_URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const MongoStore = connectMongo(session);
app.use(
  session({
    saveUninitialized: true,
    resave: true,
    secret: 'secret',
    store: new MongoStore({
      url: process.env.DB_URI,
      autoReconnect: true,
      collection: 'hb-sessions',
    }),
  })
);

// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.API_PORT || 5000;

// now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// serve static files from React App
app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/api/response', (req, res) => {
  const rpns = new Response();

  const { subject, sound, intensity, trial, isCorrect, rt } = req.body;

  rpns.subject = subject;
  rpns.sound = sound;
  rpns.intensity = intensity;
  rpns.trial = trial;
  rpns.isCorrect = isCorrect;
  rpns.rt = rt;

  rpns.save((err) => {
    return err
      ? res.json({ success: false, error: err })
      : res.json({ success: true });
  });
});

// The "catchall" handler: for any request that doesn't
// match the one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

/*
// Set route path & initialize API
router.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

// Router configuration when we call /api
app.use('/api', router);

// Route to save the trial
router.post('/response', (req, res) => {
  const rpns = new Response();

  const { subject, sound, intensity, trial, isCorrect, rt } = req.body;

  rpns.subject = subject;
  rpns.sound = sound;
  rpns.intensity = intensity;
  rpns.trial = trial;
  rpns.isCorrect = isCorrect;
  rpns.rt = rt;

  rpns.save((err) => {
    return err
      ? res.json({ success: false, error: err })
      : res.json({ success: true });
  });
});
*/

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
