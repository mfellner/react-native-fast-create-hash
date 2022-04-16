import { Buffer } from 'buffer/';
import { createHash as mockCreateHash } from 'crypto';
import { createHash } from '.';

jest.mock('react-native', () => ({
  Platform: {
    select: () => '',
  },
  NativeModules: {
    FastCreateHash: {
      createHash: jest.fn(async (data64: string, algorithm: string): Promise<string> => {
        const inp = global.Buffer.from(data64, 'base64');
        return mockCreateHash(algorithm).update(inp).digest('base64');
      }),
    },
  },
}));

describe('createHash', () => {
  it('hashes data with sha256', async () => {
    const data = await createHash(Buffer.from('hello'), 'sha256');
    expect(data.toString('hex')).toEqual(
      '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
    );
  });
});
