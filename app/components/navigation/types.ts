/**
 * Props for the Navigation component
 */
export interface NavigationProps {
  cartOpen?: boolean;
  setCartOpen?: (open: boolean) => void;
  /** Hide banner on this page */
  hideBanner?: boolean;
}

/**
 * Hovered section type for shop mega menu
 */
export type HoveredSection = "protocols" | "formulas" | "quiz" | "professionals";

/**
 * Props for NavigationDesktop component
 */
export interface NavigationDesktopProps {
  hideBanner: boolean;
  shopDropdownOpen: boolean;
  setShopDropdownOpen: (open: boolean) => void;
  hoveredSection: HoveredSection;
  setHoveredSection: (section: HoveredSection) => void;
  shopDropdownRef: React.RefObject<HTMLDivElement | null>;
  bannerConfig: ReturnType<typeof import("@/app/components/banner").useBannerConfig>;
  isScrollingDown: boolean;
  onShopAreaEnter: () => void;
  onShopAreaLeave: () => void;
}

/**
 * Props for NavigationMobile component
 */
export interface NavigationMobileProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  hideBanner: boolean;
  bannerConfig: ReturnType<typeof import("@/app/components/banner").useBannerConfig>;
}

/**
 * Props for ShopMegaMenu component
 */
export interface ShopMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  hoveredSection: HoveredSection;
  setHoveredSection: (section: HoveredSection) => void;
  bannerConfig: ReturnType<typeof import("@/app/components/banner").useBannerConfig>;
  hideBanner: boolean;
  onShopAreaEnter: () => void;
  onShopAreaLeave: () => void;
}

/**
 * Props for ShopMegaMenuContent component
 */
export interface ShopMegaMenuContentProps {
  hoveredSection: HoveredSection;
  onNavigate: () => void;
}

/**
 * Props for ProtocolCard component
 */
export interface ProtocolCardProps {
  protocolId: "1" | "2" | "3" | "4";
  onClick: () => void;
}
