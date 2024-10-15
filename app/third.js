import React from 'react';
import { View, Text, Button } from 'react-native';
import { Link } from 'expo-router';

export default function Third() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Third Screen</Text>
      <Link href="/" asChild>
        <Button title="Go to Home Screen" />
      </Link>
      <Link href="/HolePage" asChild>
        <Button title="Go to Second Screen" />
      </Link>
    </View>
  );
}