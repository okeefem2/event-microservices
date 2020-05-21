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
  // This works for docker compose with nginx, but k8s requires different names for clusterIP vs nodeport...
  // axios.post('http://posts-service:4000/posts-service/events', event);
  axios.post('http://posts-service-internal:4000/posts-service/events', event);
  axios.post('http://comments-service:4001/comments-service/events', event);
  axios.post('http://query-service:4002/query-service/events', event);
  axios.post('http://moderation-service:4003/moderation-service/events', event);
  res.status(201).send();
});

app.use(baseRoute, router);

const port = process.env.port || 4005;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/events`);
});

server.on('error', console.error);
