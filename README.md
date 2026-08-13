# Vault — Frontend

Frontend en React Native (Expo + TypeScript) que replica el diseño de las
láminas de arquitectura: Inicio, Vault, Añadir, Nueva nota, Nuevo secret,
Actividad, Detalle de actividad y Perfil.

**Todo arranca vacío.** No hay datos de ejemplo: el usuario llena su Vault
desde la propia app (crear notas, secrets, etc.). El estado vive en memoria
(`VaultContext`) — al conectar un backend real, solo hay que reemplazar las
funciones de `src/context/VaultContext.tsx` por llamadas a tu API.

## Instalación

```bash
npm install
cp .env.example .env
```

Completa `.env` con tu `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`
(la clave **publicable**, nunca la secreta) y `EXPO_PUBLIC_API_URL` (tu backend).

```bash
npx expo start
```

Ahora la app pide login/registro real contra Supabase Auth. Las notas se
guardan directo en Supabase; los secrets pasan por tu backend, que los cifra
antes de guardarlos.

## Estructura

```
App.tsx                        Punto de entrada
src/
  theme/
    colors.ts                  Paleta (fondo negro, acento dorado, colores por categoría)
    spacing.ts                 Espaciados y radios
    typography.ts               Estilos de texto
  types/
    vault.ts                   Tipos: VaultItem, NoteItem, SecretItem, ActivityEvent...
  context/
    VaultContext.tsx           Estado global en memoria (items, actividad, perfil)
  navigation/
    RootNavigator.tsx          Stack raíz (tabs + pantallas modales)
    BottomTabs.tsx              Tabs: Inicio / Vault / Añadir / Actividad / Perfil
    CustomTabBar.tsx            Barra inferior con botón "+" central
  components/
    StatCard, SearchBar, ListItem, CategoryIcon, SectionHeader,
    Tag, EmptyState, PrimaryButton, FormField
  screens/
    HomeScreen.tsx              Inicio (resumen, accesos rápidos, recientes)
    VaultScreen.tsx             Listado completo con filtros
    AddContentScreen.tsx        Selector de tipo de contenido
    NewNoteScreen.tsx           Formulario de nota
    NewSecretScreen.tsx         Formulario de secret (con medidor de fortaleza)
    ActivityScreen.tsx          Historial de actividad con filtros
    ActivityDetailScreen.tsx    Detalle de un evento
    ProfileScreen.tsx           Cuenta y seguridad (2FA, biometría)
  utils/
    format.ts                  Fechas relativas ("Hoy, 10:30 AM"), subtítulos
    security.ts                 Estimación de fortaleza, generador de claves
    activityIcon.ts             Selección de ícono por tipo de evento

## Pendiente para producción (no incluido aquí)

- Backend real (Node/Express o similar) + base de datos (PostgreSQL)
- Autenticación (email/Google/Apple) + JWT
- Cifrado real de `SecretItem.value` en tránsito y en reposo (AES-256)
- Almacenamiento de archivos (S3 / Supabase Storage) para Documentos/Imágenes/Videos/Audio
- Persistencia local (actualmente el estado se pierde al recargar — conectar
  `VaultContext` a tu API o a un storage persistente)
```
