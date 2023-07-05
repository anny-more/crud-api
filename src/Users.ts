import {z} from 'zod';
import {v4 as uuidv4} from 'uuid';

interface UserInfo {
  id: string;
  username: string;
  age: number;
  hobbies: String[];
}
const UserSchema = z.object({
  username: z.string().nonempty(),
  age: z.number().min(1),
  hobbies: z.array(z.string()),
});

interface Users {
  users: UserInfo[];
}
class Users {
  constructor() {
    this.users = [];
  }
  getAll = async () => {
    return new Promise((resolve, reject) => {
      resolve(this.users);
    });
  };
  getOne = async (id: string) => {
    return new Promise((resolve, reject) => {
      if (id.length < 36) {
        reject('400');
      }
      const user = this.users.find(user => user.id === id);
      if (user) {
        resolve(user);
      } else {
        reject('404');
      }
    });
  };
  postUser = async (object: Object) => {
    return new Promise((resolve, reject) => {
      try {
        UserSchema.parse(object);
        const id = uuidv4();
        const user = {id, ...object} as UserInfo;
        this.users.push(user);
        resolve(`${user.username} added`);
      } catch {
        reject('400');
      }
    });
  };
  updateUser = async (id: string, object: Object) => {
    return new Promise((resolve, reject) => {
      try {
        if (id.length < 36) reject('404');
        UserSchema.parse(object);
        const item = this.users.findIndex(user => user.id === id);
        if (item === -1) reject('404');
        this.users[item] = {...this.users[item], ...object} as UserInfo;
        resolve(`info about ${this.users[item].username} updated`);
      } catch {
        reject('404');
      }
    });
  };
  deleteUser = (id: string) => {
    return new Promise((resolve, reject) => {
      const user = this.users.find(user => user.id === id);
      if (user) {
        this.users = this.users.filter(user => user.id !== id);
        resolve('ok');
      } else {
        reject('404');
      }
    });
  };
}

export default new Users();
