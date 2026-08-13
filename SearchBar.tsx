import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { colors } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress?: () => void;
}

export function SearchBar({ placeholder = 'Buscar en Vault', value, onChangeText, onFilterPress }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Search size={16} color={colors.textMuted} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        value={value}
        onChangeText={onChangeText}
      />
      {onFilterPress && (
        <SlidersHorizontal size={16} color={colors.textSecondary} onPress={onFilterPress} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 44,
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 14,
  },
});
