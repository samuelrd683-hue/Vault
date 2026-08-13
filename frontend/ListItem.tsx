import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Star, MoreVertical } from 'lucide-react-native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { CategoryIcon } from './CategoryIcon';
import { ContentType } from '@/types/vault';

interface ListItemProps {
  type: ContentType;
  title: string;
  subtitle: string;
  favorite?: boolean;
  onPress?: () => void;
  onMorePress?: () => void;
}

export function ListItem({ type, title, subtitle, favorite, onPress, onMorePress }: ListItemProps) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <CategoryIcon type={type} size={18} />
      <View style={styles.textWrap}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {favorite && <Star size={13} color={colors.accent} fill={colors.accent} />}
        </View>
        <Text style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      </View>
      {onMorePress && <MoreVertical size={18} color={colors.textMuted} onPress={onMorePress} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  textWrap: { flex: 1, gap: 2 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  title: { ...typography.body, fontWeight: '600' },
  subtitle: { ...typography.caption },
});
