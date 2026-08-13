import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Eye, EyeOff, RefreshCw, Folder, CheckCircle2, ChevronDown } from 'lucide-react-native';
import { colors } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { FormField } from '@/components/FormField';
import { PrimaryButton } from '@/components/PrimaryButton';
import { useVault } from '@/context/VaultContext';
import { SecretType } from '@/types/vault';
import { estimateStrength } from '@/utils/security';

const SECRET_TYPES: SecretType[] = ['API Key', 'Contraseña', 'Token', 'Nota segura', 'Tarjeta', 'Otro'];

export function NewSecretScreen() {
  const navigation = useNavigation<any>();
  const { addSecret } = useVault();

  const [secretType, setSecretType] = useState<SecretType>('API Key');
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [showValue, setShowValue] = useState(false);
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const strength = estimateStrength(value);
  const canSave = name.trim().length > 0 && value.trim().length > 0;

  async function handleSave() {
    if (!canSave) return;
    setSaving(true);
    await addSecret({ title: name.trim(), secretType, value: value.trim(), notes: notes.trim() || undefined });
    setSaving(false);
    setSaved(true);
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerAction}>Cancelar</Text>
        </TouchableOpacity>
        <Text style={typography.h3}>Nuevo secret</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.fieldWrap}>
          <Text style={typography.label}>Tipo de secret</Text>
          <View style={styles.selectRow}>
            {SECRET_TYPES.map((t) => (
              <TouchableOpacity
                key={t}
                style={[styles.typeChip, secretType === t && styles.typeChipActive]}
                onPress={() => setSecretType(t)}
              >
                <Text style={[styles.typeChipLabel, secretType === t && styles.typeChipLabelActive]}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <FormField label="Nombre" placeholder="Ej. Anthropic API Key" value={name} onChangeText={setName} />

        <View style={styles.fieldWrap}>
          <Text style={typography.label}>Clave / Token</Text>
          <View style={styles.valueRow}>
            <TextInput
              style={styles.valueInput}
              placeholder="Pega o escribe tu clave"
              placeholderTextColor={colors.textMuted}
              value={value}
              onChangeText={setValue}
              secureTextEntry={!showValue}
            />
            <TouchableOpacity onPress={() => setShowValue((v) => !v)}>
              {showValue ? <EyeOff size={18} color={colors.textSecondary} /> : <Eye size={18} color={colors.textSecondary} />}
            </TouchableOpacity>
          </View>
          {value.length > 0 && (
            <View style={styles.strengthRow}>
              <View style={styles.strengthBarBg}>
                <View
                  style={[
                    styles.strengthBarFill,
                    { width: `${strength.percent}%`, backgroundColor: strength.color },
                  ]}
                />
              </View>
              <Text style={[styles.strengthLabel, { color: strength.color }]}>{strength.label}</Text>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.saveInRow} activeOpacity={0.7}>
          <Folder size={16} color={colors.textSecondary} />
          <Text style={styles.saveInText}>Proyecto (opcional)</Text>
          <ChevronDown size={16} color={colors.textMuted} style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>

        <View style={styles.fieldWrap}>
          <Text style={typography.label}>Notas (opcional)</Text>
          <TextInput
            style={styles.textarea}
            placeholder="Añade contexto sobre este secret"
            placeholderTextColor={colors.textMuted}
            value={notes}
            onChangeText={setNotes}
            multiline
            textAlignVertical="top"
          />
        </View>

        <PrimaryButton label="Guardar secret" onPress={handleSave} disabled={!canSave || saving} style={{ marginTop: spacing.sm }} />

        {saved && (
          <View style={styles.confirmBox}>
            <CheckCircle2 size={20} color={colors.success} />
            <View style={{ flex: 1 }}>
              <Text style={styles.confirmTitle}>Secret guardado</Text>
              <Text style={styles.confirmSubtitle}>"{name}" se ha guardado de forma segura en Vault.</Text>
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
  selectRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  typeChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  typeChipActive: { backgroundColor: colors.accentSoft, borderWidth: 1, borderColor: colors.accent },
  typeChipLabel: { ...typography.bodySecondary },
  typeChipLabelActive: { color: colors.accent, fontWeight: '700' },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
  },
  valueInput: { flex: 1, color: colors.textPrimary, fontSize: 15, paddingVertical: spacing.md },
  strengthRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.xs },
  strengthBarBg: { flex: 1, height: 4, borderRadius: radius.full, backgroundColor: colors.surfaceElevated },
  strengthBarFill: { height: 4, borderRadius: radius.full },
  strengthLabel: { fontSize: 12, fontWeight: '700' },
  saveInRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  saveInText: { ...typography.body, fontWeight: '600' },
  textarea: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    minHeight: 90,
    color: colors.textPrimary,
    fontSize: 15,
  },
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
