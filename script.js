/**
 * AURA CREATIVE STUDIO - Core Application Logic
 * Supports: Bilinguality (ES/EN), Accessible Modals, Portfolio Filtering, Keyboard Nav
 */

// Safe Storage Helper (Handles local file:// or browser storage restrictions)
function getSavedLanguage() {
  try {
    return localStorage.getItem('aura_lang') || 'es';
  } catch (e) {
    return 'es';
  }
}

function saveLanguage(lang) {
  try {
    localStorage.setItem('aura_lang', lang);
  } catch (e) {
    // Graceful fallback if localStorage is unavailable
  }
}

// Application State
const appState = {
  lang: getSavedLanguage(),
  projects: [],
  activeFilter: 'all',
  activeProjectModal: null,
  previousActiveElement: null,
  // Contact email configuration - clearly marked pending
  contactConfig: {
    isConfigured: false, // Set to true only when a confirmed corporate email is provided
    userEmail: null      // Set to string "official@aura-creativestudio.com" when available
  }
};

// UI Translations Dictionary
const translations = {
  es: {
    meta_title: "AURA Creative Studio — Diseño Editorial & Contenido con IA",
    meta_desc: "Estudio creativo independiente especializado en campañas visuales, e-commerce y publicidad asistida por IA.",
    skip_link: "Saltar al contenido principal",
    nav_home: "Inicio",
    nav_portfolio: "Portfolio",
    nav_studio: "Estudio",
    nav_services: "Servicios",
    nav_contact: "Contacto",
    brand_sub: "Estudio Creativo & IA",
    hero_badge: "Estudio de Dirección Creativa & IA",
    hero_title: "Diseño editorial y conceptos visuales impulsados por <em>inteligencia artificial</em>.",
    hero_desc: "AURA es un estudio creativo independiente que fusiona la dirección de arte contemporánea con flujos generativos avanzados para marcas de producto, moda y tecnología.",
    hero_cta_projects: "Explorar Portfolio",
    hero_cta_contact: "Iniciar Conversación",
    stat_col1_label: "Enfoque",
    stat_col1_val: "Dirección de arte artesanal potenciada con pipelines generativos",
    stat_col2_label: "Especialidad",
    stat_col2_val: "Campañas de producto, e-commerce y visuales multiformato",
    stat_col3_label: "Compromiso",
    stat_col3_val: "Transparencia editorial y conceptos técnicos verificables",
    portfolio_meta: "Archivo de Proyectos Seleccionados",
    portfolio_title: "Campañas & Casos de Estudio",
    portfolio_desc: "Una selección de conceptos publicitarios y piezas de arte generativo desarrolladas bajo una rigurosa dirección de arte.",
    filter_all: "Todos",
    filter_product: "Producto",
    filter_editorial: "Editorial",
    filter_industrial: "Diseño & Forma",
    filter_social: "Publicidad & Social",
    fictitious_badge: "CONCEPTO FICTICIO / SPEC WORK",
    view_case_study: "Ver Caso de Estudio",
    modal_title_prefix: "Caso de Estudio",
    modal_spec_objective: "Objetivo del Proyecto",
    modal_spec_target: "Público Objetivo",
    modal_spec_concept: "Concepto Creativo",
    modal_spec_tools: "Herramientas & Pipeline IA",
    modal_spec_formats: "Formatos & Entregables",
    modal_process_title: "Proceso & Metodología Técnica",
    modal_fictitious_note: "Aviso de Transparencia: Este proyecto es un concepto de muestra diseñado internamente por el estudio para demostrar capacidades técnicas y estéticas. No constituye una relación comercial real ni un encargo de marca.",
    modal_close_aria: "Cerrar ventana de detalles",
    studio_meta: "Manifiesto & Visión",
    studio_title: "La inteligencia artificial como pincel, la dirección de arte como guía.",
    studio_p1: "En <strong>AURA Creative Studio</strong> no creemos en la generación masiva e indiscriminada de imágenes. Creemos en la <strong>curaduría meticulosa</strong>, en el balance de los espacios en blanco y en el dominio exhaustivo de las herramientas sintéticas modernas.",
    studio_p2: "Nuestro proceso integra modelos de difusión de última generación (Midjourney, ComfyUI, ControlNet) con técnicas clásicas de diseño gráfico editorial, calibración cromática y composición tipográfica.",
    studio_card1_num: "01 / PRECISIÓN",
    studio_card1_title: "Control Absoluto del Layout",
    studio_card1_desc: "Usamos esquemas de profundidad y mapas estructurales para garantizar que la IA respete la geometría de producto y las zonas seguras de marca.",
    studio_card2_num: "02 / TRANSPARENCIA",
    studio_card2_title: "Ética & Honestidad Conceptual",
    studio_card2_desc: "Distinguimos con claridad qué es un concepto de exploración y qué es un activo final, sin inventar resultados comerciales ni datos engañosos.",
    studio_card3_num: "03 / EFICIENCIA",
    studio_card3_title: "Velocidad sin Perder Oficio",
    studio_card3_desc: "Reducimos semanas de producción fotográfica a días de exploración ágil, manteniendo una calidad visual digna de publicaciones impresas.",
    services_meta: "Áreas de Práctica",
    services_title: "Servicios Creativos de Vanguardia",
    services_desc: "Diseñamos soluciones visuales a medida para marcas que buscan destacar con una narrativa visual contemporánea.",
    srv1_title: "Campañas Publicitarias",
    srv1_desc: "Dirección de arte integral y conceptos visuales para lanzamientos de temporada, vía pública y activaciones digitales.",
    srv2_title: "Anuncios E-Commerce",
    srv2_desc: "Bodegones sintéticos de alta fidelidad, fichas de producto aspiracionales y assets optimizados para conversión.",
    srv3_title: "Social Creative Toolkit",
    srv3_desc: "Sistemas modulares multiformato (9:16, 4:5, 1:1) diseñados para campañas de rendimiento y presencia en redes.",
    srv4_title: "Conceptos Visuales con IA",
    srv4_desc: "Exploración de empaques, visualización de materiales imposibles y renderizado rápido de ideas de producto preliminares.",
    contact_eyebrow: "Conexión Directa",
    contact_title: "¿Tenés un proyecto o campaña en mente?",
    contact_desc: "Hablemos sobre cómo la dirección de arte con inteligencia artificial puede elevar la presencia visual de tu marca.",
    contact_btn_email: "Enviar un Correo",
    contact_pending_badge: "Configuración de contacto: Email profesional pendiente de confirmación por el titular.",
    footer_tagline: "Estudio independiente de diseño editorial, dirección creativa y publicidad sintética.",
    footer_col_nav: "Navegación",
    footer_col_legal: "Transparencia",
    footer_legal_spec: "Todos los proyectos exhibidos en esta edición inicial son conceptos artísticos ficticios (speculative design).",
    footer_legal_copy: "© 2026 AURA Creative Studio. Todos los derechos reservados.",
    footer_back_to_top: "Volver arriba ↑"
  },
  en: {
    meta_title: "AURA Creative Studio — Editorial Design & AI Advertising",
    meta_desc: "Independent creative studio specializing in visual campaigns, e-commerce, and AI-assisted advertising.",
    skip_link: "Skip to main content",
    nav_home: "Home",
    nav_portfolio: "Portfolio",
    nav_studio: "Studio",
    nav_services: "Services",
    nav_contact: "Contact",
    brand_sub: "Creative Studio & AI",
    hero_badge: "Creative Direction & AI Studio",
    hero_title: "Editorial design and visual concepts driven by <em>artificial intelligence</em>.",
    hero_desc: "AURA is an independent creative studio merging contemporary art direction with advanced generative pipelines for product, fashion, and tech brands.",
    hero_cta_projects: "Explore Portfolio",
    hero_cta_contact: "Start a Conversation",
    stat_col1_label: "Approach",
    stat_col1_val: "Bespoke art direction supercharged with generative pipelines",
    stat_col2_label: "Specialty",
    stat_col2_val: "Product campaigns, premium e-commerce, and multi-ratio visuals",
    stat_col3_label: "Commitment",
    stat_col3_val: "Editorial transparency and fully verifiable technical concepts",
    portfolio_meta: "Selected Works Archive",
    portfolio_title: "Campaigns & Case Studies",
    portfolio_desc: "A curated collection of advertising concepts and generative art pieces crafted under meticulous art direction.",
    filter_all: "All",
    filter_product: "Product",
    filter_editorial: "Editorial",
    filter_industrial: "Design & Form",
    filter_social: "Advertising & Social",
    fictitious_badge: "FICTITIOUS CONCEPT / SPEC WORK",
    view_case_study: "View Case Study",
    modal_title_prefix: "Case Study",
    modal_spec_objective: "Project Objective",
    modal_spec_target: "Target Audience",
    modal_spec_concept: "Creative Concept",
    modal_spec_tools: "Tools & AI Pipeline",
    modal_spec_formats: "Formats & Deliverables",
    modal_process_title: "Process & Technical Methodology",
    modal_fictitious_note: "Transparency Notice: This project is an internal studio concept crafted to demonstrate aesthetic and technical capabilities. It does not represent a commercial collaboration or real client commission.",
    modal_close_aria: "Close case study modal",
    studio_meta: "Manifesto & Vision",
    studio_title: "Artificial intelligence as the brush, art direction as the guide.",
    studio_p1: "At <strong>AURA Creative Studio</strong>, we do not believe in indiscriminate, high-volume image churning. We champion <strong>rigorous curation</strong>, balanced negative space, and complete mastery over modern synthetic tools.",
    studio_p2: "Our workflow unifies leading diffusion models (Midjourney, ComfyUI, ControlNet) with traditional editorial graphic design, chromatic balancing, and typographic poise.",
    studio_card1_num: "01 / PRECISION",
    studio_card1_title: "Absolute Layout Control",
    studio_card1_desc: "We utilize depth maps and structural conditioning to ensure AI outputs respect product anatomy and brand safe zones.",
    studio_card2_num: "02 / TRANSPARENCY",
    studio_card2_title: "Ethical & Conceptual Honesty",
    studio_card2_desc: "We strictly distinguish speculative exploration from production assets, never fabricating metrics or client endorsements.",
    studio_card3_num: "03 / VELOCITY",
    studio_card3_title: "Pace without Compromising Craft",
    studio_card3_desc: "We condense weeks of traditional photo production into agile exploratory cycles, producing print-grade visual refinement.",
    services_meta: "Capabilities",
    services_title: "Pioneering Creative Services",
    services_desc: "Tailored visual solutions for ambitious brands seeking a distinctive contemporary visual signature.",
    srv1_title: "Advertising Campaigns",
    srv1_desc: "Comprehensive art direction and key visuals for seasonal rollouts, billboards, and high-impact digital activations.",
    srv2_title: "E-Commerce Visuals",
    srv2_desc: "High-fidelity synthetic still lifes, aspirational product environments, and conversion-optimized hero imagery.",
    srv3_title: "Social Creative Toolkit",
    srv3_desc: "Modular multi-format systems (9:16, 4:5, 1:1) engineered for high-velocity social campaigns and performance marketing.",
    srv4_title: "AI Visual Concepts",
    srv4_desc: "Packaging exploration, impossible tactile material prototyping, and rapid rendering of early product ideas.",
    contact_eyebrow: "Direct Connection",
    contact_title: "Have a project or campaign in mind?",
    contact_desc: "Let's explore how AI-augmented art direction can elevate your brand's visual identity and market presence.",
    contact_btn_email: "Send an Email",
    contact_pending_badge: "Contact setting: Professional email pending confirmation by the studio owner.",
    footer_tagline: "Independent editorial design, creative direction, and synthetic advertising studio.",
    footer_col_nav: "Navigation",
    footer_col_legal: "Transparency",
    footer_legal_spec: "All showcase projects presented in this launch edition are fictitious artistic concepts (speculative design).",
    footer_legal_copy: "© 2026 AURA Creative Studio. All rights reserved.",
    footer_back_to_top: "Back to top ↑"
  }
};

