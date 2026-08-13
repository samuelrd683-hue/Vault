import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LucideIcon, Inbox } from 'lucide-react-native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
}

export function EmptyState({ icon: Icon = Inbox, title, subtitle }: EmptyStateProps) {
  return (
    <View style={styles.wrap}>
      <Icon size={32} color={colors.textMuted} />
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxl,
    gap: spacing.xs,
  },
  title: { ...typography.body, fontWeight: '600', marginTop: spacing.sm },
  subtitle: { ...typography.caption, textAlign: 'center' },
});
