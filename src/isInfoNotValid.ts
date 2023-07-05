export const isInfoNotvalid = (
  username: string,
  age: string,
  hobbies: string
) => {
  return new Promise((resolve, reject) => {
    try {
      const userAge = Number(age);
      const userHobbies = hobbies.split(', ') || [];
      if (username.length < 1 && username.trim()) {
        reject('401');
      }
      if (userAge < 1) {
        reject('401');
      }
      resolve({username, age: userAge, hobbies: userHobbies});
    } catch {
      reject('401');
    }
  });
};
