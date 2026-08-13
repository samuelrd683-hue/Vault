import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  StickyNote,
  Lock,
  Link as LinkIcon,
  Folder,
  LucideIcon,
} from 'lucide-react-native';
import { colors, CategoryKey } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { ContentType } from '@/types/vault';

const OPTIONS: { type: ContentType | 'carpeta'; label: string; icon: LucideIcon; colorKey: CategoryKey; screen?: string }[] = [
  { type: 'documento', label: 'Documento', icon: FileText, colorKey: 'documentos' },
  { type: 'imagen', label: 'Imagen', icon: ImageIcon, colorKey: 'imagenes' },
  { type: 'video', label: 'Video', icon: Video, colorKey: 'videos' },
  { type: 'audio', label: 'Audio', icon: Music, colorKey: 'audio' },
  { type: 'nota', label: 'Nota', icon: StickyNote, colorKey: 'notas', screen: 'NewNote' },
  { type: 'secret', label: 'Secret', icon: Lock, colorKey: 'secrets', screen: 'NewSecret' },
  { type: 'enlace', label: 'Enlace', icon: LinkIcon, colorKey: 'enlaces' },
  { type: 'carpeta', label: 'Carpeta', icon: Folder, colorKey: 'carpetas' },
];

export function AddContentScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={typography.h2}>Añadir a Vault</Text>
        <Text style={styles.subtitle}>¿Qué quieres guardar?</Text>
      </View>

      <View style={styles.grid}>
        {OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const color = colors.category[opt.colorKey];
          return (
            <TouchableOpacity
              key={opt.type}
              style={styles.tile}
              activeOpacity={0.7}
              onPress={() => opt.screen && navigation.navigate(opt.screen)}
            >
              <View style={[styles.iconWrap, { backgroundColor: `${color}22` }]}>
                <Icon size={22} color={color} />
              </View>
              <Text style={styles.tileLabel}>{opt.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm, alignItems: 'center' },
  subtitle: { ...typography.bodySecondary, marginTop: spacing.xs },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.lg,
    gap: spacing.md,
    justifyContent: 'center',
  },
  tile: {
    width: '28%',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileLabel: { ...typography.bodySecondary, color: colors.textPrimary, fontWeight: '600' },
});
