import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserCircle2, Fingerprint, ShieldCheck, LogOut } from 'lucide-react-native';
import { colors } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { useAuth } from '@/context/AuthContext';

export function ProfileScreen() {
  const { session, signOut } = useAuth();
  const [twoFactor, setTwoFactor] = useState(false);
  const [biometric, setBiometric] = useState(false);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={typography.h1}>Perfil</Text>

        <View style={styles.avatarWrap}>
          <UserCircle2 size={64} color={colors.textMuted} />
          <Text style={styles.email}>{session?.user.email}</Text>
        </View>

        <Text style={[typography.label, { marginTop: spacing.md, marginBottom: spacing.sm }]}>SEGURIDAD</Text>

        <View style={styles.settingRow}>
          <ShieldCheck size={18} color={colors.textSecondary} />
          <Text style={styles.settingLabel}>Autenticación en dos pasos (2FA)</Text>
          <Switch
            value={twoFactor}
            onValueChange={setTwoFactor}
            trackColor={{ true: colors.accent, false: colors.surfaceElevated }}
          />
        </View>

        <View style={styles.settingRow}>
          <Fingerprint size={18} color={colors.textSecondary} />
          <Text style={styles.settingLabel}>Desbloqueo biométrico</Text>
          <Switch
            value={biometric}
            onValueChange={setBiometric}
            trackColor={{ true: colors.accent, false: colors.surfaceElevated }}
          />
        </View>

        <TouchableOpacity style={styles.logoutRow} onPress={signOut}>
          <LogOut size={18} color={colors.danger} />
          <Text style={styles.logoutLabel}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxxl },
  avatarWrap: { alignItems: 'center', marginVertical: spacing.xl, gap: spacing.xs },
  email: { ...typography.bodySecondary },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  settingLabel: { ...typography.body, flex: 1 },
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.xl,
    padding: spacing.md,
  },
  logoutLabel: { color: colors.danger, fontWeight: '700' },
});
