import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Lock } from 'lucide-react-native';
import { colors } from '@/theme/colors';
import { radius, spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { FormField } from '@/components/FormField';
import { PrimaryButton } from '@/components/PrimaryButton';
import { useAuth } from '@/context/AuthContext';

export function AuthScreen() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const canSubmit = email.trim().length > 0 && password.length >= 6;

  async function handleSubmit() {
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    const action = mode === 'login' ? signIn : signUp;
    const { error } = await action(email.trim(), password);
    setLoading(false);
    if (error) setError(error);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <View style={styles.logoWrap}>
          <Lock size={28} color={colors.accent} />
        </View>
        <Text style={typography.h1}>Vault</Text>
        <Text style={styles.tagline}>Tu caja fuerte digital. Todo seguro. Todo tuyo.</Text>

        <View style={{ gap: spacing.lg, marginTop: spacing.xxl, width: '100%' }}>
          <FormField
            label="Correo"
            placeholder="tucorreo@ejemplo.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <FormField
            label="Contraseña"
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {error && <Text style={styles.error}>{error}</Text>}

        <PrimaryButton
          label={loading ? '' : mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
          onPress={handleSubmit}
          disabled={!canSubmit || loading}
          style={{ marginTop: spacing.xl, width: '100%' }}
        />
        {loading && <ActivityIndicator color={colors.accent} style={{ marginTop: spacing.md }} />}

        <TouchableOpacity onPress={() => setMode(mode === 'login' ? 'register' : 'login')} style={{ marginTop: spacing.xl }}>
          <Text style={styles.switchText}>
            {mode === 'login' ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
            <Text style={{ color: colors.accent, fontWeight: '700' }}>
              {mode === 'login' ? 'Regístrate' : 'Inicia sesión'}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xxl },
  logoWrap: {
    width: 56,
    height: 56,
    borderRadius: radius.lg,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  tagline: { ...typography.bodySecondary, textAlign: 'center', marginTop: spacing.xs },
  error: { color: colors.danger, fontSize: 13, marginTop: spacing.md, textAlign: 'center' },
  switchText: { ...typography.bodySecondary, textAlign: 'center' },
});
