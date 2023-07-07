import {IncomingMessage} from 'http';

export const getBody = async (req: IncomingMessage): Promise<string> => {
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
