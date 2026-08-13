import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '@/context/AuthContext';
import { VaultProvider } from '@/context/VaultContext';
import { RootNavigator } from '@/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <VaultProvider>
          <StatusBar style="light" />
          <RootNavigator />
        </VaultProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
