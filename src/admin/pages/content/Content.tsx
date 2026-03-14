/**
 * Content Management - Placeholder Page
 * 
 * Located at: /admin/content
 * 
 * Future functionality:
 * - Blog post management (CRUD)
 * - Homepage content editing
 * - Media library
 * - SEO settings
 */

import PlaceholderPage from '../../components/PlaceholderPage';
import { FileText } from 'lucide-react';

const contentFeatures = [
  {
    name: 'Blog Management',
    description: 'Create, edit, and publish blog posts with rich text editing and media support.',
    status: 'planned' as const,
  },
  {
    name: 'Homepage Editor',
    description: 'Modify hero sections, text content, and CTAs without touching code.',
    status: 'in-progress' as const,
  },
  {
    name: 'Media Library',
    description: 'Centralized storage for images, videos, and documents with drag-drop upload.',
    status: 'planned' as const,
  },
  {
    name: 'SEO Tools',
    description: 'Manage meta titles, descriptions, and Open Graph tags for better visibility.',
    status: 'planned' as const,
  },
  {
    name: 'Content Scheduling',
    description: 'Schedule posts to publish automatically at specific dates and times.',
    status: 'planned' as const,
  },
  {
    name: 'Version History',
    description: 'Track changes and restore previous versions of any content.',
    status: 'planned' as const,
  },
];

export default function Content() {
  return (
    <PlaceholderPage
      title="Content Management"
      subtitle="Manage your website content"
      description="The content management system will allow you to control every aspect of your website's content without needing technical knowledge. From blog posts to homepage sections, everything will be editable through an intuitive interface."
      icon={FileText}
      features={contentFeatures}
      estimatedRelease="Q2 2024"
      primaryAction={{
        label: 'View Documentation',
      }}
      secondaryAction={{
        label: 'Request Early Access',
      }}
    />
  );
}
