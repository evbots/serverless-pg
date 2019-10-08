# serverless-pg

A PostgreSQL client for Node.js serverless applications.

**Note: This library is currently alpha and subject to breaking changes. Please install this dependency using an exact version.**

## About

This module is intended for use in node.js serverless applications. It supports node v8 and above. It is simply some boilerplate around the fantastic `pg` library for serverless apps.

## Installation

`npm install serverless-pg --save-exact`

## How to use

First, setup your client in a dedicated module:
```javascript
// client.js

import createClient from 'serverless-pg';

const dbClient = createClient({
  config: {
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.NAME,
  },
  onConnect: () => {},
  onClose: () => {},
  beforeQuery: () => {},
  afterQuery: () => {},
});

export default dbClient;
```


Then, import anywhere in your application and use.

```javascript
// handler.js

import dbClient from './client';

const handler = async () => {
  // calling query automagically connects to the database
  await dbClient.query('SELECT * FROM users');
  await dbClient.transaction([
    () => dbClient.query(''),
    () => dbClient.query('')
  ]);
  await dbClient.end();
};
```
