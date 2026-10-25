# Cómo entrar a cada pantalla

Instrucciones navegables, una por pantalla. El router está en `src/App.tsx` y las rutas públicas viven bajo `PublicLayout`; el portal vive under `/portal` con `PortalLayout`.

---

## Home — `/`

- **Por URL directa:** `/` o `https://<host>/`
- **Desde el header:** clic en el logo (vuelve a `/`) o en el enlace "Ver todo el catálogo" si aparece.
- **Desde el buscador del hero:** escribe algo y pulsa "Buscar" → va a `/catalogo?q=<consulta>`. Si el campo está vacío, va solo a `/catalogo`.
- **Desde "Más buscados":** cada chip es un `Link` con su propio `to`.
- **Desde secciones inferiores:** "Compre por ambiente" y "Líneas de producto" enlazan a `/catalogo` o `/catalogo?linea=<id>`.

---

## Catálogo — `/catalogo`

- **Por URL directa:** `/catalogo`
- **Desde Home:** buscador sin texto, chip "Ver todo el catálogo", o los botones de las tarjetas de ambiente.
- **Con filtro de línea:** `/catalogo?linea=<lineId>` (p. ej. `?linea=estanterias`). Se lee en `useCatalogFilters`.
- **Por ámbito:** `/catalogo/<ambiente>` carga el mismo componente (`Catalog`) pero prefila por entorno.
- **Interacciones que cambian la vista sin salir de la pantalla:**
  - Pestaña de ambiente → `Link` a `/catalogo` o `/catalogo/<ambiente>`.
  - Filtros laterales / panel móvil → regeneran `results` localmente, no cambian de ruta.
  - Ordenador → solo cambia `sort`.
  - Cuadro de búsqueda → por ahora se limpia desde el botón "quitar búsqueda"; el filtro de texto vive en el estado local del catalogo.
- **Cuando no hay resultados:** hay un botón "Solicitar fabricación especial" que lleva a `/cotizacion`.

Archivos clave: `src/pages/Catalog.tsx`, `src/components/catalog/useCatalogFilters.ts`, `src/components/catalog/CatalogFilters.tsx`.

---

## Ficha de producto — `/producto/:slug`

- **Por URL directa:** `/producto/<slug>` (p. ej. `/producto/estanteria-media-carga`).
- **Desde el catálogo:** cada `ProductCard` enlaza a esta ruta.
- **Desde "Fichas técnicas":** las filas públicas enlazan a `/producto/<slug>` cuando tienen `productSlug`.
- **Desde productos relacionados:** la sección inferior de `ProductDetail` enlaza a otros slugs de la misma línea.
- **Entrada desde un enlace externo o compartido:** si el slug no existe, la pantalla renderiza `NotFound`.

Dentro de la pantalla hay dos salidas típicas:
- **Añadir estándar a cotización:** añade el item con `defaultConfig` y navega a `/cotizacion`.
- **Configurar:** va a `/configurador/<slug>`.

Archivos clave: `src/pages/ProductDetail.tsx`, `src/data/products.ts`.

---

## Configurador — `/configurador/:slug`

- **Por URL directa:** `/configurador/<slug>`.
- **Desde la ficha de producto:** botón "Configurar".
- **Desde la vista de confirmación de cotización:** enlace "Abrir configurador" en `/cotizacion` (solo como atajo de ejemplo).
- **Comportamiento:** carga el producto por slug; si no existe, va a `NotFound`. Al pulsar "Añadir a cotización" añade el item configurado y hace `navigate('/cotizacion')`.

Archivos clave: `src/pages/Configurator.tsx`, `src/components/configurator/useConfigurator.ts`, `src/components/configurator/OptionStep.tsx`.

---

## Cotización — `/cotizacion`

- **Por URL directa:** `/cotizacion`.
- **Desde Home:** botón "Iniciar cotización".
- **Desde la ficha de producto:** "Añadir estándar a cotización".
- **Desde el configurador:** "Añadir a cotización".
- **Desde el catálogo:** "Solicitar fabricación especial" cuando no hay resultados.
- **Desde la propuesta:** "Volver a la cotización".

Si no hay items, la pantalla muestra CTAs hacia `/catalogo` y `/configurador/locker-inteligente-rfid-6`. Si ya hay items, permite editar cantidad, eliminar, completar datos de empresa y enviar.

Al enviar con éxito, `Quote` renderiza el estado de confirmación y ofrece ir a `/cotizacion/propuesta`.

Archivos clave: `src/pages/Quote.tsx`, `src/components/quote/QuoteForm.tsx`, `src/components/quote/QuoteItemRow.tsx`, `src/components/quote/QuoteTotals.tsx`, `src/contexts/QuoteContext.tsx`.

---

## Propuesta de cotización — `/cotizacion/propuesta`

- **Por URL directa:** `/cotizacion/propuesta`.
- **Desde la confirmación de envío:** botón "Ver propuesta en PDF".
- **Vista previa sin enviar:** si hay items en el contexto pero no se ha enviado, la página muestra un borrador; si no hay items, muestra "No hay una propuesta para mostrar" con enlace a `/catalogo`.

Archivos clave: `src/pages/QuoteProposal.tsx`, `src/components/proposal/ProposalSheet.tsx`.

