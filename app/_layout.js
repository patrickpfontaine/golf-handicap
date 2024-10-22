import { Stack } from 'expo-router';
import { GameProvider } from './context/GameContext';

export default function Layout() {
  return (
    <GameProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="HolePage" options={{ title: 'Hole Page' }} />
        <Stack.Screen name="FinishPage" options={{ title: 'Finish Page' }} />
      </Stack>
    </GameProvider>
  );
}