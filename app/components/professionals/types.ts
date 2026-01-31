/**
 * Mode type for professional portal
 */
export type ProfessionalMode = "protocol" | "formulas";

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
    /** CSS object-position e.g. "center 20%" to crop top, "center 80%" to crop bottom */
    objectPosition?: string;
  };
}
