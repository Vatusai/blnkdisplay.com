/**
 * CRM - Customer Relationship Management Placeholder Page
 * 
 * Located at: /admin/crm
 * 
 * Future functionality:
 * - Lead management and tracking
 * - Quote requests
 * - Client database
 * - Contract management
 * - Sales pipeline
 */

import PlaceholderPage from '../../components/PlaceholderPage';
import { Users } from 'lucide-react';

const crmFeatures = [
  {
    name: 'Lead Management',
    description: 'Track inquiries from first contact to closed deal with status pipelines.',
    status: 'in-progress' as const,
  },
  {
    name: 'Quote System',
    description: 'Generate, send, and track professional quotes with automatic follow-ups.',
    status: 'in-progress' as const,
  },
  {
    name: 'Client Database',
    description: 'Comprehensive profiles with contact history, preferences, and notes.',
    status: 'planned' as const,
  },
  {
    name: 'Contract Management',
    description: 'Create, send, and track contracts with e-signature integration.',
    status: 'planned' as const,
  },
  {
    name: 'Sales Pipeline',
    description: 'Visual kanban board showing deals at every stage of your sales process.',
    status: 'planned' as const,
  },
  {
    name: 'Activity Tracking',
    description: 'Log calls, emails, meetings, and tasks with automatic reminders.',
    status: 'planned' as const,
  },
];

export default function CRM() {
  return (
    <PlaceholderPage
      title="CRM"
      subtitle="Customer Relationship Management"
      description="Your complete business management hub. The CRM will centralize all client interactions, from initial inquiries through quote generation to signed contracts. Never lose track of a potential deal again."
      icon={Users}
      features={crmFeatures}
      estimatedRelease="Q2 2024"
      primaryAction={{
        label: 'Import Existing Data',
      }}
      secondaryAction={{
        label: 'View CRM Roadmap',
      }}
    />
  );
}
