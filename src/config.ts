// ============================================================================
// BLNK DISPLAY - SITE CONFIGURATION
// ============================================================================
// Flexible LED Display Rentals & Advanced Visual Technology
// ============================================================================

// ----------------------------------------------------------------------------
// Navigation
// ----------------------------------------------------------------------------

export interface NavLink {
  label: string;
  href: string;
}

export interface NavigationConfig {
  logo: string;
  logoAccent: string;
  logoImage: string;
  navLinks: NavLink[];
  ctaText: string;
}

export const navigationConfig: NavigationConfig = {
  logo: "BLNK",
  logoAccent: "",
  logoImage: "/images/logo_light.png",
  navLinks: [
    { label: "Products", href: "#products" },
    { label: "Projects", href: "#projects" },
    { label: "Support", href: "#support" },
    { label: "Contact", href: "#contact" },
  ],
  ctaText: "Request a quote",
};

// ----------------------------------------------------------------------------
// Hero Section
// ----------------------------------------------------------------------------

export interface HeroConfig {
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  backgroundImage: string;
  backgroundImageMobile?: string;
  gridRows: number;
  gridCols: number;
  pinkCells: { row: number; col: number }[];
}

export const heroConfig: HeroConfig = {
  titleLine1: "FLEXIBLE",
  titleLine2: "LED WALL",
  subtitle: "BLNK DISPLAY SYSTEM",
  ctaText: "Explore the system",
  ctaHref: "#products",
  backgroundImage: "/images/hero_stage_blnk.webp",
  backgroundImageMobile: "/images/hero_mobile.webp",
  gridRows: 6,
  gridCols: 8,
  pinkCells: [],
};

// ----------------------------------------------------------------------------
// Product Showcase Section (Precision Panel)
// ----------------------------------------------------------------------------

export interface ProductFeature {
  value: string;
  label: string;
}

export interface ProductShowcaseConfig {
  sectionLabel: string;
  headingMain: string;
  headingAccent: string;
  productName: string;
  description: string;
  price: string;
  features: ProductFeature[];
  colorSwatches: string[];
  colorSwatchesLabel: string;
  ctaText: string;
  productImage: string;
  productImageAlt: string;
  decorativeText: string;
}

export const productShowcaseConfig: ProductShowcaseConfig = {
  sectionLabel: "MODULAR HARDWARE",
  headingMain: "Precision panel.",
  headingAccent: "Instant control.",
  productName: "BLNK Pro Series",
  description: "Rigging, signal, and power—integrated. Map content in minutes, not hours. Our modular LED panels are engineered for rapid deployment and stunning visual impact.",
  price: "",
  features: [
    { value: "2.6mm", label: "Pixel Pitch" },
    { value: "4500", label: "Nits Brightness" },
    { value: "7680Hz", label: "Refresh Rate" },
  ],
  colorSwatches: ["#FF2D8F", "#00D4FF", "#FFFFFF"],
  colorSwatchesLabel: "",
  ctaText: "",
  productImage: "/images/product_led_cube.jpg",
  productImageAlt: "BLNK LED Panel Detail",
  decorativeText: "PRECISION",
};

// ----------------------------------------------------------------------------
// Color Palette Section (Stage Geometry / Curved)
// ----------------------------------------------------------------------------

export interface ColorSwatch {
  name: string;
  nameSecondary: string;
  color: string;
  description: string;
  image?: string;
}

export interface ColorPaletteConfig {
  sectionLabel: string;
  headingMain: string;
  headingAccent: string;
  colors: ColorSwatch[];
  bottomText: string;
  decorativeText: string;
}

export const colorPaletteConfig: ColorPaletteConfig = {
  sectionLabel: "STAGE GEOMETRY",
  headingMain: "Curve",
  headingAccent: "the moment.",
  colors: [
    { name: "Concave", nameSecondary: "Inward curve", color: "#FF2D8F", description: "Immersive audience experience", image: "/images/configuraciones/concava.jpeg" },
    { name: "Convex", nameSecondary: "Outward curve", color: "#00D4FF", description: "Maximum viewing angles", image: "/images/configuraciones/convexa.jpeg" },
    { name: "Flat", nameSecondary: "Standard", color: "#FFFFFF", description: "Classic presentation", image: "/images/configuraciones/plana.jpeg" },
    { name: "Custom", nameSecondary: "Your vision", color: "#1A1A1A", description: "Any shape imaginable", image: "/images/configuraciones/personalizada.jpeg" },
  ],
  bottomText: "Fast rigging. Zero visible seams.",
  decorativeText: "CURVE",
};

