import { VaultItem } from '@/types/vault';

const CATEGORY_LABEL: Record<VaultItem['type'], string> = {
  documento: 'Documentos',
  imagen: 'Imágenes',
  video: 'Videos',
  audio: 'Audio',
  nota: 'Notas',
  secret: 'Secrets',
  enlace: 'Enlaces',
  carpeta: 'Carpeta',
};

export function formatRelativeDate(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  const time = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

  if (isToday) return `Hoy, ${time}`;
  if (isYesterday) return `Ayer, ${time}`;
  return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function formatSubtitle(item: VaultItem): string {
  return `${CATEGORY_LABEL[item.type]} • ${formatRelativeDate(item.updatedAt)}`;
}

export function formatBytes(bytes?: number): string {
  if (!bytes) return '';
  const mb = bytes / (1024 * 1024);
  if (mb < 1) return `${Math.round(bytes / 1024)} KB`;
  return `${mb.toFixed(1)} MB`;
}
