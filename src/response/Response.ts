import {ServerResponse, IncomingMessage} from 'http';
import Users from '../User/Users';
import {apiError} from '../helpers/apiError';
import {isInfoNotvalid} from '../helpers/isInfoNotValid';

class Response {
  getAllUsers = async (res: ServerResponse) => {
    const json = await Users.getAll();
    console.log('this', json);
    res.end(JSON.stringify(json));
  };
  getOneUser = async (id: string, res: ServerResponse) => {
    try {
      const user = await Users.getOne(id);
      console.log(user);
      res.end(JSON.stringify(user));
    } catch (e) {
      const err = apiError(e);
      res.writeHead(err.status).end(err.message);
    }
  };

  postOneUser = async (
    req: IncomingMessage,
    res: ServerResponse,
    body: string
  ) => {
    try {
      const {username, age, hobbies} = JSON.parse(body);
      const validData = await isInfoNotvalid(username, age, hobbies);
      await Users.postUser(validData as Object);
      res.end(`user ${username} added`);
    } catch (e) {
      console.error(e);
      const err = apiError(e);
      res.writeHead(err.status).end(err.message);
    }
  };

  putOneUser = async (id: string, res: ServerResponse, body: string) => {
    try {
      const {username, age, hobbies} = JSON.parse(body);
      const validData = await isInfoNotvalid(username, age, hobbies);
      const response = await Users.updateUser(id, validData as Object);
      res.end(response);
    } catch (e) {
      console.error(e);
      const err = apiError(e);
      res.writeHead(err.status).end(err.message);
    }
  };

  deleteOneUser = async (id: string, res: ServerResponse) => {
    try {
      await Users.deleteUser(id);
      res.end('user deleted');
    } catch (e) {
      console.error(e);
      const err = apiError(e);
      res.writeHead(err.status).end(err.message);
    }
  };
}

export default new Response();
