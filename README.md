# react-native-fast-create-hash

[![Build Status](https://img.shields.io/github/workflow/status/mfellner/react-native-fast-create-hash/test?style=flat&colorA=000000&colorB=000000)](https://github.com/mfellner/react-native-fast-create-hash/actions?query=workflow%3Atest)
[![Codecov](https://img.shields.io/codecov/c/github/mfellner/react-native-fast-create-hash?colorA=000000&colorB=000000)](https://app.codecov.io/gh/mfellner/react-native-fast-create-hash)
[![Version](https://img.shields.io/npm/v/@mfellner/react-native-fast-create-hash?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/@mfellner/react-native-fast-create-hash)
[![Downloads](https://img.shields.io/npm/dt/@mfellner/react-native-fast-create-hash.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/@mfellner/react-native-fast-create-hash)

Fast, native createHash implementation for React Native.

- Uses [CryptoKit](https://developer.apple.com/documentation/cryptokit) on iOS and requires a target of >= 13.0.
- Uses [MessageDigest](https://developer.android.com/reference/java/security/MessageDigest) on Android.
- Supports SHA-256, SHA-384, and SHA-512.
- Input and output data are instances of Unit8Array or [Buffer](https://www.npmjs.com/package/buffer).
- Inspired by [react-native-fast-crypto](https://github.com/EdgeApp/react-native-fast-crypto).

## Installation

```sh
yarn add @mfellner/react-native-fast-create-hash
```

In your `ios/Podfile`, set the target to iOS 13:

```ruby
platform :ios, '13.0'
```

## Usage

```ts
import { createHash } from '@mfellner/react-native-fast-create-hash';
import { Buffer } from 'buffer';

const buffer: Buffer = await createHash(Buffer.from('hello'), 'sha256');
```

### `createHash(data: Uint8Array, algorithm: Algorithm): Promise<Buffer>`

- `data` – Raw input bytes to be hashed.
- `algorithm` – Name of a supported SHA algorithm.
- Returns: Raw bytes of the hash digest.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.
