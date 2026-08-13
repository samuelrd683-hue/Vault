import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { SearchBar } from '@/components/SearchBar';
import { Tag } from '@/components/Tag';
import { ListItem } from '@/components/ListItem';
import { EmptyState } from '@/components/EmptyState';
import { useVault } from '@/context/VaultContext';
import { formatSubtitle } from '@/utils/format';
import { ContentType } from '@/types/vault';

type FilterKey = 'todo' | ContentType;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'todo', label: 'Todo' },
  { key: 'documento', label: 'Archivos' },
  { key: 'nota', label: 'Notas' },
  { key: 'secret', label: 'Secrets' },
  { key: 'imagen', label: 'Imágenes' },
];

export function VaultScreen() {
  const { items } = useVault();
  const [filter, setFilter] = useState<FilterKey>('todo');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return items
      .filter((i) => filter === 'todo' || i.type === filter)
      .filter((i) => i.title.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [items, filter, query]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={typography.h1}>Vault</Text>
      </View>

      <View style={styles.searchWrap}>
        <SearchBar value={query} onChangeText={setQuery} onFilterPress={() => {}} />
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
        keyExtractor={(i) => i.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyState
            title="Tu Vault está vacío"
            subtitle="Toca el botón + para guardar tu primer documento, nota o secret."
          />
        }
        renderItem={({ item }) => (
          <ListItem type={item.type} title={item.title} subtitle={formatSubtitle(item)} favorite={item.favorite} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  searchWrap: { paddingHorizontal: spacing.lg, marginTop: spacing.lg },
  filterRow: { paddingHorizontal: spacing.lg, gap: spacing.sm, marginTop: spacing.lg, paddingBottom: spacing.sm },
  listContent: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl },
});
