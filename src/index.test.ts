import { Buffer } from 'buffer/';
import { createHash } from '.';

describe('createHash', () => {
  it('throws an error if the native module is not initialised', async () => {
    jest.unmock('react-native');
    await expect(createHash(Buffer.from('hello'), 'sha256')).rejects.toThrow(
      /doesn't seem to be linked/,
    );
  });
});
