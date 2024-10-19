import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import RedBookTabBar from '@/components/RedBookTabBar';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <RedBookTabBar {...props}></RedBookTabBar>}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: '首页',
        }}
      />
      <Tabs.Screen
        name="shope"
        options={{
          title: '购物',
        }}
      />
      <Tabs.Screen
        name="publish"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          title: '消息',
        }}
      />
      <Tabs.Screen
        name="mine"
        options={{
          title: '我的',
        }}
      />
    </Tabs>
  );
}
