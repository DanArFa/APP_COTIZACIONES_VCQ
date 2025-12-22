# Arquitectura VCQ - Cliente + Admin

## Resumen General

La aplicación se ha transformado en una plataforma completa con dos portales:
- **Portal Cliente**: Rastreo de pedidos, crear pedidos, ver documentos
- **Portal Admin/Empleado**: Dashboard, cotizaciones, gestión de pedidos, producción, entregas, stock, facturación, catálogos

Se mantiene intacta la funcionalidad del cotizador existente y se reutilizan todos los services actuales.

---

## Estructura de Archivos Nuevos

```
src/
├── context/
│   └── AuthContext.tsx          # Contexto de autenticación con rol
├── hooks/
│   └── useAuth.ts               # Hook para acceder al contexto de auth
├── layouts/
│   ├── LayoutAuth.tsx           # Layout para página de login
│   ├── LayoutCliente.tsx        # Layout con navbar para portal cliente
│   └── LayoutAdmin.tsx          # Layout con sidebar para portal admin
├── pages/
│   ├── LoginPage.tsx            # Página de login
│   ├── cliente/
│   │   ├── ClienteHome.tsx      # Mis pedidos
│   │   ├── ClienteNuevoPedido.tsx
│   │   └── ClienteDocumentos.tsx
│   └── admin/
│       ├── AdminDashboard.tsx
│       ├── AdminCotizaciones.tsx
│       ├── AdminPedidos.tsx
│       ├── AdminProduccion.tsx
│       ├── AdminEntregas.tsx
│       ├── AdminStock.tsx
│       ├── AdminFacturacion.tsx
│       └── AdminCatalogo.tsx
├── components/
│   └── ProtectedRoute.tsx       # Componente para rutas protegidas
└── App.tsx                       # Router principal con BrowserRouter
```

---

## Flujo de Autenticación

1. Usuario ingresa a la app → Redirigido a `/login`
2. LoginView valida credenciales contra tabla `Usuarios` en Supabase
3. Se guarda el usuario en `localStorage` y en contexto `AuthContext`
4. Basado en el rol (`ADMIN` o `VENT`):
   - `ADMIN` → Redirigido a `/app/admin`
   - `VENT` → Redirigido a `/app/cliente`
5. Todas las rutas bajo `/app/` están protegidas por `ProtectedRoute`

---

## Detalle de Roles y Acceso

| Rol      | Rutas Permitidas | Descripción |
|----------|------------------|-------------|
| ADMIN    | `/app/admin/*`   | Acceso completo a dashboard, cotizaciones, gestión operacional |
| VENT     | `/app/cliente/*` | Portal de cliente: ver pedidos, crear pedidos, documentos |

Si un usuario intenta acceder a una ruta no permitida, es redirigido a su home correspondiente.

---

## Páginas y Funcionalidad

### PORTAL CLIENTE (`/app/cliente/`)

#### `ClienteHome` (`/app/cliente`)
- **Estado actual**: Tabla vacía con placeholder
- **Funcionalidad planeada**: Lista de pedidos del cliente con filtros
- **Conexión BD**: TODO - Requiere tabla/endpoint de pedidos asociados al cliente
- **Botones**: "Crear Pedido", "Ver Detalle"

#### `ClienteNuevoPedido` (`/app/cliente/nuevo-pedido`)
- **Estado actual**: Formulario UI completo pero desconectado
- **Campos**: Tipo de vidrio, medidas (alto/ancho), cantidad, dirección entrega, notas
- **Conexión BD**: TODO - Requiere endpoint para guardar pedidos
- **Nota**: Muestra tooltip indicando "Pendiente de conectar"

#### `ClienteDocumentos` (`/app/cliente/documentos`)
- **Estado actual**: Empty state
- **Funcionalidad planeada**: Descargar cotizaciones y PDFs generados
- **Conexión BD**: TODO - Requiere query de cotizaciones asociadas al cliente

---

### PORTAL ADMIN (`/app/admin/`)

#### `AdminDashboard` (`/app/admin`)
- **Estado actual**: KPI cards UI (Pedidos Activos, En Producción, Entregas Hoy, Cotizaciones Mes)
- **Funcionalidad**: Resumen operacional de la empresa
- **Conexión BD**: TODO - Requiere queries para calcular KPIs

#### `AdminCotizaciones` (`/app/admin/cotizaciones`)
- **Estado actual**: FUNCIONAL - Integra el `CotizadorTab` existente
- **Funcionalidad**: Crear y gestionar cotizaciones
- **Conexión BD**: CONECTADA - Usa services existentes:
  - `saveCotizacion()` - Guarda cotización
  - `createRegistroCotizacion()` - Registro en tabla
  - `createHistorialCotizacion()` - Historial
  - `getClientes()` - Carga clientes