// Raw Projects Data Backup (Embedded to guarantee 100% offline & local file:// support without CORS blocks)
const fallbackProjects = [
  {
    "id": "cyber-monday",
    "title": { "es": "Cyber Monday — Tech Edit", "en": "Cyber Monday — Tech Edit" },
    "category": { "es": "Campaña de Producto", "en": "Product Campaign" },
    "categoryKey": "product",
    "tagline": {
      "es": "Campaña visual de alto impacto para retail tecnológico y pantallas 3D.",
      "en": "High-impact visual campaign for premium consumer tech and 3D billboards."
    },
    "thumbnail": "public/images/projects/cyber-monday.svg",
    "isFictitious": true,
    "year": "2026",
    "objective": {
      "es": "Explorar un lenguaje visual futurista y sofisticado para promociones tecnológicas de temporada alta, alejándose de los clichés de rebajas estridentes hacia un editorial premium.",
      "en": "Explore a futuristic, sophisticated visual tone for peak-season tech retail, shifting away from aggressive sales tropes into high-end editorial clarity."
    },
    "targetAudience": {
      "es": "Consumidores de tecnología de vanguardia, entusiastas del diseño industrial y compradores de e-commerce de gama alta.",
      "en": "Early adopters of cutting-edge tech, industrial design enthusiasts, and discerning e-commerce shoppers."
    },
    "creativeConcept": {
      "es": "Geometría lumínica precisa, contrastes profundos y texturas metálicas táctiles que transmiten precisión de ingeniería y exclusividad.",
      "en": "Precise light architecture, deep obsidian contrasts, and tactile metallic textures evoking engineering precision and exclusivity."
    },
    "aiTools": [
      "Midjourney v6",
      "ComfyUI (custom workflow)",
      "Magnific AI Upscale",
      "Adobe Photoshop (retouch & comp)"
    ],
    "deliverables": {
      "es": [
        "Key visual master en alta resolución para vía pública",
        "Animaciones dinámicas en bucle para pantallas digitales OOH",
        "Banners adaptativos para cabeceras de e-commerce",
        "Set de creatividades multiformato para performance marketing"
      ],
      "en": [
        "High-res key visual master for digital out-of-home",
        "Seamless motion loops for 3D outdoor displays",
        "Adaptive hero banners for e-commerce storefronts",
        "Multi-ratio creative asset suite for performance marketing"
      ]
    },
    "formats": [
      "16:9 4K Digital OOH",
      "9:16 Mobile Stories",
      "1:1 Feed Ads",
      "Omnichannel Web Banners"
    ],
    "processDescription": {
      "es": "El proceso comenzó con la definición de un sistema de prompts orientado a iluminación volumétrica controlada y renderizado de materiales hápticos. A través de ComfyUI se estabilizó la coherencia de iluminación y reflejos en diferentes dispositivos conceptuales. Las piezas resultantes pasaron por un pipeline de corrección cromática manual, retoque tipográfico y escalado de ultra alta definición.",
      "en": "The workflow began with custom prompt engineering calibrated for controlled volumetric lighting and tactile material rendering. ComfyUI was employed to enforce reflection and lighting consistency across conceptual tech products. Raw generations then underwent manual color correction, editorial typographic styling, and ultra-high-definition upscaling."
    },
    "gallery": [
      {
        "src": "public/images/projects/cyber-monday.svg",
        "caption": {
          "es": "Composición principal — Hero editorial Cyber Monday",
          "en": "Primary composition — Cyber Monday Editorial Hero"
        }
      }
    ]
  },
  {
    "id": "norden-home",
    "title": { "es": "NORDEN HOME — Campaña de Temporada", "en": "NORDEN HOME — Seasonal Campaign" },
    "category": { "es": "Editorial & Espacios", "en": "Editorial & Interiors" },
    "categoryKey": "editorial",
    "tagline": {
      "es": "Atmósferas cálidas y minimalistas para mobiliario nórdico contemporáneo.",
      "en": "Warm, minimalist atmospheres for contemporary Nordic interior living."
    },
    "thumbnail": "public/images/projects/norden-home.svg",
    "isFictitious": true,
    "year": "2026",
    "objective": {
      "es": "Diseñar una serie de bodegones y espacios residenciales generados sintéticamente que transmitan serenidad, luz natural envolvente y tactilidad orgánica sin requerir sesiones fotográficas en locaciones complejas.",
      "en": "Craft a suite of synthetically rendered still lifes and residential environments conveying serenity, natural warm light, and organic tactility without extensive on-location photo shoots."
    },
    "targetAudience": {
      "es": "Entusiastas del diseño de interiores contemporáneo, arquitectura residencial y decoración minimalista.",
      "en": "Enthusiasts of contemporary interior design, residential architecture, and warm minimalism."
    },
    "creativeConcept": {
      "es": "La interacción entre la arquitectura austera de hormigón/arcilla y la suave incidencia de la luz solar natural matutina.",
      "en": "The delicate dialogue between raw limestone/clay architecture and soft morning sun rays."
    },
    "aiTools": [
      "Midjourney v6.1",
      "Custom LoRA para texturas de cerámica y lino",
      "ControlNet Depth",
      "Lightroom CC"
    ],
    "deliverables": {
      "es": [
        "Catálogo editorial impreso (lookbook digital de 40 páginas)",
        "Fotografías de ambiente para fichas de producto de tienda online",
        "Micro-videos de movimiento de luz para pauta en redes sociales",
        "Plantillas de diseño para newsletters de marca"
      ],
      "en": [
        "Editorial print lookbook (40-page digital catalog)",
        "Atmospheric room-set photography for product PDP pages",
        "Ambient light motion reels for social channels",
        "Curated brand newsletter layout kit"
      ]
    },
    "formats": [
      "Lookbook Editorial (A4 Vertical)",
      "4:5 Instagram Feed",
      "16:9 Web Fullscreen Hero",
      "Fichas de producto 1:1"
    ],
    "processDescription": {
      "es": "Se entrenaron adaptadores LoRA ligeros con muestras de cerámica artesanal mate y textiles de lino crudo. Mediante ControlNet se guiaron las composiciones arquitectónicas para preservar proporciones y perspectivas puras. Cada imagen fue afinada en gradación de color para asegurar calidez térmica consistente en toda la serie.",
      "en": "Custom lightweight LoRA adapters were trained on raw linen textiles and matte ceramic glazes. ControlNet guided the architectural perspective to maintain immaculate proportions. The resulting series was unified in Lightroom with a bespoke warm neutral grading."
    },
    "gallery": [
      {
        "src": "public/images/projects/norden-home.svg",
        "caption": {
          "es": "Bodegón de cerámica escandinava y sombras de ventana natural",
          "en": "Scandinavian ceramic still life with natural sunlight shadows"
        }
      }
    ]
  },
  {
    "id": "form-objects",
    "title": { "es": "FORM — Everyday Objects", "en": "FORM — Everyday Objects" },
    "category": { "es": "Diseño Industrial & Conceptos", "en": "Industrial Design & Concepts" },
    "categoryKey": "industrial",
    "tagline": {
      "es": "Estudio escultórico sobre objetos cotidianos reinterpretados mediante IA.",
      "en": "Sculptural exploration reinterpreting mundane objects through procedural AI."
    },
    "thumbnail": "public/images/projects/form-objects.svg",
    "isFictitious": true,
    "year": "2026",
    "objective": {
      "es": "Desafiar la percepción estética de los objetos utilitarios habituales convirtiéndolos en piezas escultóricas dignas de galería de arte.",
      "en": "Challenge the aesthetic perception of functional objects by reimagining them as gallery-worthy sculptural artifacts."
    },
    "targetAudience": {
      "es": "Estudios de diseño, directores de arte, marcas de bienes de consumo premium y comisarios de arte digital.",
      "en": "Design studios, art directors, luxury consumer goods brands, and digital art curators."
    },
    "creativeConcept": {
      "es": "Tensión material entre lo translúcido (vidrio con cáusticas), lo opaco (piedra basáltica mate) y el pulido reflectante (latón cepillado).",
      "en": "Material tension between refractive glass, matte basalt stone, and brushed architectural brass."
    },
    "aiTools": [
      "Stable Diffusion XL",
      "Blender (cámaras de referencia & blocking)",
      "Photoshop Neural Filters",
      "Krea AI Real-time"
    ],
    "deliverables": {
      "es": [
        "Serie de 12 láminas de arte conceptual",
        "Piezas audiovisuales con rotación espacial en 360 grados",
        "Kit de texturas y materiales para prototipado 3D",
        "Monografía digital del estudio"
      ],
      "en": [
        "Series of 12 conceptual fine-art prints",
        "360-degree spatial turnarounds",
        "PBR texture and material kits for 3D prototyping",
        "Digital studio monograph"
      ]
    },
    "formats": [
      "Print Fine Art (50x70cm 300dpi)",
      "4K Video Spatial Loops",
      "Digital Interactive Viewer"
    ],
    "processDescription": {
      "es": "A partir de modelos 3D volumétricos muy simples elaborados en Blender, se proyectó el renderizado generativo utilizando modelos de difusión condicionados. Esto permitió un control riguroso de la silueta y la física de refracción óptica, logrando un realismo tangible que trasciende la generación de imágenes estándar.",
      "en": "Starting from primitive volumetric 3D block-outs in Blender, diffusion models were conditioned to generate rich material textures and complex caustics. This hybrid method combined total spatial geometry control with the nuanced aesthetic richness of generative neural synthesis."
    },
    "gallery": [
      {
        "src": "public/images/projects/form-objects.svg",
        "caption": {
          "es": "Composición de tensión geométrica en vidrio soplado y piedra negra",
          "en": "Geometric tension composition in blown glass and black volcanic stone"
        }
      }
    ]
  },
  {
    "id": "social-toolkit",
    "title": { "es": "Social Campaign Toolkit", "en": "Social Campaign Toolkit" },
    "category": { "es": "Publicidad & Social", "en": "Advertising & Social" },
    "categoryKey": "social",
    "tagline": {
      "es": "Sistema modular de creatividades de alto rendimiento para marcas ágiles.",
      "en": "Modular high-performance creative system for fast-moving brands."
    },
    "thumbnail": "public/images/projects/social-toolkit.svg",
    "isFictitious": true,
    "year": "2026",
    "objective": {
      "es": "Crear una arquitectura visual modular que permita a las marcas generar decenas de variaciones creativas para pauta publicitaria en cuestión de horas, sin perder coherencia editorial ni calidad artesanal.",
      "en": "Design a modular visual architecture enabling brands to roll out dozens of paid ad variations within hours, maintaining uncompromising craft and editorial rigor."
    },
    "targetAudience": {
      "es": "Directores de marketing, marcas de venta directa (DTC) y agencias de performance publicitario.",
      "en": "CMOs, direct-to-consumer (DTC) brands, and high-growth performance media agencies."
    },
    "creativeConcept": {
      "es": "Contraste dinámico entre paletas oscuras de alta legibilidad y toques de verde lima fluorescente con composiciones tipográficas enérgicas.",
      "en": "Dynamic friction between deep legible dark surfaces and fluorescent acid lime accents with bold kinetic typography."
    },
    "aiTools": [
      "Midjourney v6",
      "Runway Gen-3 Alpha",
      "Figma Component Auto-layout",
      "After Effects Essential Graphics"
    ],
    "deliverables": {
      "es": [
        "Sistema de diseño en Figma con más de 60 variantes de layout",
        "Plantillas de video de 6s, 15s y 30s con apertura de alto impacto",
        "Guía de estilo y manual de generación de prompts para el cliente",
        "Banco de 100 imágenes sintéticas segmentadas por emoción y producto"
      ],
      "en": [
        "Figma design system featuring 60+ modular layout variants",
        "Motion templates (6s, 15s, 30s) engineered for high retention",
        "Brand prompt engineering manual for client creative teams",
        "Curated bank of 100 synthetic imagery assets categorized by tone"
      ]
    },
    "formats": [
      "9:16 Instagram Stories & TikTok",
      "4:5 Meta Feed",
      "1:1 Carousels",
      "16:9 YouTube Bumper Ads"
    ],
    "processDescription": {
      "es": "El proyecto resolvió el cuello de botella habitual de la producción publicitaria combinando generación sintética de fondos y objetos con componentes vectoriales y tipográficos pre-ensamblados. Se probaron combinaciones de ratios asegurando que las zonas seguras de las plataformas se respetaran escrupulosamente.",
      "en": "This project addressed the standard creative production bottleneck by pairing synthetic visual assets with strictly formatted vector typographic frameworks. Multi-ratio safe zones across TikTok, Meta and YouTube were programmatically accounted for."
    },
    "gallery": [
      {
        "src": "public/images/projects/social-toolkit.svg",
        "caption": {
          "es": "Sistema de componentes modulares y visualización multi-ratio",
          "en": "Modular component framework and multi-ratio ad mockups"
        }
      }
    ]
  }
];

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initProjectsData();
  setupNavigation();
  setupContactConfig();
  setupModalKeyboardHandling();
});

