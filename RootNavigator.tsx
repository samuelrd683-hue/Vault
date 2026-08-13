import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '@/theme/colors';
import { BottomTabs } from './BottomTabs';
import { NewNoteScreen } from '@/screens/NewNoteScreen';
import { NewSecretScreen } from '@/screens/NewSecretScreen';
import { ActivityDetailScreen } from '@/screens/ActivityDetailScreen';
import { AuthScreen } from '@/screens/AuthScreen';
import { useAuth } from '@/context/AuthContext';

const Stack = createNativeStackNavigator();

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    card: colors.background,
    text: colors.textPrimary,
    border: colors.border,
    primary: colors.accent,
  },
};

export function RootNavigator() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  return (
    <NavigationContainer theme={navTheme}>
      {!session ? (
        <AuthScreen />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={BottomTabs} />
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="NewNote" component={NewNoteScreen} />
            <Stack.Screen name="NewSecret" component={NewSecretScreen} />
            <Stack.Screen name="ActivityDetail" component={ActivityDetailScreen} />
          </Stack.Group>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
