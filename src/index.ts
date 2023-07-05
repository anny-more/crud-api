import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';

import Users from './Users';

const app = express();
const PORT = process.env.PORT;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/users', (req, res) => {
  const json = Users.getAll();
  console.log('this', json);
  res.json(json);
});
app.post('/api/users', (req, res) => {
  try {
    Users.postUser({
      ...req.body,
      age: Number(req.body.age),
      hobbies: JSON.parse(req.body.hobbies),
    });
    res.json({message: `user ${req.body.username} added`});
  } catch (e) {
    res.status(401).send(e);
  }
});

app.all('/', (req, res) => {
  res.json({status: 'ok!'});
});

app.listen(PORT, () => console.log(`Server run on ${PORT} port`));
