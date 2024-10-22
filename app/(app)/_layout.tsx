import { Stack,Redirect } from 'expo-router';
import { useBackHandler } from '@react-native-community/hooks';
import { useRouter } from 'expo-router';
import { ToastAndroid,Text } from 'react-native';
import { useState } from 'react';
import { useSession } from '../ctx';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const router = useRouter();
  const { session, isLoading } = useSession();
  const [canExit, setCanExit] = useState<boolean>(false);
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
  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
   
  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {

    
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href={'/'} />;
  }

 

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          presentation:'modal' // 独立路由系统之外的页面
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
