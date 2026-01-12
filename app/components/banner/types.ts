/**
 * Banner configuration types
 */

export type BannerVariant = "marquee" | "static";

export interface BannerButton {
  /** Button text */
  text: string;
  /** Button link/action */
  href?: string;
  /** Optional onClick handler */
  onClick?: () => void;
}

export interface BannerContent {
  /** Main banner text (for marquee, this is the scrolling text) */
  text: string;
  /** Optional secondary text (e.g., spots remaining) */
  secondaryText?: string;
  /** Optional button configuration */
  button?: BannerButton;
  /** Mobile-specific content override */
  mobileContent?: {
    text: string;
    secondaryText?: string;
  };
}

export interface BannerStyling {
  /** Background color class */
  bgColor: string;
  /** Text color class */
  textColor: string;
  /** Border color class */
  borderColor?: string;
}

export interface BannerConfig {
  /** Unique identifier for the banner */
  id: string;
  /** Whether banner is enabled */
  enabled: boolean;
  /** Optional deadline - banner auto-hides after this date */
  deadline?: Date;
  /** Whether banner can be dismissed on mobile */
  dismissible: boolean;
  /** Banner variant: marquee (animated scroll) or static */
  variant: BannerVariant;
  /** Banner content configuration */
  content: BannerContent;
  /** Banner styling */
  styling: BannerStyling;
  /** LocalStorage key for dismissal state */
  dismissalKey?: string;
}
