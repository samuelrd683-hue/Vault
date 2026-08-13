import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Search } from 'lucide-react-native';
import { colors } from '@/theme/colors';
import { spacing, radius } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { Tag } from '@/components/Tag';
import { EmptyState } from '@/components/EmptyState';
import { useVault } from '@/context/VaultContext';
import { ActivityCategory } from '@/types/vault';
import { formatRelativeDate } from '@/utils/format';
import { activityIcon } from '@/utils/activityIcon';

type FilterKey = 'todo' | ActivityCategory;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'todo', label: 'Todo' },
  { key: 'accion', label: 'Acciones' },
  { key: 'seguridad', label: 'Seguridad' },
  { key: 'acceso', label: 'Accesos' },
];

export function ActivityScreen() {
  const navigation = useNavigation<any>();
  const { activity } = useVault();
  const [filter, setFilter] = useState<FilterKey>('todo');

  const filtered = useMemo(
    () => activity.filter((a) => filter === 'todo' || a.category === filter),
    [activity, filter]
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={typography.h1}>Actividad</Text>
        <Search size={20} color={colors.textSecondary} />
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={FILTERS}
        keyExtractor={(f) => f.key}
        contentContainerStyle={styles.filterRow}
        renderItem={({ item }) => (
          <Tag label={item.label} active={filter === item.key} onPress={() => setFilter(item.key)} />
        )}
      />

      <FlatList
        data={filtered}
        keyExtractor={(a) => a.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyState title="Sin actividad todavía" subtitle="Aquí verás cada acción que hagas en tu Vault." />
        }
        renderItem={({ item }) => {
          const Icon = activityIcon(item);
          return (
            <TouchableOpacity
              style={styles.row}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('ActivityDetail', { eventId: item.id })}
            >
              <View style={styles.iconWrap}>
                <Icon size={16} color={colors.textPrimary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>{item.title}</Text>
                {item.description ? <Text style={styles.rowSubtitle}>{item.description}</Text> : null}
              </View>
              <Text style={styles.rowTime}>{formatRelativeDate(item.timestamp)}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  filterRow: { paddingHorizontal: spacing.lg, gap: spacing.sm, marginTop: spacing.lg, paddingBottom: spacing.sm },
  listContent: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.sm },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTitle: { ...typography.body, fontWeight: '600' },
  rowSubtitle: { ...typography.caption, marginTop: 2 },
  rowTime: { ...typography.caption },
});
