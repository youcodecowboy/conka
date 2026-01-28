"use client";

interface PageHeaderProps {
  onNavigateToProtocols: () => void;
  onNavigateToFormulas: () => void;
}

export default function PageHeader({
  onNavigateToProtocols,
  onNavigateToFormulas,
}: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-[var(--background)] border-b-2 border-current/10">
      <div className="px-6 md:px-16 py-4">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center justify-center gap-6 md:gap-8">
            <button
              onClick={onNavigateToProtocols}
              className="font-clinical text-sm md:text-base font-bold hover:opacity-70 transition-opacity"
            >
              Protocols
            </button>
            <span className="font-clinical text-sm opacity-30">•</span>
            <button
              onClick={onNavigateToFormulas}
              className="font-clinical text-sm md:text-base font-bold hover:opacity-70 transition-opacity"
            >
              Individual Formulas
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