// ----------------------------------------------------------------------------
// Finale / Brand Philosophy Section (Build Any Canvas)
// ----------------------------------------------------------------------------

export interface FinaleConfig {
  sectionLabel: string;
  headingMain: string;
  headingAccent: string;
  tagline: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
  decorativeText: string;
}

export const finaleConfig: FinaleConfig = {
  sectionLabel: "MODULAR SYSTEM",
  headingMain: "Build",
  headingAccent: "any canvas.",
  tagline: "Stack, hang, or floor-mount. One system—arenas, galleries, pop-ups. From intimate brand activations to stadium-scale concerts, BLNK Display transforms any space into an immersive visual experience.",
  features: ["Rapid Deployment", "Tool-Free Rigging", "24/7 Support"],
  ctaText: "",
  ctaHref: "#contact",
  image: "/images/finale_branded_wall.webp",
  imageAlt: "Modular LED System",
  decorativeText: "BUILD",
};

// ----------------------------------------------------------------------------
// Applications Section
// ----------------------------------------------------------------------------

export interface Application {
  title: string;
  description: string;
  image: string;
}

export interface ApplicationsConfig {
  sectionLabel: string;
  headingMain: string;
  headingAccent: string;
  applications: Application[];
  decorativeText?: string;
}

export const applicationsConfig: ApplicationsConfig = {
  sectionLabel: "APPLICATIONS",
  headingMain: "Any event.",
  headingAccent: "Any scale.",
  applications: [
    {
      title: "Concerts & Live Shows",
      description: "Stunning visuals that amplify every performance",
      image: "/images/app_concerts.webp",
    },
    {
      title: "Corporate Events",
      description: "Professional displays for presentations and launches",
      image: "/images/app_corporate.webp",
    },
    {
      title: "Brand Activations",
      description: "Immersive experiences that captivate audiences",
      image: "/images/app_brand_activation.webp",
    },
    {
      title: "Outdoor & Public Spaces",
      description: "Large-scale displays for stadiums, malls, and public venues",
      image: "/images/app_outdoor.webp",
    },
    {
      title: "Exhibitions & Trade Shows",
      description: "Curved and cylindrical LED structures that stop the floor",
      image: "/images/app_exhibition.webp",
    },
  ],
};

// ----------------------------------------------------------------------------
// Specs Section
// ----------------------------------------------------------------------------

export interface SpecCard {
  title: string;
  value: string;
  description: string;
}

export interface SpecsConfig {
  sectionLabel: string;
  headingMain: string;
  description: string;
  specs: SpecCard[];
}

export const specsConfig: SpecsConfig = {
  sectionLabel: "SPECIFICATIONS",
  headingMain: "Specs that stay out of the way.",
  description: "We optimize for rigging speed, cable cleanliness, and image stability—so your team can focus on the show.",
  specs: [
    { title: "Pitch", value: "2.6mm / 3.9mm / 4.8mm", description: "Pixel-perfect clarity at any viewing distance" },
    { title: "Brightness", value: "800–4500 nits", description: "From indoor venues to direct sunlight" },
    { title: "Refresh", value: "1920–7680 Hz", description: "Camera-safe, flicker-free performance" },
    { title: "Use", value: "Indoor & Outdoor", description: "Designed for any environment" },
  ],
};

// ----------------------------------------------------------------------------
// Workflow Section
// ----------------------------------------------------------------------------

export interface WorkflowStep {
  number: string;
  title: string;
  description: string;
}

export interface WorkflowConfig {
  sectionLabel: string;
  headingMain: string;
  steps: WorkflowStep[];
}

export const workflowConfig: WorkflowConfig = {
  sectionLabel: "PROCESS",
  headingMain: "From sketch to show.",
  steps: [
    {
      number: "01",
      title: "Layout",
      description: "Send dimensions + content type. We recommend pitch, curve, and rigging.",
    },
    {
      number: "02",
      title: "Build",
      description: "Pre-configured batches, labeled cables, and a single point of contact.",
    },
    {
      number: "03",
      title: "Support",
      description: "On-site techs, real-time monitoring, and rapid swap kits.",
    },
  ],
};

