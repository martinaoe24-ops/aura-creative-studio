# AURA Creative Studio — Portfolio Web

> Estudio creativo independiente especializado en campañas visuales, e-commerce y publicidad asistida por inteligencia artificial con enfoque editorial.

Este repositorio contiene la web oficial de **AURA Creative Studio**, construida con HTML semántico, CSS moderno y JavaScript modular sin dependencias externas pesadas.

---

## 1. Estructura del Proyecto

```text
aura-creative-studio/
├── index.html                 # Página principal y estructura semántica
├── 404.html                   # Página de error amigable y responsive
├── styles.css                 # Sistema de diseño editorial, variables CSS y responsive
├── script.js                  # Lógica bilingüe (ES/EN), modal interactivo y filtros
├── vercel.json                # Configuración de cabeceras de seguridad y caché en Vercel
├── .gitignore                 # Reglas de exclusión para credenciales y temporales
├── projects/
│   └── projects-data.json     # Base de datos de proyectos, objetivos y entregables
└── public/
    ├── favicon/
    │   └── favicon.svg        # Isotipo vectorial de AURA
    └── images/
        └── projects/          # Visuales vectoriales de cada proyecto
            ├── cyber-monday.svg
            ├── norden-home.svg
            ├── form-objects.svg
            └── social-toolkit.svg
```

---

## 2. Ejecución Local

No requiere frameworks ni compiladores complejos.

### Opción A: Abrir directamente (Offline / Local)
Basta con abrir `index.html` en cualquier navegador moderno (Chrome, Firefox, Safari, Edge).
- *Nota sobre entornos locales*: El proyecto incluye un dataset embebido de respaldo y manejo seguro de almacenamiento local. Si el navegador restringe `fetch()` o `localStorage` bajo el protocolo `file://`, la aplicación conmuta automáticamente al catálogo embebido sin emitir excepciones que interrumpan la interfaz.

### Opción B: Con servidor local (Recomendado para simular producción)
Utilizando Node.js (ya disponible en el entorno):
```bash
npx serve aura-creative-studio
```
o con Python:
```bash
python -m http.server 8000 --directory aura-creative-studio
```
Luego abrir: `http://localhost:8000` (o el puerto indicado).

---

## 3. Guía de Mantenimiento

### Cómo incorporar un nuevo proyecto
1. Colocar las imágenes o visuales del proyecto en `public/images/projects/nombre-del-proyecto.svg` (o `.jpg`/`.png`/`.webp`).
2. Abrir `projects/projects-data.json` y agregar una nueva entrada al array:
   ```json
   {
     "id": "nuevo-proyecto",
     "title": { "es": "Título en Español", "en": "English Title" },
     "category": { "es": "Categoría", "en": "Category" },
     "tagline": { "es": "Resumen breve...", "en": "Brief summary..." },
     "thumbnail": "public/images/projects/nuevo-proyecto.svg",
     "isFictitious": true,
     "year": "2026",
     "objective": { "es": "...", "en": "..." },
     "targetAudience": { "es": "...", "en": "..." },
     "creativeConcept": { "es": "...", "en": "..." },
     "aiTools": ["Midjourney v6", "Photoshop"],
     "deliverables": { "es": ["..."], "en": ["..."] },
     "formats": ["16:9", "9:16"],
     "processDescription": { "es": "...", "en": "..." }
   }
   ```
3. La web detectará y renderizará automáticamente la nueva tarjeta y su caso de estudio en el modal interactivo.

### Configuración del canal de contacto (Estado: Pendiente)
El estado inicial del canal de contacto está configurado como **pendiente** para evitar el uso de correos ficticios o no autorizados.

- **Comportamiento activo actual en `script.js`**:
  ```javascript
  contactConfig: {
    isConfigured: false, // En false por defecto: bloquea envíos a buzones no confirmados
    userEmail: null      // En null: no existe dirección corporativa cargada
  }
  ```
- **Interacción del usuario mientras está pendiente**: Al presionar el botón "Enviar un Correo" (`[data-contact-btn]`), la web intercepta el evento e informa al visitante mediante un diálogo informativo que el correo profesional está en proceso de validación oficial, evitando abrir clientes de correo con destinos inválidos.
- **Cómo habilitar la dirección corporativa definitiva cuando esté confirmada**:
  1. Abrir `script.js` y actualizar las propiedades:
     ```javascript
     contactConfig: {
       isConfigured: true,
       userEmail: "tu-correo-confirmado@tudominio.com"
     }
     ```
  2. Al pasar `isConfigured` a `true` y asignar `userEmail`, el botón activará automáticamente `mailto:tu-correo-confirmado@tudominio.com`.

### Configuración de Metadatos Sociales (Open Graph y Twitter)
Los metadatos Open Graph (`og:image`) y Twitter Card (`twitter:image`) en `index.html` utilizan rutas relativas locales para previsualización.
- Una vez desplegado el sitio y asignado el dominio público definitivo (por ejemplo `https://aura-creative.studio`), reemplace el atributo `content` en las etiquetas correspondientes con la URL absoluta canónica:
  ```html
  <meta property="og:image" content="https://<tu-dominio-publico>/public/images/projects/cyber-monday.svg">
  <meta name="twitter:image" content="https://<tu-dominio-publico>/public/images/projects/cyber-monday.svg">
  ```

### Cómo editar los idiomas
- Todos los textos de la interfaz residen en el diccionario `translations` dentro de `script.js` (`translations.es` y `translations.en`).
- Modificar o añadir claves vinculadas a los atributos `data-i18n` presentes en `index.html`.

---

## 4. Control de Versiones con Git y GitHub

Para subir el proyecto a un repositorio de GitHub:
```bash
cd aura-creative-studio
git init
git add .
git commit -m "feat: initial release of AURA Creative Studio portfolio"
git branch -M main
git remote add origin https://github.com/<tu-usuario>/aura-creative-studio.git
git push -u origin main
```

---

## 5. Despliegue en Vercel

### Despliegue automático vía GitHub (Recomendado)
1. Subir el repositorio a GitHub como se indicó arriba.
2. Ingresar a [Vercel](https://vercel.com/) y pulsar **Add New... -> Project**.
3. Importar el repositorio `aura-creative-studio`.
4. En **Framework Preset**, seleccionar **Other**.
5. Dejar **Build Command** y **Output Directory** vacíos (sitio estático directo).
6. Presionar **Deploy**.

### Despliegue vía Vercel CLI
```bash
npx vercel
```
Seguir las instrucciones en pantalla para vincularlo a tu cuenta de Vercel.

---

## 6. Transparencia y Ética
Los proyectos exhibidos inicialmente (*Cyber Monday — Tech Edit*, *NORDEN HOME*, *FORM — Everyday Objects*, *Social Campaign Toolkit*) son conceptos exploratorios internos (speculative work) para ilustrar capacidades creativas. No representan encargos de clientes ni métricas comerciales inventadas.
