/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import axios from 'axios';

const app = express();
// To parse json in the body
app.use(express.json());

const baseRoute = '/moderation-service';
const router = express.Router();

router.post('/events', async (req, res) => {
  const { type, data } = req.body;
  if (type === 'CommentCreated') {
    const status = data.content.toLowerCase().includes('orange') ?
    'rejected' :
    'approved';

    await axios.post('http://event-bus:4005/events', {
      type: 'CommentModerated',
      data: { ...data, status },
    });
  }
  return res.send();
});

app.use(baseRoute, router);

const port = process.env.port || 4003;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}${baseRoute}`);
});
server.on('error', console.error);
