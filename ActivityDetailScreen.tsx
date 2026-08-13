import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeft, Trash2 } from 'lucide-react-native';
import { colors } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { useVault } from '@/context/VaultContext';
import { formatRelativeDate } from '@/utils/format';
import { activityIcon } from '@/utils/activityIcon';

export function ActivityDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { activity, clearActivity } = useVault();

  const event = activity.find((a) => a.id === route.params?.eventId);

  if (!event) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={typography.body}>Evento no encontrado.</Text>
      </SafeAreaView>
    );
  }

  const Icon = activityIcon(event);

  function handleDelete() {
    clearActivity(event.id);
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={typography.h3}>Detalle de actividad</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.iconBox}>
          <Icon size={28} color={colors.textPrimary} />
        </View>
        <Text style={styles.title}>{event.title}</Text>
        {event.description ? <Text style={styles.subtitle}>{event.description}</Text> : null}
        <Text style={styles.timestamp}>{formatRelativeDate(event.timestamp)}</Text>

        <View style={styles.infoCard}>
          <Text style={typography.h3}>Información</Text>
          <InfoRow label="Categoría" value={event.category} />
          <InfoRow label="Fecha" value={new Date(event.timestamp).toLocaleString('es-ES')} />
        </View>

        <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
          <Trash2 size={16} color={colors.danger} />
          <Text style={styles.deleteLabel}>Eliminar registro</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  content: { padding: spacing.lg, alignItems: 'center', gap: spacing.xs },
  iconBox: {
    width: 72,
    height: 72,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  title: { ...typography.h3, textAlign: 'center' },
  subtitle: { ...typography.bodySecondary, textAlign: 'center' },
  timestamp: { ...typography.caption, marginBottom: spacing.lg },
  infoCard: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.sm,
  },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.xs },
  infoLabel: { ...typography.bodySecondary },
  infoValue: { ...typography.body, fontWeight: '600' },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.dangerSoft,
    borderRadius: radius.md,
    padding: spacing.md,
    width: '100%',
    marginTop: spacing.xl,
  },
  deleteLabel: { color: colors.danger, fontWeight: '700' },
});
