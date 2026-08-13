export type ContentType =
  | 'documento'
  | 'imagen'
  | 'video'
  | 'audio'
  | 'nota'
  | 'secret'
  | 'enlace'
  | 'carpeta';

export interface VaultItemBase {
  id: string;
  type: ContentType;
  title: string;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  projectId?: string;
  tags?: string[];
  favorite?: boolean;
}

export interface FileItem extends VaultItemBase {
  type: 'documento' | 'imagen' | 'video' | 'audio';
  sizeBytes?: number;
  uri?: string;
}

export interface NoteItem extends VaultItemBase {
  type: 'nota';
  content: string;
}

export type SecretType = 'API Key' | 'Contraseña' | 'Token' | 'Nota segura' | 'Tarjeta' | 'Otro';

export interface SecretItem extends VaultItemBase {
  type: 'secret';
  secretType: SecretType;
  value: string; // debería almacenarse cifrado antes de persistir
  notes?: string;
}

export interface LinkItem extends VaultItemBase {
  type: 'enlace';
  url: string;
}

export interface FolderItem extends VaultItemBase {
  type: 'carpeta';
  itemCount: number;
}

export type VaultItem = FileItem | NoteItem | SecretItem | LinkItem | FolderItem;

export type ActivityCategory = 'accion' | 'seguridad' | 'acceso';

export interface ActivityEvent {
  id: string;
  category: ActivityCategory;
  title: string;
  description?: string;
  timestamp: string; // ISO date
  icon?: ContentType | 'login' | 'device' | 'password' | 'delete' | 'blocked';
}

export interface Project {
  id: string;
  name: string;
  itemCount: number;
}

export interface UserProfile {
  name: string;
  email: string;
  twoFactorEnabled: boolean;
  biometricEnabled: boolean;
}
