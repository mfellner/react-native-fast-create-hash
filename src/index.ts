import { Buffer } from 'buffer';
import { NativeModules, NativeModulesStatic, Platform } from 'react-native';
import { base64 } from 'rfc4648';

declare module 'react-native' {
  interface NativeModulesStatic {
    FastCreateHash: {
      multiply(a: number, b: number): Promise<number>;
      createHash(data64: string, algorithm: string): Promise<string>;
    };
  }
}

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

export function multiply(a: number, b: number): Promise<number> {
  return FastCreateHash.multiply(a, b);
}

export async function createHash(data: Uint8Array): Promise<Uint8Array> {
  const base64Data = await FastCreateHash.createHash(base64.stringify(data), 'sha256');
  return base64.parse(base64Data, { out: Buffer });
}
