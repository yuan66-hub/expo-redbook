import { useStorageState } from '@/hooks/useStorageState';
import { useContext, createContext, type PropsWithChildren } from 'react';

import request from '@/utils/request';
import { ToastAndroid } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext<{
  signIn: (phone:string,pwd:string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const login = async (phone:string,pwd:string) =>{
    try {
      const data:any = await request.post('api/auth/login', {
        data: {
          username: phone,
          password: pwd,
        },
      });
      await AsyncStorage.setItem('userinfo', JSON.stringify(data));       
      setSession(data?.accessToken??null);
      router.replace('/(tabs)/home');
    } catch (error: any) {
      ToastAndroid.show(error.message || '未知错误', ToastAndroid.SHORT);
    }
  }
  const loginOut =  async () =>{
      // 退出登录
      await request.post('api/auth/logout',{})
      await AsyncStorage.clear()
      setSession(null);
      router.replace('/sign-in')
  }
  return (
    <AuthContext.Provider
      value={{
        signIn: (phone:string,pwd:string) => {
          login(phone,pwd)
        },
        signOut: () => {
          loginOut()
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