// Setup Contact link and clearly display pending status
function setupContactConfig() {
  const contactButtons = document.querySelectorAll('[data-contact-btn]');

  contactButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (appState.contactConfig.isConfigured && appState.contactConfig.userEmail) {
        window.location.href = `mailto:${appState.contactConfig.userEmail}`;
      } else {
        e.preventDefault();
        const pendingMsg = appState.lang === 'es'
          ? "El canal de correo oficial de AURA Creative Studio se encuentra en configuración pendiente hasta la confirmación de la dirección corporativa definitiva del estudio. Envíe sus requerimientos preliminares a través de los canales directos habilitados."
          : "The official email channel for AURA Creative Studio is currently pending final corporate address configuration. Please connect through authorized direct channels in the interim.";
        alert(pendingMsg);
      }
    });
  });
}

// Language Handling
function initLanguage() {
  const langButtons = document.querySelectorAll('[data-set-lang]');
  
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.getAttribute('data-set-lang');
      setLanguage(selectedLang);
    });
  });

  applyLanguage(appState.lang);
}

function setLanguage(lang) {
  if (lang !== 'es' && lang !== 'en') return;
  appState.lang = lang;
  saveLanguage(lang);
  applyLanguage(lang);
  renderProjects();
  if (appState.activeProjectModal) {
    renderProjectModal(appState.activeProjectModal);
  }
}

