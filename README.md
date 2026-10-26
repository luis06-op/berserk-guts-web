# Archivo del Espadachín Negro

Wiki temática de **Berserk** maquetada con **Bootstrap 5.3.3** para la actividad
**3.4.2** (interfaz web responsiva). Incluye navegación, catálogo con filtros y
paginación, fichas en modal, cronología de arcos, formulario validado y tabla
comparativa.

## Cómo abrir el proyecto

No hay compilación ni dependencias que instalar:

```bash
# Opción 1: abrir el archivo directamente
xdg-open index.html

# Opción 2 (recomendada): servidor local
python3 -m http.server 8123
# http://127.0.0.1:8123/
```

Bootstrap, los estilos y las imágenes están alojados en el propio proyecto, así
que funciona sin conexión. Solo las tipografías (Cinzel e Inter) se piden a
Google Fonts y, si no hay red, el navegador usa las familias de reserva.

## Estructura

```
.
├── index.html                 Portada, cifras y bloques destacados
├── personajes.html            Catálogo (búsqueda, filtros, paginación, modal, tabla)
├── arcos.html                 Cronología y fichas de arcos en modal
├── sugerencias.html           Formulario validado + preguntas frecuentes
├── assets/
│   ├── css/estilos.css        Tema completo, comentado por secciones
│   ├── js/datos.js            Personajes, facciones y arcos (fuente única)
│   ├── js/comun.js            Navegación, año y animaciones de entrada
│   ├── js/catalogo.js         Filtros, tarjetas, paginación y ficha modal
│   ├── js/arcos.js            Modal de arcos
│   ├── js/formulario.js       Validación, contador y confirmación
│   ├── img/                   Retratos, emblemas, portada y logotipo
│   └── vendor/                Bootstrap 5.3.3 (CSS y bundle JS)
└── tools/generar_arte.py      Genera emblemas, portada y logotipo en SVG
```

Para añadir o corregir un personaje solo hay que editar `assets/js/datos.js`:
las tarjetas, la tabla, los filtros y los modales se actualizan solos.

## Requisitos de la actividad cubiertos

| Requisito | Dónde se ve |
|---|---|
| Sistema de rejilla y responsive | Tarjetas `col-12 col-sm-6 col-lg-4 col-xxl-3`, hero y formularios por columnas |
| Navegación | Barra fija colapsable, migas de pan, índice de arcos y pie con enlaces |
| Formularios de captura | `sugerencias.html`: 8 campos, validación, contador y modal de resumen |
| Tarjetas de contenido | `index.html` y `personajes.html`, con imagen, insignia y estado |
| Modales | Ficha de personaje, ficha de arco y confirmación de envío |
| Otros componentes | Acordeón, alertas, insignias, paginación, tabla responsive, *breadcrumb* |
| HTML5 / CSS3 limpios y comentados | Estructura semántica, CSS organizado en 16 bloques, JS modular en IIFE |
| Accesibilidad y usabilidad | Enlace de salto, etiquetas, `aria-live`, foco visible, contraste, `prefers-reduced-motion` |

## Accesibilidad

- Enlace «Saltar al contenido» y jerarquía de encabezados sin saltos.
- Formularios con `<label>` asociado, ayudas con `aria-describedby` y errores
  anunciados mediante `aria-live`; el foco se mueve al primer campo inválido.
- Modales de Bootstrap con foco atrapado y cierre por teclado.
- Estados y resultados anunciados (`role="status"`), imágenes con texto alternativo
  y decorativas ocultas.
- Áreas táctiles de 40 px o más, foco visible en oro y animaciones desactivadas
  cuando el sistema pide movimiento reducido.
- Verificado con la auditoría manual de contraste y navegación por teclado.

## Créditos y uso

Proyecto **educativo y sin ánimo de lucro**, sin afiliación con los titulares de
la obra.

- *Berserk* es una obra de **Kentaro Miura**, continuada por **Studio Gaga** y
  **Kouji Mori**. Los personajes y sus ilustraciones pertenecen a sus autores y
  se emplean aquí únicamente con fines didácticos.
- Los retratos se obtuvieron de la wiki pública [berserk.fandom.com](https://berserk.fandom.com/)
  y se reescalaron para la web. **No se redistribuyen con licencia libre.**
- Los emblemas de los arcos, la escena de la portada, el logotipo y el favicon son
  ilustraciones vectoriales originales generadas con `tools/generar_arte.py`.
- Bootstrap 5.3.3 se distribuye bajo licencia MIT.
