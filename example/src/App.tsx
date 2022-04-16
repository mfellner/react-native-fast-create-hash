import { createHash, multiply } from '@mfellner/react-native-fast-create-hash';
import { Buffer } from 'buffer';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [result, setResult] = useState<number | undefined>();
  const [hash, setHash] = useState<string | Error | undefined>();

  useEffect(() => {
    multiply(3, 7).then(setResult);

    createHash(Buffer.from('hello', 'utf8'))
      .then((data) => {
        // @ts-expect-error
        const hash = data.toString('hex');
        console.log('hash:', hash);
        setHash(hash);
      })
      .catch(setHash);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>

      {hash instanceof Error ? (
        <Text>
          Error: {hash.name} {hash.message}
        </Text>
      ) : (
        <Text>Hash: {hash}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
