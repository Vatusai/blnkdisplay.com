# ADMIN NAVBAR SYSTEM — BLNK DISPLAY
### Auditoría de design system para replicación en DigiViolin LMS
*Análisis realizado por claude — 2026-03-14*

---

## 1. Arquitectura del layout

El layout del admin es un **flex horizontal de dos columnas** que ocupa `min-h-screen`:

```
AdminLayout (div.flex)
 ├── Sidebar (aside) — ancho fijo, collapsible
 └── ContentArea (div.flex-1.flex-col)
      ├── Header (header sticky)
      └── Main (main.flex-1.overflow-auto)
```

### Distribución

| Zona | Tipo | Ancho | Scroll |
|---|---|---|---|
| Sidebar | `fixed` en mobile / `static` en desktop | 256px expandido / 80px colapsado | interno si contenido excede |
| Header | `sticky top-0` dentro del ContentArea | 100% del ContentArea | no |
| Main | `flex-1 overflow-auto` | 100% del ContentArea | propio |

**Observación crítica:** el sidebar en desktop es `static` (parte del flujo), no `fixed`. Esto significa que el ContentArea se encoge naturalmente cuando el sidebar se expande, sin necesitar cálculos de `margin-left` ni `padding-left`. El sidebar en mobile sí es `fixed` y se superpone al contenido.

### Gestión del ancho del sidebar

Dos estados controlados por `isSidebarOpen: boolean`:

- **Expandido:** `w-64` (256px)
- **Colapsado:** `w-20` (80px) en desktop / `w-0` en mobile

La transición entre estados usa `transition-all duration-300 ease-in-out` directamente en el `<aside>`, lo que anima tanto el ancho como los elementos internos de forma coherente.

---

## 2. Sidebar — anatomía completa

El sidebar tiene **tres zonas verticales fijas**, separadas por bordes sutiles:

```
Sidebar
 ├── LogoArea       — h-16, border-bottom
 ├── NavigationArea — flex-1, overflow-y-auto (scrolleable)
 │    ├── MainNav (navItems primarios)
 │    └── SettingsGroup (navItems secundarios con label de sección)
 └── UserArea       — border-top, fijo al fondo
```

### 2.1 Logo Area

- Altura fija `h-16` (misma que el Header, crea alineación visual perfecta)
- Expandido: logo + nombre del producto a la izquierda, botón colapsar a la derecha
- Colapsado: solo el ícono del logo, centrado, con Tooltip al hover
- El logo usa un contenedor `w-8 h-8 rounded-lg bg-[var(--accent)]/10` — ícono sobre fondo tintado en accent al 10% de opacidad
- Nombre del producto: dos líneas, `text-sm font-bold` arriba y `text-[10px] text-zinc-500 uppercase tracking-wider` abajo (marca de producto vs. contexto)

### 2.2 Navigation Area

Zona scrolleable que contiene dos grupos:

**Grupo 1 — Main Nav** (sin label visible)
- Dashboard, Content, CRM

**Grupo 2 — Settings** (con label de sección)
- Label: `text-xs font-medium text-zinc-600 uppercase tracking-wider` — invisible en colapsado
- Theme, General

La separación entre grupos usa `space-y-6` en el contenedor, no un `<hr>` o borde explícito. Es separación por espacio, no por línea.

### 2.3 SidebarNavItem — estados detallados

El componente tiene **dos modos de render**: expandido e `isCollapsed`.

**Estado normal (sin hover, sin active):**
- `flex items-center gap-3 px-3 py-2.5 rounded-lg`
- Ícono: `w-5 h-5 text-zinc-400`
- Label: `flex-1 font-medium text-sm text-zinc-400`
- ChevronRight: `w-4 h-4 text-zinc-400`

**Estado hover:**
- Background: `bg-[var(--accent)]/10` (10% del accent)
- Ícono y texto: `text-zinc-100`
- Transición: `duration-200`

**Estado active (ruta actual):**
- Background: `bg-[var(--accent)]/10` (mismo que hover — no diferencia en background)
- Ícono y texto: `text-[var(--accent)]` (color accent completo)
- El accent actúa como único diferenciador visual entre "hover" y "activo"

**Estado colapsado (solo ícono):**
- Contenedor: `w-10 h-10 rounded-lg flex items-center justify-center`
- Active: `bg-[var(--accent)]/20` (20%, más intenso que el expandido)
- Tooltip con `delayDuration={0}` — aparece instantáneo, sin espera

