import { Buffer } from 'buffer/';
import { NativeModules, NativeModulesStatic, Platform } from 'react-native';
import { base64 } from 'rfc4648';

declare module 'react-native' {
  interface NativeModulesStatic {
    FastCreateHash: {
      createHash(data64: string, algorithm: string): Promise<string>;
    };
  }
}

type Algorithm = 'sha256' | 'sha384' | 'sha512';

const LINKING_ERROR =
  `The package '@mfellner/react-native-fast-create-hash' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const FastCreateHash = NativeModules.FastCreateHash
  ? NativeModules.FastCreateHash
  : new Proxy({} as NativeModulesStatic['FastCreateHash'], {
      get() {
        throw new Error(LINKING_ERROR);
      },
    });

/**
 * @param data Raw data to hash.
 * @param algorithm Hashing algorithm to use.
 * @returns Promise of the hashed data.
 */
export async function createHash(data: Uint8Array, algorithm: Algorithm): Promise<Buffer> {
  const base64Data = await FastCreateHash.createHash(base64.stringify(data), algorithm);
  return base64.parse(base64Data, { out: Buffer }) as Buffer;
}
