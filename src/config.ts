// =============================================================================
// BLNK display - Site Configuration
// Edit ONLY this file to customize all content across the site.
// All animations, layouts, and styles are controlled by the components.
// =============================================================================

// -- Site-wide settings -------------------------------------------------------
export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "BLNK display | Flexible LED Display Rentals",
  description: "Advanced visual display solutions for concerts, events, exhibitions, and immersive brand experiences. Modular LED panels with tool-free assembly.",
  language: "en",
};

// -- Hero Section -------------------------------------------------------------
export interface HeroNavItem {
  label: string;
  sectionId: string;
  icon: "disc" | "play" | "calendar" | "music";
}

export interface HeroConfig {
  backgroundImage: string;
  brandName: string;
  decodeText: string;
  decodeChars: string;
  subtitle: string;
  ctaPrimary: string;
  ctaPrimaryTarget: string;
  ctaSecondary: string;
  ctaSecondaryTarget: string;
  cornerLabel: string;
  cornerDetail: string;
  navItems: HeroNavItem[];
}

export const heroConfig: HeroConfig = {
  backgroundImage: "/images/hero-glow.jpg",
  brandName: "BLNK",
  decodeText: "Build the impossible wall.",
  decodeChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*",
  subtitle: "Modular LED panels. Tool-free assembly. Cinematic brightness.",
  ctaPrimary: "Request a Quote",
  ctaPrimaryTarget: "contact",
  ctaSecondary: "See Showcase",
  ctaSecondaryTarget: "gallery",
  cornerLabel: "BLNK display SYSTEM",
  cornerDetail: "Rental • Install • Global",
  navItems: [
    { label: "Technology", sectionId: "technology", icon: "disc" },
    { label: "Gallery", sectionId: "gallery", icon: "play" },
    { label: "Applications", sectionId: "applications", icon: "calendar" },
    { label: "Contact", sectionId: "contact", icon: "music" },
  ],
};

