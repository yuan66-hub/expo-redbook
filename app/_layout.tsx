import { Stack } from 'expo-router';
import { useBackHandler } from '@react-native-community/hooks';
import { useRouter } from 'expo-router';
import { ToastAndroid } from 'react-native';
import { useState } from 'react';
export default function RootLayout() {
  const [canExit, setCanExit] = useState<boolean>(false);
  const router = useRouter();
  useBackHandler(() => {
    if (router.canGoBack()) {
      router.back();
    } else if (canExit) {
      setCanExit(false);
      // 退出应用
      return false;
    } else {
      setCanExit(true);
      ToastAndroid.show('再退出一次', ToastAndroid.LONG);
    }
    return true;
  });
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="searchGoods"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="articleDetail"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