// ----------------------------------------------------------------------------
// Contact Section
// ----------------------------------------------------------------------------

export interface ContactFormLabels {
  name: string;
  email: string;
  company: string;
  eventType: string;
  message: string;
}

export interface ContactConfig {
  sectionLabel: string;
  headingMain: string;
  description: string;
  ctaText: string;
  ctaSecondary: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  scriptUrl: string;
  formLabels: ContactFormLabels;
  formPlaceholders: ContactFormLabels;
  contactLabels: { email: string; phone: string; location: string };
  successTitle: string;
  successMessage: string;
  sendingText: string;
  errorMessage: string;
}

export const contactConfig: ContactConfig = {
  sectionLabel: "CONTACT",
  headingMain: "Let's build your next stage.",
  description: "Tell us what you're making. We'll reply with a layout, timeline, and quote.",
  ctaText: "Request a quote",
  ctaSecondary: "Download brochure",
  email: "info@blnkdisplay.com",
  phone: "+506 8338 4214",
  whatsapp: "50683384214",
  location: "San Jose, Costa Rica",
  scriptUrl: "https://script.google.com/macros/s/AKfycbxC4Kg9DTM8HnZhBOLExpCM7PZcUz2F0HWgk5d8ZLiZvQLP6u61K_S-e4fzGCV0gLS5Gg/exec",
  formLabels: { name: "Name", email: "Email", company: "Company", eventType: "Event Type", message: "Message" },
  formPlaceholders: { name: "Your name", email: "your@email.com", company: "Your company", eventType: "Concert, corporate event, etc.", message: "Tell us about your project..." },
  contactLabels: { email: "Email", phone: "Phone", location: "Location" },
  successTitle: "Message sent!",
  successMessage: "We'll be in touch soon.",
  sendingText: "Sending...",
  errorMessage: "Something went wrong. Please email us directly at",
};

// ----------------------------------------------------------------------------
// Footer
// ----------------------------------------------------------------------------

export interface SocialLink {
  platform: "instagram";
  href: string;
  label: string;
}

export interface FooterLinkSection {
  title: string;
  links: string[];
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
}

export interface LegalLink {
  label: string;
  href: string;
}

export interface FooterConfig {
  logo: string;
  logoAccent: string;
  logoImage: string;
  brandDescription: string;
  socialLinks: SocialLink[];
  linkSections: FooterLinkSection[];
  contact: ContactInfo;
  legalLinks: LegalLink[];
  copyrightText: string;
  decorativeText: string;
}

export const footerConfig: FooterConfig = {
  logo: "BLNK",
  logoAccent: "",
  logoImage: "/images/logo_light.png",
  brandDescription: "Flexible LED displays that transform spaces. Advanced visual solutions for concerts, events, and immersive brand experiences.",
  socialLinks: [
    { platform: "instagram", href: "https://www.instagram.com/blnkdisplay/", label: "Instagram" },
  ],
  linkSections: [
    { title: "Products", links: ["LED Panels", "Curved Systems", "Outdoor Series", "Accessories"] },
    { title: "Services", links: ["Rental", "Installation", "Support", "Training"] },
  ],
  contact: {
    address: "San Jose, Costa Rica",
    phone: "+506 8338 4214",
    email: "info@blnkdisplay.com",
  },
  legalLinks: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
  copyrightText: "BLNK Display. All rights reserved.",
  decorativeText: "BLNK",
};

// ----------------------------------------------------------------------------
// Site Metadata
// ----------------------------------------------------------------------------

export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "BLNK Display | Flexible LED Display Rentals",
  description: "Advanced visual display solutions for concerts, events, exhibitions, and immersive brand experiences. Flexible LED displays that transform spaces.",
  language: "en",
};

// ----------------------------------------------------------------------------
// Video Section
// ----------------------------------------------------------------------------

export interface VideoConfig {
  sectionLabel: string;
  headingMain: string;
  headingAccent: string;
  description: string;
  videoSrc: string;
  posterImage: string;
  playLabel: string;
  pauseLabel: string;
  muteLabel: string;
  unmuteLabel: string;
}