### 2.4 Sub-navegación (children)

Los sub-ítems se revelan automáticamente cuando `location.pathname.startsWith(item.path)`. No hay toggle manual; la expansión la controla el routing.

```
Parent item
└── [border-l border-zinc-800] [ml-4 pl-4]
     ├── Child item
     ├── Child item
     └── Child item
```

**Especificaciones del sub-ítem:**
- Sin ícono (solo texto)
- `text-sm px-3 py-2 rounded-lg`
- Inactivo: `text-zinc-500`
- Hover: `text-zinc-300 bg-zinc-900`
- Active: `text-[var(--accent)] bg-[var(--accent)]/5` (5% — muy sutil)
- Matching: exact (`location.pathname === child.path`), no startsWith

**Diferencia de matching entre niveles:**
- Parent: `startsWith` → se activa cuando cualquier hijo está activo
- Child: `===` → exact match, solo el hijo exacto

### 2.5 User Area

- Fija al fondo del sidebar, separada por `border-t border-zinc-800/50`
- Expandida: Avatar + nombre + rol + botón logout
- Colapsada: Avatar como botón de logout con tooltip

El logout tiene color de hover `hover:text-rose-400 hover:bg-rose-500/10` — único uso de rojo en todo el sistema. Semánticamente correcto para una acción destructiva.

---

## 3. Header superior

Altura fija `h-16`, sticky, con `backdrop-blur-xl` y `bg-[#09090b]/80` — glassmorphism sutil.

```
Header
 ├── Left
 │    ├── MobileMenuButton (solo mobile)
 │    ├── SidebarToggle (solo desktop)
 │    └── SearchBar (oculto en mobile small)
 └── Right
      ├── NotificationsButton
      ├── Separator vertical
      ├── ThemeIndicator
      └── PlanBadge (oculto en mobile small)
```

### Elementos detallados

**MobileMenuButton:** `lg:hidden` — solo visible cuando el sidebar está oculto en mobile. Abre el drawer.

**SidebarToggle (desktop):** `hidden lg:flex` — controla `isSidebarOpen`. Cambia entre `<X>` y `<Menu>` según el estado. Posicionado en el header, no en el sidebar, lo que es una decisión interesante: el control del sidebar está en el header.

**SearchBar:** `hidden md:flex` — pill con ícono Search + placeholder + atajo de teclado `⌘K`. Es decorativo en la implementación actual (no tiene funcionalidad real), pero comunica affordance de búsqueda.

**NotificationsButton:** botón ghost con `Bell` icon y dot badge (`w-2 h-2 rounded-full bg-[var(--accent)]`) en posición absolute. El dot no tiene contador, solo presencia/ausencia.

**ThemeIndicator:** pill `bg-zinc-900/50 border border-zinc-800/50` con círculo del color accent actual. Comunica el tema activo al usuario. `hidden sm:inline` en el texto.

**PlanBadge:** `hidden sm:flex` — badge tintado en accent con ícono Sparkles. Upsell sutil.

---

## 4. Responsive behavior

### Breakpoint único: `lg` (1024px)

El sistema usa un solo breakpoint de corte. No hay estado "tablet" diferenciado.

| Elemento | < lg (mobile/tablet) | ≥ lg (desktop) |
|---|---|---|
| Sidebar | `fixed`, fuera del flujo, empieza en `-translate-x-full` | `static`, parte del flex row |
| Overlay | `div.fixed.inset-0.bg-black/80` renderizado condicionalmente | no existe |
| Header toggle | `<Menu>` abre el drawer | `<X>/<Menu>` colapsa el sidebar |
| Search | oculto (`hidden md:flex`) | visible |
| Plan badge | oculto (`hidden sm:flex`) | visible |

### Comportamiento del drawer mobile

1. Usuario toca `<Menu>` en el header → `setIsMobileMenuOpen(true)`
2. Sidebar desliza desde la izquierda: `translate-x-0`
3. Overlay negro `bg-black/80` cubre el contenido detrás
4. Al tocar el overlay → `setIsMobileMenuOpen(false)`
5. Al navegar a cualquier ruta → `useEffect` en `location.pathname` → `setIsMobileMenuOpen(false)`

La transición del drawer usa `transition-all duration-300 ease-in-out` en el `<aside>`. No hay librería de animación adicional.

### Cierre automático

