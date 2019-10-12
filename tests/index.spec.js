import createClient from '../src/index';

jest.mock('pg', () => {
  function Client() {
    return {
      connect: async () => {},
      query: async () => {}
    };
  }
  return {
    Client
  };
});

test('getClient returns undefined if not connected', () => {
  const client = createClient({});
  expect(client.getClient()).toEqual(undefined);
});

test('connect calls onConnect and creates client', async () => {
  const onConnect = jest.fn();
  const client = createClient({ onConnect });
  await client.connect();
  expect(onConnect).toHaveBeenCalledTimes(1);
  expect(typeof client.getClient()).toEqual('object');
});

test('query calls onConnect and creates client', async () => {
  const onConnect = jest.fn();
  const client = createClient({ onConnect });
  await client.query();
  expect(onConnect).toHaveBeenCalledTimes(1);
  expect(typeof client.getClient()).toEqual('object');
});
