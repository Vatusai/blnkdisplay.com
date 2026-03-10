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
  navLinks: NavLink[];
  ctaText: string;
}

export const navigationConfig: NavigationConfig = {
  logo: "BLNK",
  logoAccent: "",
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
  backgroundImage: "/images/hero_concert_led.jpg",
  gridRows: 6,
  gridCols: 8,
  pinkCells: [
    { row: 0, col: 4 }, { row: 0, col: 5 }, { row: 0, col: 6 }, { row: 0, col: 7 },
    { row: 1, col: 4 }, { row: 1, col: 5 }, { row: 1, col: 6 }, { row: 1, col: 7 },
    { row: 2, col: 4 }, { row: 2, col: 5 }, { row: 2, col: 6 }, { row: 2, col: 7 },
    { row: 3, col: 4 }, { row: 3, col: 5 }, { row: 3, col: 6 }, { row: 3, col: 7 },
  ],
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
  colorSwatchesLabel: "Available configurations",
  ctaText: "See specs",
  productImage: "/images/product_panel_detail.jpg",
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
    { name: "Concave", nameSecondary: "Inward curve", color: "#FF2D8F", description: "Immersive audience experience" },
    { name: "Convex", nameSecondary: "Outward curve", color: "#00D4FF", description: "Maximum viewing angles" },
    { name: "Flat", nameSecondary: "Standard", color: "#FFFFFF", description: "Classic presentation" },
    { name: "Custom", nameSecondary: "Your vision", color: "#1A1A1A", description: "Any shape imaginable" },
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
  ctaText: "Explore layouts",
  ctaHref: "#contact",
  image: "/images/modular_stack_rigging.jpg",
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
      image: "/images/hero_concert_led.jpg",
    },
    {
      title: "Corporate Events",
      description: "Professional displays for presentations and launches",
      image: "/images/curved_stage_install.jpg",
    },
    {
      title: "Brand Activations",
      description: "Immersive experiences that captivate audiences",
      image: "/images/immersive_room_experience.jpg",
    },
    {
      title: "Outdoor & Touring",
      description: "Weather-rated systems for festivals and tours",
      image: "/images/outdoor_tour_truck.jpg",
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
};

// ----------------------------------------------------------------------------
// Footer
// ----------------------------------------------------------------------------

export interface SocialLink {
  platform: "instagram" | "twitter" | "youtube";
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
  brandDescription: "Flexible LED displays that transform spaces. Advanced visual solutions for concerts, events, and immersive brand experiences.",
  socialLinks: [
    { platform: "instagram", href: "#", label: "Instagram" },
    { platform: "twitter", href: "#", label: "Twitter" },
    { platform: "youtube", href: "#", label: "YouTube" },
  ],
  linkSections: [
    { title: "Products", links: ["LED Panels", "Curved Systems", "Outdoor Series", "Accessories"] },
    { title: "Services", links: ["Rental", "Installation", "Support", "Training"] },
    { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
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
