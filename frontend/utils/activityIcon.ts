import {
  FileText,
  StickyNote,
  Lock,
  CheckCircle2,
  Folder,
  Trash2,
  LogIn,
  Smartphone,
  KeyRound,
  ShieldAlert,
  LucideIcon,
} from 'lucide-react-native';
import { ActivityEvent } from '@/types/vault';

const MAP: Record<NonNullable<ActivityEvent['icon']>, LucideIcon> = {
  documento: FileText,
  imagen: FileText,
  video: FileText,
  audio: FileText,
  nota: StickyNote,
  secret: Lock,
  enlace: FileText,
  carpeta: Folder,
  login: LogIn,
  device: Smartphone,
  password: KeyRound,
  delete: Trash2,
  blocked: ShieldAlert,
};

export function activityIcon(event: ActivityEvent): LucideIcon {
  if (event.icon && MAP[event.icon]) return MAP[event.icon];
  return CheckCircle2;
}
