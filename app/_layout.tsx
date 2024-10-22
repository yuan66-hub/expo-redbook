import { Slot,router } from 'expo-router';
import { useEffect } from 'react';
import { SessionProvider } from './ctx';

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  useEffect(() => {
    // This navigation event will trigger the error above.
    router.push('/(tabs)/home');
  }, []);
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}