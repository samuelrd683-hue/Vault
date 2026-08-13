// Paleta extraída del diseño original de Vault
export const colors = {
  // Base
  background: '#0A0A0C',
  surface: '#161619',
  surfaceElevated: '#1E1E22',
  border: '#2A2A2E',

  // Marca
  accent: '#F2A93B', // dorado / ámbar
  accentSoft: 'rgba(242, 169, 59, 0.15)',

  // Texto
  textPrimary: '#FFFFFF',
  textSecondary: '#9A9AA2',
  textMuted: '#6B6B72',

  // Estado
  success: '#3DD873',
  danger: '#E14B4B',
  dangerSoft: 'rgba(225, 75, 75, 0.15)',
  warning: '#F2A93B',

  // Colores por categoría de contenido
  category: {
    documentos: '#4A90E2',
    imagenes: '#3DD873',
    videos: '#F2A93B',
    audio: '#F2A93B',
    notas: '#8B7FE8',
    secrets: '#E14B4B',
    enlaces: '#4AB8E8',
    carpetas: '#E8C34A',
  },
} as const;

export type CategoryKey = keyof typeof colors.category;