export const videoConfig: VideoConfig = {
  sectionLabel: "IN ACTION",
  headingMain: "See it",
  headingAccent: "run.",
  description: "From flat walls to curved cylinders — BLNK Display systems deployed across events, retail, and exhibitions.",
  videoSrc: "/video/demo_reel.mp4",
  posterImage: "/images/hero_stage_blnk.webp",
  playLabel: "Play",
  pauseLabel: "Pause",
  muteLabel: "Mute",
  unmuteLabel: "Unmute",
};

// ============================================================================
// SPANISH (ES) TRANSLATIONS
// ============================================================================

export const navigationConfigEs: NavigationConfig = {
  ...navigationConfig,
  navLinks: [
    { label: "Productos", href: "#products" },
    { label: "Proyectos", href: "#projects" },
    { label: "Soporte", href: "#support" },
    { label: "Contacto", href: "#contact" },
  ],
  ctaText: "Solicitar cotización",
};

export const heroConfigEs: HeroConfig = {
  ...heroConfig,
  subtitle: "SISTEMA BLNK DISPLAY",
  ctaText: "Explorar el sistema",
};

export const productShowcaseConfigEs: ProductShowcaseConfig = {
  ...productShowcaseConfig,
  sectionLabel: "HARDWARE MODULAR",
  headingMain: "Panel de precisión.",
  headingAccent: "Control instantáneo.",
  description: "Rigging, señal y potencia—integrados. Mapea contenido en minutos, no en horas. Nuestros paneles LED modulares están diseñados para un despliegue rápido e impacto visual impresionante.",
  features: [
    { value: "2.6mm", label: "Pixel Pitch" },
    { value: "4500", label: "Brillo (Nits)" },
    { value: "7680Hz", label: "Tasa de Refresco" },
  ],
  colorSwatchesLabel: "",
  ctaText: "",
  productImageAlt: "Detalle del panel LED BLNK",
  decorativeText: "PRECISIÓN",
};

export const colorPaletteConfigEs: ColorPaletteConfig = {
  ...colorPaletteConfig,
  sectionLabel: "GEOMETRÍA DE ESCENARIO",
  headingMain: "Curva",
  headingAccent: "el momento.",
  colors: [
    { name: "Cóncava", nameSecondary: "Curva interior", color: "#FF2D8F", description: "Experiencia inmersiva para el público", image: "/images/configuraciones/concava.jpeg" },
    { name: "Convexa", nameSecondary: "Curva exterior", color: "#00D4FF", description: "Máximos ángulos de visión", image: "/images/configuraciones/convexa.jpeg" },
    { name: "Plana", nameSecondary: "Estándar", color: "#FFFFFF", description: "Presentación clásica", image: "/images/configuraciones/plana.jpeg" },
    { name: "Personalizada", nameSecondary: "Tu visión", color: "#1A1A1A", description: "Cualquier forma imaginable", image: "/images/configuraciones/personalizada.jpeg" },
  ],
  bottomText: "Rigging y Armado rápido. Sin demoras.",
  decorativeText: "CURVA",
};

export const finaleConfigEs: FinaleConfig = {
  ...finaleConfig,
  sectionLabel: "SISTEMA MODULAR",
  headingMain: "Construye",
  headingAccent: "cualquier lienzo.",
  tagline: "Apila, cuelga o monta en el suelo. Un solo sistema—arenas, galerías, pop-ups. Desde activaciones de marca íntimas hasta conciertos de escala estadio, BLNK Display transforma cualquier espacio en una experiencia visual inmersiva.",
  features: ["Despliegue Rápido", "Rigging Sin Herramientas", "Soporte 24/7"],
  ctaText: "",
  imageAlt: "Sistema LED Modular",
  decorativeText: "CONSTRUYE",
};

