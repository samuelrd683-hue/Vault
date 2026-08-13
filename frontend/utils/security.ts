import { colors } from '@/theme/colors';

interface StrengthResult {
  percent: number;
  label: string;
  color: string;
}

export function estimateStrength(value: string): StrengthResult {
  if (!value) return { percent: 0, label: '', color: colors.textMuted };

  let score = 0;
  if (value.length >= 8) score += 1;
  if (value.length >= 14) score += 1;
  if (/[A-Z]/.test(value)) score += 1;
  if (/[0-9]/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;

  const percent = Math.min(100, (score / 5) * 100);

  if (score <= 1) return { percent, label: 'Débil', color: colors.danger };
  if (score <= 3) return { percent, label: 'Media', color: colors.warning };
  return { percent, label: 'Muy segura', color: colors.success };
}

export function generateSecurePassword(length = 20): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}