function applyLanguage(lang) {
  document.documentElement.lang = lang;
  
  // Update toggle buttons active class
  document.querySelectorAll('[data-set-lang]').forEach(btn => {
    if (btn.getAttribute('data-set-lang') === lang) {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    }
  });

  // Update text nodes with data-i18n
  const dict = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  // Update page title & meta
  if (dict.meta_title) document.title = dict.meta_title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && dict.meta_desc) {
    metaDesc.setAttribute('content', dict.meta_desc);
  }
}

// Load Projects Data
async function initProjectsData() {
  try {
    const response = await fetch('projects/projects-data.json');
    if (response.ok) {
      const data = await response.json();
      // Ensure categoryKey is present
      appState.projects = data.map((item, idx) => ({
        ...item,
        categoryKey: fallbackProjects[idx]?.categoryKey || 'product'
      }));
    } else {
      appState.projects = fallbackProjects;
    }
  } catch (err) {
    // Graceful fallback for file:// protocol or restricted environments
    appState.projects = fallbackProjects;
  }
  
  setupFilters();
  renderProjects();
}

// Portfolio Filtering Setup
function setupFilters() {
  const filterButtons = document.querySelectorAll('[data-filter]');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      appState.activeFilter = btn.getAttribute('data-filter');
      renderProjects();
    });
  });
}

