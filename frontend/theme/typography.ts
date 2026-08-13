import { TextStyle } from 'react-native';
import { colors } from './theme/colors';

export const typography: Record<string, TextStyle> = {
  h1: { fontSize: 28, fontWeight: '700', color: colors.textPrimary },
  h2: { fontSize: 20, fontWeight: '700', color: colors.textPrimary },
  h3: { fontSize: 17, fontWeight: '600', color: colors.textPrimary },
  body: { fontSize: 15, fontWeight: '400', color: colors.textPrimary },
  bodySecondary: { fontSize: 13, fontWeight: '400', color: colors.textSecondary },
  caption: { fontSize: 12, fontWeight: '400', color: colors.textMuted },
  label: { fontSize: 13, fontWeight: '600', color: colors.textSecondary },
  button: { fontSize: 15, fontWeight: '700', color: '#0A0A0C' },
};
