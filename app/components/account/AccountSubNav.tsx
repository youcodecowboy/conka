"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/account", label: "Overview" },
  { href: "/account/subscriptions", label: "Subscriptions" },
  { href: "/account/orders", label: "Orders" },
  { href: "/account/details", label: "Details" },
] as const;

export function AccountSubNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Account navigation"
      className="bg-white border-b border-black/12"
    >
      <div className="grid grid-cols-4">
        {TABS.map((tab) => {
          const isActive =
            tab.href === "/account"
              ? pathname === "/account"
              : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={isActive ? "page" : undefined}
              className={`min-h-[44px] flex items-center justify-center font-mono text-[10px] uppercase tracking-[0.18em] tabular-nums transition-colors ${
                isActive
                  ? "bg-black text-white"
                  : "bg-white text-black/70 hover:text-black hover:bg-black/[0.03]"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default AccountSubNav;
