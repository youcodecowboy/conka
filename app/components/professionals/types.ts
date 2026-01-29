/**
 * Mode type for professional portal
 */
export type ProfessionalMode = "individual" | "team";

/**
 * Props for ModeSelectionCard component
 */
export interface ModeSelectionCardProps {
  mode: ProfessionalMode;
  heading: string;
  description: string;
  ctaText: string;
  href: string;
  icon: React.ReactNode;
  image?: {
    src: string;
    alt: string;
  };
}
