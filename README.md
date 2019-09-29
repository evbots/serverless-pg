# serverless-pg

A PostgreSQL client for serverless applications.

## About

This module is intended for use in node.js serverless applications. It supports node v6 and above.

## Installation

`npm install serverless-pg`

## How to use

First, setup your client in a dedicated module:
```
// client.js

import DbClient from 'serverless-pg';

const dbClient = new DbClient({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ...otherConfiguration,
});

export default dbClient;
```


Then, import anywhere in your application and use.

```
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
