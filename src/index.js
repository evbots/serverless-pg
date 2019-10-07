import { Client } from 'pg';

const createClient = ({
  config,
  onConnect = () => {},
  onClose = () => {},
  beforeQuery = () => {},
  afterQuery = () => {}
}) => {
  let connectedPromise;
  let client;

  const getClient = () => client;

  const connect = async () => {
    if (client === undefined) {
      if (connectedPromise === undefined) {
        const pgClient = new Client(config);
        connectedPromise = pgClient
          .connect()
          .then(() => onConnect())
          .then(() => {
            client = pgClient;
          });
      }
      await connectedPromise;
    }
  };

  const query = async (...queryParams) => {
    await connect();
    const beforeResult = beforeQuery(...queryParams);
    const queryResponse = await client.query(...queryParams);
    afterQuery(queryResponse, beforeResult);
    return queryResponse;
  };

  const end = async () => {
    if (client !== undefined) {
      await client.end();
      client = undefined;
      connectedPromise = undefined;
      onClose();
    }
  };

  const transaction = async collection => {
    await connect();
    try {
      await client.query('BEGIN');
      await collection.reduce(
        (promiseChain, delayedQuery) => promiseChain.then(() => delayedQuery()),
        Promise.resolve()
      );
      await client.query('END');
      return undefined;
    } catch (error) {
      await client.query('ROLLBACK');
      return Promise.reject(error);
    }
  };

  return {
    getClient,
    connect,
    query,
    end,
    transaction
  };
};

export default createClient;
