import { createHash } from '@mfellner/react-native-fast-create-hash';
import { Buffer } from 'buffer/';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [state, setState] = useState<string | Error | undefined>();

  useEffect(() => {
    createHash(Buffer.from('hello', 'utf8'), 'sha256')
      .then((data) => {
        const hash = data.toString('hex');
        console.log('hash:', hash);
        setState(hash);
      })
      .catch(setState);
  }, []);

  return (
    <View style={styles.container}>
      {state instanceof Error ? (
        <Text>
          Error: {state.name} {state.message}
        </Text>
      ) : (
        <Text>Hash: {state}</Text>
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
