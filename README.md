# Hello, reviewer! I`m working on solution now! Сould you check the assignment later, please!

# crud-api
## Description
crud-api - simple CRUD API using in-memory database underneath, without any frameworks.

Technical requirements:
Task implemented on Typescript
Only nodemon, dotenv, cross-env, typescript, ts-node, ts-node-dev, eslint and its plugins, webpack-cli, webpack and its plugins, prettier, uuid, @types/* as well as libraries used for testing are allowed
Use 18 LTS version of Node.js
Prefer asynchronous API whenever possible

## How to install
1. Clone this repository
2. Switch branch on 'crud-api'
3. run npm install

## How to use

Implemented endpoints: api/users

GET api/users - to get all users

GET api/users/${userId} - to get user by id (render on server side)

POST api/users - to create record about new user and store it in database, use JSON like this
```js

username — user's name (string, required)
age — user's age (number, required)
hobbies — user's hobbies (array of strings or empty array, required)

```
* example (POST, body, raw - in POSTMAN)
```js

{
    "username": "sam",
    "age": "44",
    "hobbies": ["games", "chess"]
}

```
* Data should be valid, fields - relevant and not empty

PUT api/users/${userId} - to update existing user (all fields required)

DELETE api/users/${userId} - to delete existing user from database
