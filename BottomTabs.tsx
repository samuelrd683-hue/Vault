import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '@/screens/HomeScreen';
import { VaultScreen } from '@/screens/VaultScreen';
import { AddContentScreen } from '@/screens/AddContentScreen';
import { ActivityScreen } from '@/screens/ActivityScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { CustomTabBar } from './CustomTabBar';

const Tab = createBottomTabNavigator();

export function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Vault" component={VaultScreen} />
      <Tab.Screen name="Añadir" component={AddContentScreen} />
      <Tab.Screen name="Actividad" component={ActivityScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
