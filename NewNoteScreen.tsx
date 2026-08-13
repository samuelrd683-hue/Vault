import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Folder, Plus, CheckCircle2 } from 'lucide-react-native';
import { colors } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { FormField } from '@/components/FormField';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Tag } from '@/components/Tag';
import { useVault } from '@/context/VaultContext';

export function NewNoteScreen() {
  const navigation = useNavigation<any>();
  const { addNote } = useVault();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const canSave = title.trim().length > 0 && content.trim().length > 0;

  function handleAddTag() {
    const clean = tagInput.trim();
    if (clean && !tags.includes(clean)) {
      setTags((prev) => [...prev, clean]);
    }
    setTagInput('');
  }

  async function handleSave() {
    if (!canSave) return;
    setSaving(true);
    await addNote({ title: title.trim(), content: content.trim(), tags });
    setSaving(false);
    setSaved(true);
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerAction}>Cancelar</Text>
        </TouchableOpacity>
        <Text style={typography.h3}>Nueva nota</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <FormField label="Título" placeholder="Título de la nota" value={title} onChangeText={setTitle} />

        <View style={styles.fieldWrap}>
          <Text style={typography.label}>Contenido</Text>
          <TextInput
            style={styles.textarea}
            placeholder="Escribe aquí..."
            placeholderTextColor={colors.textMuted}
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
          />
        </View>

        <View style={styles.fieldWrap}>
          <Text style={typography.label}>Etiquetas (opcional)</Text>
          <View style={styles.tagRow}>
            {tags.map((t) => (
              <Tag key={t} label={t} active onPress={() => setTags((prev) => prev.filter((x) => x !== t))} />
            ))}
            <TextInput
              style={styles.tagInput}
              placeholder="Añadir"
              placeholderTextColor={colors.textMuted}
              value={tagInput}
              onChangeText={setTagInput}
              onSubmitEditing={handleAddTag}
            />
            <TouchableOpacity onPress={handleAddTag} style={styles.addTagBtn}>
              <Plus size={16} color={colors.accent} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.saveInRow} activeOpacity={0.7}>
          <Folder size={16} color={colors.textSecondary} />
          <Text style={styles.saveInText}>Guardar en{'\n'}Notas</Text>
        </TouchableOpacity>

        <PrimaryButton label="Guardar nota" onPress={handleSave} disabled={!canSave || saving} style={{ marginTop: spacing.lg }} />

        {saved && (
          <View style={styles.confirmBox}>
            <CheckCircle2 size={20} color={colors.success} />
            <View style={{ flex: 1 }}>
              <Text style={styles.confirmTitle}>Nota guardada</Text>
              <Text style={styles.confirmSubtitle}>
                "{title}" se ha guardado correctamente en Vault / Notas.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
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
  headerAction: { ...typography.bodySecondary, color: colors.accent, width: 60 },
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxxl },
  fieldWrap: { gap: spacing.xs },
  textarea: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    minHeight: 140,
    color: colors.textPrimary,
    fontSize: 15,
  },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, alignItems: 'center' },
  tagInput: {
    minWidth: 80,
    color: colors.textPrimary,
    paddingHorizontal: spacing.sm,
  },
  addTagBtn: {
    width: 28,
    height: 28,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveInRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  saveInText: { ...typography.body, fontWeight: '600' },
  confirmBox: {
    flexDirection: 'row',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  confirmTitle: { ...typography.body, fontWeight: '700' },
  confirmSubtitle: { ...typography.caption, marginTop: 2 },
});
