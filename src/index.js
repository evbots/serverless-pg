import Promise from 'bluebird';
import { Client } from 'pg';

class DbClient {
  constructor(clientParams) {
    this._clientParams = clientParams;
    this._client = null;
  }

  dbConnect() {
    this._client = new Promise((resolve) => {
      const client = new Client(this._clientParams);

      return client.connect().then(() => {
        resolve(client);
      });
    });
    return this._client;
  }

  async query(text, params) {
    const start = Date.now();

    if (!this._client) {
      await this.dbConnect();
    }

    const resolvedClient = await this._client;
    return resolvedClient
      .query(text, params)
      .then((queryResponse) => {
        const duration = Date.now() - start;
        console.log('executed query', {
          text,
          duration,
          rowCount: queryResponse.rowCount,
        });
        return queryResponse;
      })
      .catch((error) => {
        console.error('attempted query', text);
        return Promise.reject(error);
      });
  }

  async end() {
    if (this._client) {
      const resolvedClient = await this._client;
      await resolvedClient.end();
      this._client = null;
      return Promise.resolve();
    }
    return Promise.resolve();
  }

  async transaction(collection) {
    try {
      await this.query('BEGIN');
      await Promise.mapSeries(collection, delayedQuery => delayedQuery());
      return await this.query('END');
    } catch (error) {
      await this.query('ROLLBACK');
      return Promise.reject(error);
    }
  }
}

export default DbClient;
