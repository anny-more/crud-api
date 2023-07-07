import 'dotenv/config';
import http from 'node:http';
import {routes} from './routes';

const PORT = process.env.PORT;
http
  .createServer((req, res) => {
    routes(req, res);
  })
  .listen(PORT, () => console.log(`Server run on ${PORT} port`));
