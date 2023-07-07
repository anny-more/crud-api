import {IncomingMessage, ServerResponse} from 'http';
import {apiError} from './helpers/apiError';
import {getBody} from './helpers/getBodyFromReq';
import Response from './response/Response';

export const routes = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.url === undefined) {
    res.end('adress not found');
  }
  console.log(req.url);
  if (req.url !== undefined && req.url.startsWith('/api/users')) {
    const id = req.url.length > 10 ? req.url.replace('/api/users/', '') : '';
    const method = req.method;
    const body = await getBody(req);

    switch (method) {
      case 'GET':
        if (id) {
          Response.getOneUser(id, res);
        } else {
          Response.getAllUsers(res);
        }
        break;
      case 'POST':
        Response.postOneUser(req, res, body);
        break;
      case 'PUT':
        Response.putOneUser(id, res, body);
        break;
      case 'DELETE':
        Response.deleteOneUser(id, res);
        break;
      default:
        res.end('adress not found');
        break;
    }
  } else {
    const err = apiError('500');
    res.writeHead(err.status).end(err.message);
  }
};
