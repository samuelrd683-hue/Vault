import { Router } from 'express';
import { supabaseAdmin } from '../config/supabase.js';
import { encrypt, decrypt } from '../utils/crypto.js';

export const secretsRouter = Router();

// Crear secret: cifra el valor antes de guardarlo
secretsRouter.post('/', async (req, res) => {
  const { title, secretType, value, notes, projectId } = req.body;
  if (!title || !value) return res.status(400).json({ error: 'title y value son requeridos' });

  const { data: item, error: itemError } = await supabaseAdmin
    .from('vault_items')
    .insert({ user_id: req.userId, type: 'secret', title, project_id: projectId ?? null })
    .select()
    .single();
  if (itemError) return res.status(500).json({ error: itemError.message });

  const { error: secretError } = await supabaseAdmin
    .from('secrets')
    .insert({ item_id: item.id, secret_type: secretType, encrypted_value: encrypt(value), notes });
  if (secretError) return res.status(500).json({ error: secretError.message });

  await supabaseAdmin.from('activity_log').insert({
    user_id: req.userId, category: 'accion', title: 'Secret creado', description: title, icon: 'secret',
  });

  res.status(201).json({ id: item.id, title, secretType });
});

// Obtener un secret: descifra solo para el dueño (RLS ya filtra por user_id)
secretsRouter.get('/:id', async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from('secrets')
    .select('secret_type, encrypted_value, notes, vault_items!inner(id, title, user_id)')
    .eq('item_id', req.params.id)
    .single();

  if (error || !data) return res.status(404).json({ error: 'No encontrado' });
  if (data.vault_items.user_id !== req.userId) return res.status(403).json({ error: 'No autorizado' });

  await supabaseAdmin.from('activity_log').insert({
    user_id: req.userId, category: 'seguridad', title: 'Secret consultado', description: data.vault_items.title, icon: 'secret',
  });

  res.json({
    title: data.vault_items.title,
    secretType: data.secret_type,
    value: decrypt(data.encrypted_value),
    notes: data.notes,
  });
});