export const applicationsConfigEs: ApplicationsConfig = {
  ...applicationsConfig,
  sectionLabel: "APLICACIONES",
  headingMain: "Cualquier evento.",
  headingAccent: "Cualquier escala.",
  applications: [
    { title: "Conciertos y Shows en Vivo", description: "Visuales impactantes que amplifican cada actuación", image: "/images/app_concerts.webp" },
    { title: "Eventos Corporativos", description: "Pantallas profesionales para presentaciones y lanzamientos", image: "/images/app_corporate.webp" },
    { title: "Activaciones de Marca", description: "Experiencias inmersivas que cautivan audiencias", image: "/images/app_brand_activation.webp" },
    { title: "Espacios Exteriores y Públicos", description: "Pantallas de gran escala para estadios, centros comerciales y espacios públicos", image: "/images/app_outdoor.webp" },
    { title: "Exhibiciones y Ferias", description: "Estructuras LED curvas y cilíndricas que detienen el tráfico", image: "/images/app_exhibition.webp" },
  ],
};

export const specsConfigEs: SpecsConfig = {
  ...specsConfig,
  sectionLabel: "ESPECIFICACIONES",
  headingMain: "Specs que no interrumpen.",
  description: "Optimizamos la velocidad de rigging, el orden de cables y la estabilidad de imagen—para que tu equipo pueda concentrarse en el show.",
  specs: [
    { title: "Pitch", value: "2.6mm / 3.9mm / 4.8mm", description: "Claridad perfecta a cualquier distancia de visión" },
    { title: "Brillo", value: "800–4500 nits", description: "Desde espacios interiores hasta luz solar directa" },
    { title: "Refresco", value: "1920–7680 Hz", description: "Rendimiento sin parpadeo, compatible con cámara" },
    { title: "Uso", value: "Interiores y exteriores", description: "Diseñado para cualquier ambiente" },
  ],
};

export const workflowConfigEs: WorkflowConfig = {
  ...workflowConfig,
  sectionLabel: "PROCESO",
  headingMain: "Del boceto al show.",
  steps: [
    { number: "01", title: "Layout", description: "Envía dimensiones + tipo de contenido. Recomendamos pitch, curva y rigging." },
    { number: "02", title: "Montaje", description: "Paquetes preconfigurados, cables etiquetados y un solo punto de contacto." },
    { number: "03", title: "Soporte", description: "Técnicos en sitio, monitoreo en tiempo real y kits de reemplazo rápido." },
  ],
};

export const contactConfigEs: ContactConfig = {
  ...contactConfig,
  sectionLabel: "CONTACTO",
  headingMain: "Construyamos tu próximo escenario.",
  description: "Cuéntanos qué estás creando. Te responderemos con un layout, cronograma y cotización.",
  ctaText: "Solicitar cotización",
  ctaSecondary: "Descargar brochure",
  formLabels: { name: "Nombre", email: "Email", company: "Empresa", eventType: "Tipo de Evento", message: "Mensaje" },
  formPlaceholders: { name: "Tu nombre", email: "tu@email.com", company: "Tu empresa", eventType: "Concierto, evento corporativo, etc.", message: "Cuéntanos sobre tu proyecto..." },
  contactLabels: { email: "Email", phone: "Teléfono", location: "Ubicación" },
  successTitle: "¡Mensaje enviado!",
  successMessage: "Te contactaremos pronto.",
  sendingText: "Enviando...",
  errorMessage: "Algo salió mal. Por favor escríbenos directamente a",
};

export const footerConfigEs: FooterConfig = {
  ...footerConfig,
  brandDescription: "Pantallas LED flexibles que transforman espacios. Soluciones visuales avanzadas para conciertos, eventos y experiencias de marca inmersivas.",
  linkSections: [
    { title: "Productos", links: ["Paneles LED", "Sistemas Curvos", "Serie Exterior", "Accesorios"] },
    { title: "Servicios", links: ["Alquiler", "Instalación", "Soporte", "Capacitación"] },
  ],
  legalLinks: [
    { label: "Política de Privacidad", href: "#" },
    { label: "Términos de Servicio", href: "#" },
  ],
  copyrightText: "BLNK Display. Todos los derechos reservados.",
};

export const videoConfigEs: VideoConfig = {
  ...videoConfig,
  sectionLabel: "EN ACCIÓN",
  headingMain: "Míralo",
  headingAccent: "funcionar.",
  description: "De paredes planas a cilindros curvos — sistemas BLNK Display desplegados en eventos, retail y exhibiciones.",
  playLabel: "Reproducir",
  pauseLabel: "Pausar",
  muteLabel: "Silenciar",
  unmuteLabel: "Activar sonido",
};
