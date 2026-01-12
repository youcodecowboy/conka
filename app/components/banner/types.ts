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
  /** Text to copy to clipboard (if set, button becomes a copy button) */
  copyText?: string;
}

export interface BannerTextSegment {
  /** Text content */
  text: string;
  /** Whether this segment should be bold */
  bold?: boolean;
  /** Whether this is a code/promo code that should be highlighted */
  isCode?: boolean;
}

export interface BannerContent {
  /** Main banner text segments (for marquee, this is the scrolling text) */
  text: BannerTextSegment[];
  /** Optional secondary text segments */
  secondaryText?: BannerTextSegment[];
  /** Optional button configuration */
  button?: BannerButton;
  /** Mobile-specific content override */
  mobileContent?: {
    text: BannerTextSegment[];
    secondaryText?: BannerTextSegment[];
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
