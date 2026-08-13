import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { supabase, API_URL } from '@/config/supabase';
import { useAuth } from './AuthContext';
import { ActivityEvent, NoteItem, Project, SecretItem, VaultItem } from '@/types/vault';

interface VaultContextValue {
  items: VaultItem[];
  activity: ActivityEvent[];
  projects: Project[];
  loading: boolean;
  refresh: () => Promise<void>;
  addNote: (data: { title: string; content: string; projectId?: string; tags?: string[] }) => Promise<void>;
  addSecret: (data: {
    title: string;
    secretType: SecretItem['secretType'];
    value: string;
    projectId?: string;
    notes?: string;
  }) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
}

const VaultContext = createContext<VaultContextValue | undefined>(undefined);

export function VaultProvider({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();
  const [items, setItems] = useState<VaultItem[]>([]);
  const [activity, setActivity] = useState<ActivityEvent[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  async function authHeader() {
    return { Authorization: `Bearer ${session?.access_token}`, 'Content-Type': 'application/json' };
  }

  const refresh = useCallback(async () => {
    if (!session) return;
    setLoading(true);

    const [itemsRes, activityRes, projectsRes] = await Promise.all([
      supabase.from('vault_items').select('*, notes(content), links(url)').order('updated_at', { ascending: false }),
      supabase.from('activity_log').select('*').order('created_at', { ascending: false }).limit(50),
      supabase.from('projects').select('*'),
    ]);

    if (itemsRes.data) {
      setItems(
        itemsRes.data.map((row: any) => ({
          id: row.id,
          type: row.type,
          title: row.title,
          projectId: row.project_id,
          tags: row.tags,
          favorite: row.favorite,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
          content: row.notes?.[0]?.content,
          url: row.links?.[0]?.url,
        }))
      );
    }
    if (activityRes.data) {
      setActivity(
        activityRes.data.map((row: any) => ({
          id: row.id,
          category: row.category,
          title: row.title,
          description: row.description,
          icon: row.icon,
          timestamp: row.created_at,
        }))
      );
    }
    if (projectsRes.data) {
      setProjects(projectsRes.data.map((row: any) => ({ id: row.id, name: row.name, itemCount: 0 })));
    }
    setLoading(false);
  }, [session]);

  useEffect(() => {
    if (session) refresh();
    else {
      setItems([]);
      setActivity([]);
      setProjects([]);
    }
  }, [session, refresh]);

  // Notas: van directo a Supabase (no necesitan cifrado)
  const addNote = useCallback<VaultContextValue['addNote']>(
    async ({ title, content, projectId, tags }) => {
      const { data: item, error } = await supabase
        .from('vault_items')
        .insert({ user_id: session?.user.id, type: 'nota', title, project_id: projectId, tags })
        .select()
        .single();
      if (error || !item) return;
      await supabase.from('notes').insert({ item_id: item.id, content });
      await supabase.from('activity_log').insert({
        user_id: session?.user.id, category: 'accion', title: 'Nota creada', description: title, icon: 'nota',
      });
      await refresh();
    },
    [session, refresh]
  );

  // Secrets: pasan por el backend, que los cifra antes de guardarlos
  const addSecret = useCallback<VaultContextValue['addSecret']>(
    async ({ title, secretType, value, projectId, notes }) => {
      const headers = await authHeader();
      await fetch(`${API_URL}/secrets`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ title, secretType, value, projectId, notes }),
      });
      await refresh();
    },
    [session, refresh]
  );

  const removeItem = useCallback(
    async (id: string) => {
      await supabase.from('vault_items').delete().eq('id', id);
      await refresh();
    },
    [refresh]
  );

  const toggleFavorite = useCallback(
    async (id: string) => {
      const item = items.find((i) => i.id === id);
      if (!item) return;
      await supabase.from('vault_items').update({ favorite: !item.favorite }).eq('id', id);
      await refresh();
    },
    [items, refresh]
  );

  const value = useMemo(
    () => ({ items, activity, projects, loading, refresh, addNote, addSecret, removeItem, toggleFavorite }),
    [items, activity, projects, loading, refresh, addNote, addSecret, removeItem, toggleFavorite]
  );

  return <VaultContext.Provider value={value}>{children}</VaultContext.Provider>;
}

export function useVault() {
  const ctx = useContext(VaultContext);
  if (!ctx) throw new Error('useVault debe usarse dentro de VaultProvider');
  return ctx;
}
