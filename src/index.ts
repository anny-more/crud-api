import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import {isInfoNotvalid} from './isInfoNotValid';

import Users from './Users';

const app = express();
const PORT = process.env.PORT;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const ErrorHandler = (code: unknown) => {
  const messageTemp = {
    '400': 'response is invalid',
    '404': "user  doesn't exist",
  };
  if (code === '400' || code === '404') {
    const message: string = messageTemp[code];
    return {status: Number(code), message};
  } else {
    return {status: 500, message: 'Smth wrong'};
  }
};

app.get('/api/users', async (req, res) => {
  const json = await Users.getAll();
  console.log('this', json);
  res.json(json);
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await Users.getOne(req.params.id);
    console.log(user);
    res.json(user);
  } catch (e) {
    const err = ErrorHandler(e);
    res.status(err.status).send(err.message);
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const {username, age, hobbies} = req.body;
    const validData = await isInfoNotvalid(username, age, hobbies);
    await Users.postUser(validData as Object);
    res.json({message: `user ${req.body.username} added`});
  } catch (e) {
    console.error(e);
    const err = ErrorHandler(e);
    res.status(err.status).send(err.message);
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const {username, age, hobbies} = req.body;
    const validData = await isInfoNotvalid(username, age, hobbies);
    const response = await Users.updateUser(id, validData as Object);
    res.json(response);
  } catch (e) {
    console.error(e);
    const err = ErrorHandler(e);
    res.status(err.status).send(err.message);
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    await Users.deleteUser(req.params.id);
    res.json('user deleted');
  } catch (e) {
    console.error(e);
    const err = ErrorHandler(e);
    res.status(err.status).send(err.message);
  }
});

app.all('/', (req, res) => {
  res.json({status: 'ok!'});
});

app.listen(PORT, () => console.log(`Server run on ${PORT} port`));
