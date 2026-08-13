import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Home, Lock, Plus, Clock, User } from 'lucide-react-native';
import { colors } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';

const ICONS: Record<string, any> = {
  Inicio: Home,
  Vault: Lock,
  Actividad: Clock,
  Perfil: User,
};

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.bar}>
      {state.routes.map((route, index) => {
        const isCenter = route.name === 'Añadir';
        const isFocused = state.index === index;
        const Icon = isCenter ? Plus : ICONS[route.name];

        if (isCenter) {
          return (
            <TouchableOpacity
              key={route.key}
              style={styles.centerButton}
              onPress={() => navigation.navigate(route.name)}
              activeOpacity={0.8}
            >
              <Plus size={24} color="#0A0A0C" />
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tab}
            onPress={() => navigation.navigate(route.name)}
            activeOpacity={0.7}
          >
            <Icon size={22} color={isFocused ? colors.accent : colors.textMuted} />
            <Text style={[styles.label, { color: isFocused ? colors.accent : colors.textMuted }]}>
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
  },
  tab: { alignItems: 'center', gap: 2, minWidth: 56 },
  label: { fontSize: 11, fontWeight: '600' },
  centerButton: {
    width: 52,
    height: 52,
    borderRadius: radius.full,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -24,
  },
});
