export const isInfoNotvalid = (
  username: string,
  age: number,
  hobbies: string[]
) => {
  return new Promise((resolve, reject) => {
    try {
      if (!age) {
        reject('401');
      }
      if (age < 1) {
        reject('401');
      }
      resolve({username, age: age, hobbies});
    } catch {
      reject('401');
    }
  });
};
