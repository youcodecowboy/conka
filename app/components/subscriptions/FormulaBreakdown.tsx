'use client';

interface FormulaBreakdownProps {
  flowCount: number;
  clarityCount: number;
  isSelected: boolean;
  isUltimate?: boolean;
}

// Flow dot = amber accent, Clear dot = teal accent
export function FormulaBreakdown({
  flowCount,
  clarityCount,
  isSelected,
  isUltimate = false,
}: FormulaBreakdownProps) {
  const perDeliveryText = isUltimate ? ' per delivery' : '/week';
  return (
    <div className={`flex items-center gap-3 mt-2 ${isSelected ? 'opacity-90' : 'opacity-60'}`}>
      <div className="flex items-center gap-1">
        <div className={`w-3 h-3 rounded-full ${isSelected ? 'bg-white/90' : 'bg-amber-500'}`} />
        <span className="premium-body-sm">{flowCount}x Flow</span>
      </div>
      <span className={isSelected ? 'opacity-50' : 'opacity-30'}>+</span>
      <div className="flex items-center gap-1">
        <div className={`w-3 h-3 rounded-full ${isSelected ? 'bg-white/60' : 'bg-teal-500'}`} />
        <span className="premium-body-sm">{clarityCount}x Clear</span>
      </div>
      <span className={`premium-body-sm ${isSelected ? 'opacity-50' : 'opacity-40'}`}>
        {perDeliveryText}
      </span>
    </div>
  );
}
