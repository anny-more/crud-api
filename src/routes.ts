import {IncomingMessage, ServerResponse} from 'http';
import Users from './Users';
import {isInfoNotvalid} from './isInfoNotValid';

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
const getBody = async (req: IncomingMessage): Promise<string> => {
  return new Promise((resolve, reject) => {
    const body: string[] = [];
    req
      .on('error', err => {
        console.error(err);
        reject(err);
      })
      .on('data', chunk => {
        console.log(chunk.toString());
        body.push(chunk.toString());
      })
      .on('end', () => {
        resolve(body.join(''));
      });
  });
};

export const routes = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.url === undefined) {
    res.end('adress not found');
  }
  if (req.url !== undefined && req.url.startsWith('/api/users')) {
    const id = req.url.length > 10 ? req.url.replace('/api/users/', '') : '';
    const method = req.method;
    const body = await getBody(req);

    switch (method) {
      case 'GET':
        if (id) {
          getOneUser(id, res);
        } else {
          getAllUsers(res);
        }
        break;
      case 'POST':
        postOneUser(req, res, body);
        break;
      case 'PUT':
        putOneUser(id, res, body);
        break;
      case 'DELETE':
        deleteOneUser(id, res);
        break;
      default:
        res.end('adress not found');
    }
  } else {
    const err = ErrorHandler('500');
    res.writeHead(err.status).end(err.message);
  }
};

const getAllUsers = async (res: ServerResponse) => {
  const json = await Users.getAll();
  console.log('this', json);
  res.end(JSON.stringify(json));
};

const getOneUser = async (id: string, res: ServerResponse) => {
  try {
    const user = await Users.getOne(id);
    console.log(user);
    res.end(JSON.stringify(user));
  } catch (e) {
    const err = ErrorHandler(e);
    res.writeHead(err.status).end(err.message);
  }
};

const postOneUser = async (
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
    const err = ErrorHandler(e);
    res.writeHead(err.status).end(err.message);
  }
};

const putOneUser = async (id: string, res: ServerResponse, body: string) => {
  try {
    const {username, age, hobbies} = JSON.parse(body);
    const validData = await isInfoNotvalid(username, age, hobbies);
    const response = await Users.updateUser(id, validData as Object);
    res.end(response);
  } catch (e) {
    console.error(e);
    const err = ErrorHandler(e);
    res.writeHead(err.status).end(err.message);
  }
};

const deleteOneUser = async (id: string, res: ServerResponse) => {
  try {
    await Users.deleteUser(id);
    res.end('user deleted');
  } catch (e) {
    console.error(e);
    const err = ErrorHandler(e);
    res.writeHead(err.status).end(err.message);
  }
};
