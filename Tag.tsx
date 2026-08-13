import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';

interface TagProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
}

export function Tag({ label, active, onPress }: TagProps) {
  return (
    <TouchableOpacity
      style={[styles.tag, active && styles.tagActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
  },
  tagActive: {
    backgroundColor: colors.accent,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  labelActive: {
    color: '#0A0A0C',
  },
});