// Render Projects Cards
function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  const countIndicator = document.getElementById('projectCount');
  if (!grid) return;

  const filtered = appState.projects.filter(p => {
    if (appState.activeFilter === 'all') return true;
    return p.categoryKey === appState.activeFilter;
  });

  if (countIndicator) {
    const total = filtered.length;
    countIndicator.textContent = appState.lang === 'es' ? `[ ${total} PROYECTOS ]` : `[ ${total} PROJECTS ]`;
  }

  grid.innerHTML = '';

  filtered.forEach(project => {
    const title = project.title[appState.lang] || project.title.es;
    const category = project.category[appState.lang] || project.category.es;
    const tagline = project.tagline[appState.lang] || project.tagline.es;
    const viewText = translations[appState.lang].view_case_study;
    const badgeText = translations[appState.lang].fictitious_badge;

    const card = document.createElement('article');
    card.className = 'project-card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `${title} - ${viewText}`);

    card.innerHTML = `
      <div class="project-card-media">
        <img src="${project.thumbnail}" alt="${title} preview" loading="lazy" width="600" height="394" />
        <span class="fictitious-pill">${badgeText}</span>
      </div>
      <div class="project-card-body">
        <div class="project-card-meta">
          <span>${category}</span>
          <span>${project.year}</span>
        </div>
        <h3 class="project-card-title">${title}</h3>
        <p class="project-card-desc">${tagline}</p>
        <div class="project-card-footer">
          <span class="project-formats">${project.formats[0]} +</span>
          <span class="view-case-link">
            ${viewText}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.33334 8H12.6667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 3.33334L12.6667 8.00001L8 12.6667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </div>
      </div>
    `;

    // Click & Keyboard Enter/Space open modal
    card.addEventListener('click', () => openProjectModal(project));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProjectModal(project);
      }
    });

    grid.appendChild(card);
  });
}

