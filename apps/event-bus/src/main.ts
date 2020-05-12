/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import axios from 'axios';
const app = express();
app.use(express.json());


const events = [];
const baseRoute = '/events';
const router = express.Router();

router.get('/', (req, res) => {
  res.send(events);
});

router.post('/', (req, res) => {
  const event = req.body;
  events.push(event);
  console.log(events);
  axios.post('http://localhost:4000/posts-service/events', event);
  axios.post('http://localhost:4001/comments-service/events', event);
  axios.post('http://localhost:4002/query-service/events', event);
  axios.post('http://localhost:4003/moderation-service/events', event);
  res.status(201).send();
});

app.use(baseRoute, router);

const port = process.env.port || 4005;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/events`);
});

server.on('error', console.error);
