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
  getAll = () => {
    console.log(this.users);
    return this.users;
  };
  postUser = (object: Object) => {
    UserSchema.parse(object);
    const id = uuidv4();
    console.log(id, 'id', object, 'object');
    const user = {id, ...object} as UserInfo;
    this.users.push(user);
  };
}

export default new Users();
