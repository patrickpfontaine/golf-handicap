import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GameProvider } from './context/GameContext';
import HomeScreen from './HomeScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <GameProvider>
        <HomeScreen />
      </GameProvider>
    </SafeAreaProvider>
  );
}