```ts
useEffect(() => {
  setIsMobileMenuOpen(false);
}, [location.pathname]);
```

Patrón robusto: responde a cualquier cambio de ruta, sin necesidad de pasar callbacks a componentes hijos.

---

## 5. Interacciones UX

### Jerarquía de interacción en el sidebar

1. **Hover sobre parent item** → background tintado + texto más brillante
2. **Click en parent con children** → navega al path del parent + hijos se revelan automáticamente
3. **Click en child** → exact match → child se marca como activo
4. **Colapsado + hover** → tooltip instantáneo desde la derecha

### Micro-interacciones

**ChevronRight en parent expandible:**
- Inactivo: apunta a la derecha
- Expandido: `rotate-90` (apunta abajo)
- Transición: `duration-200` — sincronizada con la revelación de hijos

**Transición del sidebar colapsado/expandido:**
- Todo el aside: `transition-all duration-300`
- El contenido interno se adapta (iconos se centran, labels desaparecen, logo se simplifica)
- No hay animación de fade en el texto — simplemente desaparece al cambiar de clase

**Logout button:**
- Normal: `text-zinc-500`
- Hover: `text-rose-400 bg-rose-500/10` — color semánticamente distinto (peligro)

### Tooltips

Presentes en tres lugares:
1. Sidebar ítems colapsados (label del item)
2. Logo colapsado ("BLNK Admin")
3. Logout button ("Logout")
4. NotificationsButton ("Notifications")
5. ThemeIndicator ("Current accent color")

Todos usan `delayDuration={0}` o sin configuración. El sistema de tooltips reemplaza el texto visible cuando el sidebar está colapsado.

---

## 6. Sistema visual

### Paleta de colores

El sistema usa una paleta de **solo tres capas cromáticas**:

| Capa | Valor | Uso |
|---|---|---|
| Fondo base | `#0a0a0b` | body del layout |
| Fondo superficie | `#09090b` | sidebar y header |
| Accent | `var(--accent)` | active states, badges, dots, indicadores |
| Zinc scale | zinc-400 a zinc-900 | todo el texto y bordes secundarios |
| Rose | rose-400/500 | solo logout (semántica de peligro) |

El accent es la **única variable de color que cambia** según el tema. Todo lo demás es zinc (escala de grises cálidos-neutros).

### Opacidades del accent

El sistema usa el accent en múltiples opacidades para crear jerarquía sin introducir nuevos colores:

| Opacidad | Uso |
|---|---|
| 5% | child item active background |
| 10% | parent item hover/active background; logo background; search bar; theme pill |
| 20% | parent item active background (colapsado); badge background |
| 100% | texto active; dot notifications; circle theme indicator |

### Bordes

Un solo valor: `border-zinc-800/50` (50% opacity). Crea separación sin peso visual. Usado en:
- border-right del sidebar
- border-bottom del logo area
- border-top del user area
- border-bottom del header

### Glassmorphism

Presente solo en el Header:
- `bg-[#09090b]/80` — 80% opaco
- `backdrop-blur-xl` — desenfoque detrás
- Sticky + z-30

El sidebar no tiene blur (es opaco `bg-[#09090b]`). La diferencia es intencional: el sidebar es estructura permanente, el header es capa flotante.

### Tipografía

| Elemento | Clases |
|---|---|
| Nombre de producto | `text-sm font-bold text-white tracking-tight` |
| Subtítulo de contexto | `text-[10px] text-zinc-500 uppercase tracking-wider` |
| Nav item label | `font-medium text-sm` |
| Section label | `text-xs font-medium text-zinc-600 uppercase tracking-wider` |
| Child item | `text-sm` |
| Search placeholder | `text-sm text-zinc-500` |
| Keyboard shortcut | `text-xs bg-zinc-800 text-zinc-400` |

### Iconografía

100% Lucide React. Tamaños:
- `w-5 h-5`: nav items principales
- `w-4 h-4`: secundarios (logo, chevron, header actions)
- `w-3 h-3`: micro-elementos (badge icon)

---

## 7. Componentes reutilizables identificados

### `SidebarNavItem`
**Responsabilidad:** renderizar un ítem de navegación con sus dos estados (expandido/colapsado) y sus sub-ítems.

**Props:**
- `item: NavItem` — datos del ítem
- `isCollapsed: boolean` — modo icono-only
- `isActive: boolean` — ruta coincide con este ítem

