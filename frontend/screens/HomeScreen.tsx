import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, StickyNote, FileText, Lock, Image as ImageIcon } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { SearchBar } from '@/components/SearchBar';
import { StatCard } from '@/components/StatCard';
import { SectionHeader } from '@/components/SectionHeader';
import { ListItem } from '@/components/ListItem';
import { EmptyState } from '@/components/EmptyState';
import { useVault } from '@/context/VaultContext';
import { useAuth } from '@/context/AuthContext';
import { formatRelativeDate, formatSubtitle } from '@/utils/format';

export function HomeScreen() {
  const navigation = useNavigation<any>();
  const { items } = useVault();
  const { session } = useAuth();

  const recent = [...items]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 4);

  const counts = {
    documentos: items.filter((i) => i.type === 'documento').length,
    notas: items.filter((i) => i.type === 'nota').length,
    secrets: items.filter((i) => i.type === 'secret').length,
    imagenes: items.filter((i) => i.type === 'imagen').length,
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <View>
            <Text style={typography.h1}>Inicio</Text>
          </View>
          <Bell size={22} color={colors.textSecondary} />
        </View>

        <Text style={styles.greeting}>Hola 👋</Text>
        <Text style={styles.tagline}>Tu caja fuerte digital. Todo seguro. Todo tuyo.</Text>

        <View style={styles.searchWrap}>
          <SearchBar
            placeholder="Buscar en todo Vault"
            value=""
            onChangeText={() => {}}
            onFilterPress={() => {}}
          />
        </View>

        <SectionHeader title="Accesos rápidos" actionLabel="Ver todo" onActionPress={() => navigation.navigate('Vault')} />
        <View style={styles.statsRow}>
          <StatCard icon={StickyNote} iconColor={colors.category.notas} label="Notas" value={counts.notas} />
          <StatCard icon={FileText} iconColor={colors.category.documentos} label="Documentos" value={counts.documentos} />
          <StatCard icon={Lock} iconColor={colors.category.secrets} label="Secrets" value={counts.secrets} />
          <StatCard icon={ImageIcon} iconColor={colors.category.imagenes} label="Imágenes" value={counts.imagenes} />
        </View>

        <View style={styles.sectionSpacing}>
          <SectionHeader title="Recientes" actionLabel="Ver todo" onActionPress={() => navigation.navigate('Vault')} />
          {recent.length === 0 ? (
            <EmptyState
              title="Todavía no hay nada aquí"
              subtitle="Lo que guardes en tu Vault aparecerá en esta sección."
            />
          ) : (
            recent.map((item) => (
              <ListItem
                key={item.id}
                type={item.type}
                title={item.title}
                subtitle={formatSubtitle(item)}
                favorite={item.favorite}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxxl },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { ...typography.h2, marginTop: spacing.md },
  tagline: { ...typography.bodySecondary, marginTop: spacing.xs },
  searchWrap: { marginTop: spacing.lg, marginBottom: spacing.xl },
  statsRow: { flexDirection: 'row', gap: spacing.sm },
  sectionSpacing: { marginTop: spacing.xl },
});