// -- Album Cube Section (Technology Cube) -------------------------------------------------------
export interface Album {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

export interface AlbumCubeConfig {
  albums: Album[];
  cubeTextures: string[];
  scrollHint: string;
}

export const albumCubeConfig: AlbumCubeConfig = {
  albums: [
    {
      id: 1,
      title: "FLEXIBLE",
      subtitle: "CURVE",
      image: "/images/cube-panel-2.jpg",
    },
    {
      id: 2,
      title: "MODULAR",
      subtitle: "BUILD",
      image: "/images/cube-panel-1.jpg",
    },
    {
      id: 3,
      title: "SEAMLESS",
      subtitle: "CONNECT",
      image: "/images/cube-panel-3.jpg",
    },
    {
      id: 4,
      title: "IMMERSIVE",
      subtitle: "EXPERIENCE",
      image: "/images/cube-panel-6.jpg",
    },
  ],
  cubeTextures: [
    "/images/cube-panel-1.jpg",
    "/images/cube-panel-2.jpg",
    "/images/cube-panel-3.jpg",
    "/images/cube-panel-4.jpg",
    "/images/cube-panel-5.jpg",
    "/images/cube-panel-6.jpg",
  ],
  scrollHint: "Scroll to explore technology",
};

// -- Parallax Gallery Section -------------------------------------------------
export interface ParallaxImage {
  id: number;
  src: string;
  alt: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  title: string;
  date: string;
}

export interface ParallaxGalleryConfig {
  sectionLabel: string;
  sectionTitle: string;
  galleryLabel: string;
  galleryTitle: string;
  marqueeTexts: string[];
  endCtaText: string;
  parallaxImagesTop: ParallaxImage[];
  parallaxImagesBottom: ParallaxImage[];
  galleryImages: GalleryImage[];
}

export const parallaxGalleryConfig: ParallaxGalleryConfig = {
  sectionLabel: "SURFACE MODE",
  sectionTitle: "Turn the wall into a window.",
  galleryLabel: "PROJECT GALLERY",
  galleryTitle: "Built for any stage.",
  marqueeTexts: [
    "LIVE EVENTS",
    "CORPORATE",
    "BRAND ACTIVATIONS",
    "ARCHITECTURE",
    "CONCERTS",
    "EXHIBITIONS",
    "IMMERSIVE",
    "FESTIVALS",
  ],
  endCtaText: "View All Projects",
  parallaxImagesTop: [
    { id: 1, src: "/images/gallery-1.jpg", alt: "Music festival stage" },
    { id: 2, src: "/images/gallery-2.jpg", alt: "Trade show booth" },
    { id: 3, src: "/images/gallery-3.jpg", alt: "Brand activation" },
  ],
  parallaxImagesBottom: [
    { id: 4, src: "/images/gallery-4.jpg", alt: "Outdoor concert" },
    { id: 5, src: "/images/gallery-5.jpg", alt: "Corporate conference" },
    { id: 6, src: "/images/gallery-6.jpg", alt: "Art installation" },
  ],
  galleryImages: [
    { id: 1, src: "/images/usecase-live-events.jpg", title: "Live Events", date: "Concert & Festival Production" },
    { id: 2, src: "/images/usecase-retail.jpg", title: "Retail Spaces", date: "Brand Experience Centers" },
    { id: 3, src: "/images/usecase-architecture.jpg", title: "Architecture", date: "Permanent Installations" },
    { id: 4, src: "/images/stage-moment.jpg", title: "Stage Design", date: "Tour & Venue Production" },
    { id: 5, src: "/images/gallery-1.jpg", title: "Festivals", date: "Large Scale Events" },
    { id: 6, src: "/images/gallery-6.jpg", title: "Immersive", date: "Interactive Experiences" },
  ],
};

// -- Tour Schedule Section (Applications) ----------------------------------------------------
export interface TourDate {
  id: number;
  date: string;
  time: string;
  city: string;
  venue: string;
  status: "on-sale" | "sold-out" | "coming-soon";
  image: string;
}

export interface TourStatusLabels {
  onSale: string;
  soldOut: string;
  comingSoon: string;
  default: string;
}

export interface TourScheduleConfig {
  sectionLabel: string;
  sectionTitle: string;
  vinylImage: string;
  buyButtonText: string;
  detailsButtonText: string;
  bottomNote: string;
  bottomCtaText: string;
  statusLabels: TourStatusLabels;
  tourDates: TourDate[];
}

export const tourScheduleConfig: TourScheduleConfig = {
  sectionLabel: "APPLICATIONS",
  sectionTitle: "Where BLNK comes alive.",
  vinylImage: "/images/cube-panel-1.jpg",
  buyButtonText: "Learn More",
  detailsButtonText: "View Specs",
  bottomNote: "Custom solutions for any venue size",
  bottomCtaText: "Get a Custom Quote",
  statusLabels: {
    onSale: "Available",
    soldOut: "Booked",
    comingSoon: "Coming Soon",
    default: "Inquire",
  },
  tourDates: [
    {
      id: 1,
      date: "2026.03.15",
      time: "LIVE",
      city: "Concert Tours",
      venue: "Arena & Stadium Production",
      status: "on-sale",
      image: "/images/gallery-1.jpg",
    },
    {
      id: 2,
      date: "2026.04.01",
      time: "EVENT",
      city: "Corporate Events",
      venue: "Conferences & Product Launches",
      status: "on-sale",
      image: "/images/gallery-5.jpg",
    },
    {
      id: 3,
      date: "2026.05.20",
      time: "TRADE",
      city: "Exhibitions",
      venue: "Trade Shows & Expo Booths",
      status: "on-sale",
      image: "/images/gallery-2.jpg",
    },
    {
      id: 4,
      date: "2026.06.10",
      time: "BRAND",
      city: "Brand Activations",
      venue: "Pop-up Experiences & Campaigns",
      status: "coming-soon",
      image: "/images/gallery-3.jpg",
    },
  ],
};

// -- Footer Section -----------------------------------------------------------
export interface FooterImage {
  id: number;
  src: string;
}

export interface SocialLink {
  icon: "instagram" | "twitter" | "youtube" | "music";
  label: string;
  href: string;
}

export interface FooterConfig {
  portraitImage: string;
  portraitAlt: string;
  heroTitle: string;
  heroSubtitle: string;
  artistLabel: string;
  artistName: string;
  artistSubtitle: string;
  brandName: string;
  brandDescription: string;
  quickLinksTitle: string;
  quickLinks: string[];
  contactTitle: string;
  emailLabel: string;
  email: string;
  phoneLabel: string;
  phone: string;
  addressLabel: string;
  address: string;
  newsletterTitle: string;
  newsletterDescription: string;
  newsletterButtonText: string;
  subscribeAlertMessage: string;
  copyrightText: string;
  bottomLinks: string[];
  socialLinks: SocialLink[];
  galleryImages: FooterImage[];
}

export const footerConfig: FooterConfig = {
  portraitImage: "/images/footer-portrait.jpg",
  portraitAlt: "BLNK display Technician",
  heroTitle: "Ready to build your wall?",
  heroSubtitle: "Tell us the date, venue, and size. We'll reply with a plan and a quote.",
  artistLabel: "TECHNOLOGY",
  artistName: "BLNK display",
  artistSubtitle: "Modular LED Systems",
  brandName: "BLNK",
  brandDescription: "Advanced visual display solutions for concerts, events, exhibitions, and immersive brand experiences. Built for teardown, travel, and reinstall.",
  quickLinksTitle: "Quick Links",
  quickLinks: ["Technology", "Gallery", "Applications", "Specs", "Contact"],
  contactTitle: "Contact",
  emailLabel: "Email",
  email: "info@blinkdisplay.com",
  phoneLabel: "Phone",
  phone: "+506 XXXX-XXXX",
  addressLabel: "Address",
  address: "XXXXX, San Jose, Costa Rica",
  newsletterTitle: "Stay Updated",
  newsletterDescription: "Get the latest on new products and project showcases.",
  newsletterButtonText: "Subscribe",
  subscribeAlertMessage: "Thanks for subscribing!",
  copyrightText: "© 2026 BLNK display. All rights reserved.",
  bottomLinks: ["Privacy Policy", "Terms of Service", "Careers"],
  socialLinks: [
    { icon: "instagram", label: "Instagram", href: "#" },
    { icon: "twitter", label: "Twitter", href: "#" },
    { icon: "youtube", label: "YouTube", href: "#" },
    { icon: "music", label: "LinkedIn", href: "#" },
  ],
  galleryImages: [
    { id: 1, src: "/images/gallery-1.jpg" },
    { id: 2, src: "/images/gallery-2.jpg" },
    { id: 3, src: "/images/gallery-3.jpg" },
    { id: 4, src: "/images/gallery-4.jpg" },
  ],
};
