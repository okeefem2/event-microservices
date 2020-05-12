/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import { randomBytes } from 'crypto';
import axios from 'axios';

const app = express();

// To parse json in the body
app.use(express.json());

const commentsByPostId = {};
const baseRoute = '/comments-service';
const router = express.Router();

router.post('/posts/:postId/comments', async (req, res) => {
  const postId = req.params.postId;
  const id = randomBytes(4).toString('hex');
  const { content } = req.body;
  const comment = { id, content, status: 'pending' };
  const comments = commentsByPostId[postId] || [];
  comments.push(comment)

  commentsByPostId[postId] = comments;
  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: { ...comment, postId },
  });
  return res.status(201).send(comments);
});

router.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

router.post('/events', async (req, res) => {
  console.log('received event', req.body);
  const { type, data } = req.body;
  if (type === 'CommentModerated') {
    const comments = commentsByPostId[data.postId];
    const comment = comments.find(c => data.id === c.id);
    comment.status = data.status;
    await axios.post('http://localhost:4005/events', {
    type: 'CommentUpdated',
    data: { ...comment, postId: data.postId },
  });
  }
  return res.send();
});

app.use(baseRoute, router);
const port = process.env.port || 4001;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}${baseRoute}`);
});
server.on('error', console.error);