---

## Fichas técnicas — `/fichas-tecnicas`

- **Por URL directa:** `/fichas-tecnicas`.
- **Desde Home:** enlace "Ver fichas técnicas".
- **Desde la ficha de producto:** enlace "Ver biblioteca".
- **Documentos privados:** si no hay sesión de portal, aparecen como "Solo empleados" y enlazan a `/portal/login`.

Archivos clave: `src/pages/TechnicalSheets.tsx`, `src/data/documents.ts`.

---

## Portal de empleados — `/portal/*`

El acceso base es `/portal`. Si no hay sesión, el flujo normal pasa primero por `/portal/login`.

### Login — `/portal/login`

- **Por URL directa:** `/portal/login`.
- **Desde sitio público:** enlaces "Acceso de empleados" en fichas técnicas y productos.
- **Desde `PortalLayout`:** si no hay usuario, el layout redirige a login.
- **Si ya hay sesión:** `/portal/login` redirige a `/portal`.
- **Demo:** en la propia pantalla hay cuentas de ejemplo que rellenan email/contraseña. Contraseña demostración: `demo1234`.

Archivos clave: `src/pages/portal/PortalLogin.tsx`, `src/contexts/PortalSessionContext.tsx`, `src/data/portalUsers.ts`.

### Resumen del empleado — `/portal`

- **Por URL directa:** `/portal`.
- **Después del login:** es la ruta de entrada por defecto al portal.
- **Contenido:** saludo, crédito de nómina enmascarado, locker asignado y lista de solicitudes recientes. Desde aquí hay accesos a catálogo interno, créditos, locker y aprobaciones.

Archivos clave: `src/pages/portal/PortalOverview.tsx`.

### Catálogo interno — `/portal/catalogo`

- **Por URL directa:** `/portal/catalogo`.
- **Desde `PortalOverview`:** botón "Ver catálogo interno".
- **Función:** tabla con precio público tachado y precio interno. Cada fila tiene botón "Solicitar" que abre un diálogo para registrar una solicitud de producto.

Archivos clave: `src/pages/portal/PortalCatalog.tsx`, `src/components/portal/RequestProductDialog.tsx`.

### Créditos de nómina — `/portal/creditos`

- **Por URL directa:** `/portal/creditos`.
- **Desde `PortalOverview`:** botón "Simular un crédito".
- **Función:** resumen de crédito disponible, lista de créditos activos y simulador de adelanto. Si la simulación cumple la política, hay botón "Solicitar adelanto" que crea una solicitud.

Archivos clave: `src/pages/portal/PortalCredits.tsx`, `src/data/payrollCredits.ts`, `src/utils/credit.ts`.

### Mi locker / gestión de lockers — `/portal/locker`

- **Por URL directa:** `/portal/locker`.
- **Desde `PortalOverview`:** enlace "Ver detalle" o "Gestionar lockers".
- **Según rol:**
  - Empleado: muestra locker asignado, código/UID enmascarado y opciones para solicitar cambio o reportar incidencia. También hay vista del banco con `LockerBank`.
  - Admin: vista de asignación por banco, con selección de locker y acciones de asignar, liberar o enviar a mantenimiento.

Archivos clave: `src/pages/portal/PortalLocker.tsx`, `src/components/portal/LockerBank.tsx`, `src/data/portalUsers.ts`, `src/data/lockers.ts`.

### Mis solicitudes — `/portal/solicitudes`

- **Por URL directa:** `/portal/solicitudes`.
- **Desde `PortalOverview`:** enlace "Ver todas" en la sección de solicitudes recientes.
- **Función:** lista de las solicitudes propias con filtro por estado.

Archivos clave: `src/pages/portal/PortalRequests.tsx`.

### Aprobaciones — `/portal/aprobaciones`

- **Por URL directa:** `/portal/aprobaciones`.
- **Desde `PortalOverview`:** tarjeta emergente de "Tiene X solicitudes del equipo esperando".
- **Restricción:** si el usuario es `empleado`, redirige a `/portal/solicitudes`.
- **Función:** lista de solicitudes de otros empleados pendientes, con botones de aprobar/rechazar.

Archivos clave: `src/pages/portal/PortalRequests.tsx`.

---

## NotFound — `/*`

- **Por URL directa:** cualquier ruta no definida.
- **Comportamiento:** pantalla de no encontrado con enlace a `/catalogo`.

Archivos clave: `src/pages/NotFound.tsx`.

---

## Nota sobre flujo de sesión

Las rutas del portal dependen de `PortalSessionProvider`. Si el usuario no está autenticado:
- `/portal/login` es accesible.
- Las demás rutas `/portal/*` están vacías o redirigidas según el componente (p. ej. `PortalOverview` retorna `null`, `PortalRequests` puede redirigir a `/portal/solicitudes`).

El tema de portal vs. sitio público se decide por la ruta: `/portal*` usa `PortalLayout`, el resto usa `PublicLayout`.

---

Si quieres, puedo convertir esto en un diagrama visual. La opción más sencilla en este proyecto es un diagrama Mermaid puesto en un archivo `.md` o `.mdx` y renderizado por GitHub/GitLab. Si te sirve, te preparo el bloque de código Mermaid ya escrito.
