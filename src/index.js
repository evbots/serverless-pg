import { Client } from 'pg';

/**
 * A function to create a wrapped client instance.
 *
 * @param {object} params - client parameters
 * @returns {object} wrapped client instance
 */
const createClient = ({
  config,
  onConnect = () => {},
  onClose = () => {},
  beforeQuery = () => {},
  afterQuery = () => {}
}) => {
  let connectedPromise;
  let client;

  /**
   * A function to return the pg client instance.
   *
   * @returns {Client} pg client instance
   */
  const getClient = () => client;

  /**
   * A function to connect to the database.
   *
   * @returns {undefined} returns after the connection is attempted
   */
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

  /**
   * A function to create a wrapped client instance.
   *
   * @param {...*} queryParams - query parameters
   * @returns {Promise} resolved query response
   */
  const query = async (...queryParams) => {
    await connect();
    const beforeResult = beforeQuery(...queryParams);
    const queryResponse = await client.query(...queryParams);
    afterQuery(queryResponse, beforeResult);
    return queryResponse;
  };

  /**
   * A function to end the connection to the database.
   *
   * @returns {undefined} returns after the connection is closed
   */
  const end = async () => {
    if (client !== undefined) {
      await client.end();
      client = undefined;
      connectedPromise = undefined;
      onClose();
    }
  };

  /**
   * A function to complete a transaction.
   *
   * @param {Array} collection - a collection of queries
   * @returns {undefined} resolved after transaction completes
   */
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