#### `AdminPedidos` (`/app/admin/pedidos`)
- **Estado actual**: UI con tabla, búsqueda y filtros
- **Funcionalidad planeada**: CRUD de pedidos, cambio de estatus
- **Conexión BD**: TODO - Requiere tabla/endpoint de pedidos

#### `AdminProduccion` (`/app/admin/produccion`)
- **Estado actual**: Placeholder Kanban
- **Funcionalidad planeada**: Tablero visual de etapas de producción
- **Conexión BD**: TODO - Requiere tabla de procesos/etapas

#### `AdminEntregas` (`/app/admin/entregas`)
- **Estado actual**: Placeholder
- **Funcionalidad planeada**: Gestión de entregas y logística
- **Conexión BD**: TODO - Requiere tabla de entregas

#### `AdminStock` (`/app/admin/stock`)
- **Estado actual**: Placeholder
- **Funcionalidad planeada**: Inventario y disponibilidad de productos
- **Conexión BD**: TODO - Requiere tabla de stock/inventario

#### `AdminFacturacion` (`/app/admin/facturacion`)
- **Estado actual**: Placeholder
- **Funcionalidad planeada**: Registro de facturas e ingresos
- **Conexión BD**: TODO - Requiere tabla de facturas

#### `AdminCatalogo` (`/app/admin/catalogo`)
- **Estado actual**: FUNCIONAL - Integra tabs existentes
- **Funcionalidad**: Gestión de datos maestros
- **Componentes incluidos**:
  - `ClientesTab` (CONECTADA) - Clientes
  - `UsuariosTab` (CONECTADA) - Usuarios
  - `PreciosTab` (CONECTADA) - Precios

---

## Base de Datos - Sin Cambios

❌ **NO se modificó el schema de Supabase**

Se reutilizan las tablas existentes:
- `Usuarios` - Para autenticación y gestión de usuarios
- `Clientes` - Para datos de clientes
- `Precios` - Para catálogo de precios
- `Procesos` - Para procesos de producción
- `Cotizaciones` - Para cotizaciones (conectada en AdminCotizaciones)
- `RegistroCotizaciones` - Para historial
- `HistorialCotizaciones` - Para auditoria

Services reutilizados sin modificación:
- `usuairos.ts` - Login y gestión de usuarios ✅
- `clientes.ts` - Operaciones con clientes ✅
- `precios.ts` - Operaciones con precios ✅
- `procesos.ts` - Información de procesos ✅
- `cotizaciones.ts` - Guardar cotizaciones ✅
- `registro.ts` - Registrar cotizaciones ✅
- `historial.ts` - Crear historial ✅

---

## Components Reutilizados

Sin modificaciones, se utilizan directamente en las nuevas páginas:
- `LoginView` → `LoginPage`
- `CotizadorTab` → `AdminCotizaciones`
- `ClientesTab` → `AdminCatalogo`
- `UsuariosTab` → `AdminCatalogo`
- `PreciosTab` → `AdminCatalogo`
- `ProcesosTab` - (No utilizado en nuevo routing, pero disponible)
- `HistorialTab` - (No utilizado en nuevo routing, pero disponible)
- `RegistroTab` - (No utilizado en nuevo routing, pero disponible)

---

## Próximos Pasos - TODOs Técnicos

### Alta Prioridad
1. **Endpoint de Pedidos**: Crear tabla y CRUD para pedidos
2. **Conectar Pedidos en Cliente**: Modificar `ClienteHome` para cargar datos
3. **Conectar Pedidos en Admin**: Modificar `AdminPedidos` para CRUD

### Mediana Prioridad
4. Implementar rastreo de estatus en detalle de pedido
5. Conectar KPIs en Dashboard
6. Implementar tablero Kanban en Producción
7. Gestión de entregas y stock

### Baja Prioridad
8. Optimización de performance
9. Reportes y analytics
10. Exportación de datos

---

## Testing Rápido

Para verificar el flow completo:

1. **Login**: Usar credenciales existentes en tabla `Usuarios`
   - Usuario con ROL='ADMIN' → Va a `/app/admin`
   - Usuario con ROL='VENT' → Va a `/app/cliente`

2. **Cotizador**: Sigue funcionando igual en `/app/admin/cotizaciones`

3. **Catálogos**: Accesible en `/app/admin/catalogo` con tabs de Clientes, Usuarios, Precios

4. **Portal Cliente**: Navegación funcional, pendiente de datos reales

---

## Notas Importantes

- ✅ **Zero Breaking Changes**: Todo lo anterior funciona igual
- ✅ **SPA Completa**: Un solo punto de entrada, routing por React Router
- ✅ **Responsive**: Layouts adaptables a mobile/tablet/desktop
- ✅ **Seguridad**: Rutas protegidas por rol en frontend (backend debe validar también)
- ⚠️ **Auth: Solo Frontend**: La protección de rutas es frontend. El backend debe validar permisos.

---

## Variables de Entorno

Usar las existentes en `.env`:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

---

Última actualización: 2025-12-22