**Dependencias internas:** `useLocation` para calcular `isExpanded` de sub-ítems.

**Nota de diseño:** este componente podría recibir `onNavigate?: () => void` si se necesita comunicar eventos de navegación al padre (ej: cerrar mobile menu), pero en el estado actual ese problema se resuelve con el `useEffect` en el padre.

---

### `AdminLayout`
**Responsabilidad:** shell del admin. Gestiona estado del sidebar, estado del mobile menu, y provee las tres zonas (sidebar, header, main).

**Estado interno:**
- `isSidebarOpen` — toggle desktop
- `isMobileMenuOpen` — toggle mobile

**Efectos:**
- Cierre automático del mobile menu en cambio de ruta

---

### Datos de navegación (`mainNavItems`, `settingsNavItems`)
**Responsabilidad:** configuración declarativa de la estructura de navegación.

**Interfaz `NavItem`:**
```ts
interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  badge?: string;
  children?: { label: string; path: string }[];
}
```

Este es el único lugar donde se define la estructura del árbol de navegación. Cambiar la jerarquía de secciones solo requiere modificar estos arrays.

---

## 8. Integración con React Router

### Matching de rutas activas

```ts
// Parent: startsWith — se activa si cualquier hijo está activo
const isPathActive = (path: string) => {
  if (path === '/admin') return location.pathname === '/admin'; // exact para dashboard
  return location.pathname.startsWith(path);
};

// Child: exact match
const isChildActive = location.pathname === child.path;

// Expansión de submenú: startsWith del parent
const isExpanded = hasChildren && location.pathname.startsWith(item.path);
```

El dashboard (`/admin`) usa exact match para evitar que se marque como activo en todas las rutas del admin (ya que todas empiezan por `/admin`).

### Links

Todos los links de navegación usan `<Link to={...}>` de React Router. No hay `<a href>` en el admin sidebar, garantizando SPA navigation sin recarga.

### Activación automática por URL

No hay estado de "sección activa" guardado en `useState`. El sistema infiere todo desde `location.pathname`. Esto significa:
- Entrar directamente a `/admin/crm/leads` muestra el CRM expandido con Leads activo
- El estado visual siempre es coherente con la URL
- No hay desincronización posible entre navegación y UI

---

## 9. Por qué funciona tan bien — síntesis

El navbar se siente limpio y moderno por una combinación de decisiones consistentes:

1. **Una sola variable de color dinámica.** Todo el acento cromático viene de `var(--accent)`. No hay múltiples colores de marca compitiendo.

2. **Jerarquía por opacidad, no por color.** El mismo accent al 5%, 10%, 20%, 100% crea jerarquía visual sin ruido.

3. **El estado activo lo dice el routing, no el estado.** No hay `selectedItem` en useState. La URL es la fuente de verdad. Esto elimina bugs de desincronización.

4. **Bordes al 50% de opacidad.** Los separadores están presentes pero casi invisibles. No cortan el espacio visualmente.

5. **Dos superficies de fondo, no una.** `#0a0a0b` (body) vs `#09090b` (sidebar/header). La diferencia es de 1-2 puntos en RGB, pero crea profundidad percibida.

6. **El glassmorphism está en el header, no en el sidebar.** El sidebar es estructura, debe sentirse sólido. El header es capa flotante, puede tener blur.

7. **Tooltips como affordance en colapsado.** El sidebar colapsado no pierde funcionalidad — los tooltips reemplazan exactamente el texto que desaparece.

8. **Logout en rojo.** Único elemento con color semántico de peligro. El contraste con el resto del sistema hace que sea inmediatamente reconocible.

---

## 10. Checklist para adaptación al LMS DigiViolin

Al adaptar este patrón al LMS, considerar:

- [ ] Reemplazar el accent único por el color de marca de DigiViolin
- [ ] Redefinir `mainNavItems` con la estructura del LMS (Courses, Students, Progress, etc.)
- [ ] Adaptar el logo area con el branding de DigiViolin
- [ ] Evaluar si se necesita un tercer nivel de navegación (lecciones dentro de cursos)
- [ ] El UserArea puede mostrar datos del instructor/estudiante según el rol
- [ ] El ThemeIndicator del header puede reemplazarse por un indicador de progreso o contexto del LMS
- [ ] El matching de rutas activas funciona igual con cualquier base path
- [ ] La lógica de cierre automático del mobile menu (`useEffect` en `location.pathname`) se reutiliza sin modificación
