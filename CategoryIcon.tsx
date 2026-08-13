import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  StickyNote,
  Lock,
  Link as LinkIcon,
  Folder,
} from 'lucide-react-native';
import { colors, CategoryKey } from '@/theme/colors';
import { radius } from '@/theme/spacing';
import { ContentType } from '@/types/vault';

const ICONS: Record<ContentType, any> = {
  documento: FileText,
  imagen: ImageIcon,
  video: Video,
  audio: Music,
  nota: StickyNote,
  secret: Lock,
  enlace: LinkIcon,
  carpeta: Folder,
};

const COLOR_KEY: Record<ContentType, CategoryKey> = {
  documento: 'documentos',
  imagen: 'imagenes',
  video: 'videos',
  audio: 'audio',
  nota: 'notas',
  secret: 'secrets',
  enlace: 'enlaces',
  carpeta: 'carpetas',
};

interface CategoryIconProps {
  type: ContentType;
  size?: number;
}

export function CategoryIcon({ type, size = 20 }: CategoryIconProps) {
  const Icon = ICONS[type];
  const color = colors.category[COLOR_KEY[type]];
  return (
    <View style={[styles.wrap, { backgroundColor: `${color}22`, width: size * 2, height: size * 2 }]}>
      <Icon size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