// Modal Case Study Management
function openProjectModal(project) {
  appState.previousActiveElement = document.activeElement;
  appState.activeProjectModal = project;
  renderProjectModal(project);
  
  const modal = document.getElementById('caseStudyModal');
  if (modal) {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Set focus to close button
    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) closeBtn.focus();
  }
}

function closeProjectModal() {
  const modal = document.getElementById('caseStudyModal');
  if (modal) {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  appState.activeProjectModal = null;
  if (appState.previousActiveElement && typeof appState.previousActiveElement.focus === 'function') {
    appState.previousActiveElement.focus();
  }
}

function renderProjectModal(project) {
  const modalContent = document.getElementById('modalDynamicContent');
  if (!modalContent) return;

  const t = translations[appState.lang];
  const title = project.title[appState.lang] || project.title.es;
  const category = project.category[appState.lang] || project.category.es;
  const tagline = project.tagline[appState.lang] || project.tagline.es;
  const objective = project.objective[appState.lang] || project.objective.es;
  const target = project.targetAudience[appState.lang] || project.targetAudience.es;
  const concept = project.creativeConcept[appState.lang] || project.creativeConcept.es;
  const process = project.processDescription[appState.lang] || project.processDescription.es;
  const deliverables = project.deliverables[appState.lang] || project.deliverables.es || [];

  const toolsHtml = project.aiTools.map(tool => `<span class="tool-tag">${tool}</span>`).join('');
  const deliverablesHtml = deliverables.map(item => `<li class="deliverable-item">${item}</li>`).join('');
  const formatsHtml = project.formats.map(f => `<span class="tool-tag">${f}</span>`).join('');

  modalContent.innerHTML = `
    <div class="modal-hero-img-wrap">
      <img src="${project.thumbnail}" alt="${title}" class="modal-hero-img" />
    </div>

    <div class="modal-project-header">
      <div class="modal-category">${category} — ${project.year}</div>
      <h2 class="modal-title">${title}</h2>
      <p class="modal-tagline">${tagline}</p>
    </div>

    <div class="modal-disclaimer-box" role="note">
      <strong>${appState.lang === 'es' ? 'Nota Editorial' : 'Editorial Note'}:</strong> ${t.modal_fictitious_note}
    </div>

    <div class="modal-specs-grid">
      <div class="spec-item">
        <span class="spec-title">${t.modal_spec_objective}</span>
        <p class="spec-content">${objective}</p>
      </div>
      <div class="spec-item">
        <span class="spec-title">${t.modal_spec_target}</span>
        <p class="spec-content">${target}</p>
      </div>
      <div class="spec-item">
        <span class="spec-title">${t.modal_spec_concept}</span>
        <p class="spec-content">${concept}</p>
      </div>
      <div class="spec-item">
        <span class="spec-title">${t.modal_spec_tools}</span>
        <div class="tool-tags-list">${toolsHtml}</div>
      </div>
    </div>

    <div class="modal-narrative">
      <h3 class="narrative-title">${t.modal_process_title}</h3>
      <p class="narrative-text">${process}</p>
    </div>

    <div class="modal-narrative">
      <h3 class="narrative-title">${t.modal_spec_formats}</h3>
      <ul class="deliverables-list">
        ${deliverablesHtml}
      </ul>
      <div class="tool-tags-list" style="margin-top: 1.25rem;">
        ${formatsHtml}
      </div>
    </div>
  `;
}

function setupModalKeyboardHandling() {
  const modal = document.getElementById('caseStudyModal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.modal-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeProjectModal);
  }

  // Close when clicking outside of modal card
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeProjectModal();
    }
  });

  // Modal Keyboard Navigation: Escape key and Focus Trap (Tab / Shift+Tab)
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeProjectModal();
      return;
    }

    if (e.key === 'Tab' && modal.classList.contains('is-open')) {
      const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });
}

// Navigation & Mobile Drawer
function setupNavigation() {
  const menuToggle = document.getElementById('mobileMenuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      menuToggle.innerHTML = isOpen
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="8" x2="20" y2="8"></line><line x1="4" y1="16" x2="20" y2="16"></line></svg>`;
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="8" x2="20" y2="8"></line><line x1="4" y1="16" x2="20" y2="16"></line></svg>`;
      });
    });

    // Close mobile nav on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        mobileNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="8" x2="20" y2="8"></line><line x1="4" y1="16" x2="20" y2="16"></line></svg>`;
        menuToggle.focus();
      }
    });
  }

  // Active link scroll spy
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    desktopLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}
