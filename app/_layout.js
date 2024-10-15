import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="HolePage" options={{ title: 'Hole Page' }} />
      <Stack.Screen name="third" options={{ title: 'Third Screen' }} />
    </Stack>
  );
}