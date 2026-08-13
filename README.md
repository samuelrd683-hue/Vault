# Vault Backend

Solo maneja lo que Supabase no debe hacer directo: cifrar/descifrar Secrets.
Notas, Documentos, Imágenes, etc. van directo del frontend a Supabase (con RLS).

## Pasos

1. Crea un proyecto en supabase.com y corre `schema.sql` en el SQL Editor.
2. `cp .env.example .env` y completa `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
   y genera `ENCRYPTION_KEY` con el comando indicado en el archivo.
3. `npm install && npm run dev`

## Desplegar en Railway

1. Sube esta carpeta a un repo de GitHub (`.env` no se sube, está en `.gitignore`)
2. En Railway: New Project → Deploy from GitHub → selecciona el repo
3. Pestaña **Variables** → agrega `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ENCRYPTION_KEY`
4. Start command: `npm start`

## Endpoints

- `POST /secrets` — crea un secret (cifra `value` antes de guardarlo)
- `GET /secrets/:id` — descifra y devuelve un secret del usuario autenticado

Ambos requieren header `Authorization: Bearer <access_token de Supabase Auth>`.
