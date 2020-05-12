/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import axios from 'axios';

const app = express();
// To parse json in the body
app.use(express.json());

const baseRoute = '/query-service';
const router = express.Router();
const posts = {};

function handleEvent({ type, data } ) {
  if (type === 'PostCreated') {
    posts[data.id] = { ...data, comments: [] };
  } else if (type === 'CommentCreated') {
    const { postId, ...comment } = data;
    posts[postId].comments.push(comment);
  } else if (type === 'CommentUpdated') {
    const { postId, ...comment } = data;
    const comments = posts[postId].comments;
    const commentIndex = posts[postId].comments.findIndex(c => c.id === comment.id);
    comments[commentIndex] = comment;
  }
}

router.get('/posts', (req, res) => {
  res.send(posts);
});

router.post('/events', (req, res) => {
  console.log('event received!', req.body);
  handleEvent(req.body);
  return res.send();
});

app.use(baseRoute, router);

const port = process.env.port || 4002;
const server = app.listen(port, async () => {
  console.log(`Listening at http://localhost:${port}${baseRoute}`);

  const res = await axios.get('http://localhost:4005/events');

  // Replay all events on server startup
  for (const event of res.data) {
    console.log('processing event', event.type);
    handleEvent(event);
  }
});
server.on('error', console.error);
