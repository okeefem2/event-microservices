import * as express from 'express';
import { randomBytes } from 'crypto';
import axios from 'axios';

const app = express();

// To parse json in the body
app.use(express.json());

const posts = {};
const baseRoute = '/posts-service';
const router = express.Router();

router.get('/', (req, res) => {
  res.send(posts);
});

router.post('/', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  const post = { id, title }
  posts[id] = post;
  // With docker compose/nginx or kubernetes as long as clusterip service is
  // names event-bus
  await axios.post('http://event-bus:4005/events', { // ' with just /events I get a connection refused on port 80....
    type: 'PostCreated',
    data: post,
  });
  return res.status(201).send(posts[id]);
});

router.post('http://event-bus:4005/events', async (req, res) => {
  console.log('received event', req.body);

  return res.send();
});

app.use(baseRoute, router);


const port = process.env.port || 4000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}${baseRoute}`);
});
server.on('error', console.error);
