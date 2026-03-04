'use client';

import { useState, useEffect, useRef } from 'react';
import type { TierType, FormulaId, PackSize } from '@/app/lib/subscriptionProduct';
import { getAvailableTiers } from '@/app/lib/subscriptionProduct';

interface UseSubscriptionEditorOptions {
  isOpen: boolean;
  isProtocol: boolean;
  currentProtocolId: string;
  currentTier: TierType;
  currentFormulaId: FormulaId;
  currentPackSize: PackSize;
  onSave: (
    protocolId: string,
    tier: TierType,
  ) => Promise<{ success: boolean; message?: string; partial?: boolean; multiLine?: boolean }>;
  onSaveFormula?: (
    formulaId: FormulaId,
    packSize: PackSize,
  ) => Promise<{ success: boolean; message?: string; partial?: boolean; multiLine?: boolean }>;
}

export function useSubscriptionEditor({
  isOpen,
  isProtocol,
  currentProtocolId,
  currentTier,
  currentFormulaId,
  currentPackSize,
  onSave,
  onSaveFormula,
}: UseSubscriptionEditorOptions) {
  const [selectedProtocol, setSelectedProtocol] = useState(currentProtocolId);
  const [selectedTier, setSelectedTier] = useState<TierType>(currentTier);
  const [selectedFormulaId, setSelectedFormulaId] = useState<FormulaId>(currentFormulaId);
  const [selectedPackSize, setSelectedPackSize] = useState<PackSize>(currentPackSize);
  const [error, setError] = useState<string | null>(null);
  const [errorPartial, setErrorPartial] = useState(false);
  const [errorMultiLine, setErrorMultiLine] = useState(false);
  const [saving, setSaving] = useState(false);
  const [mobileStep, setMobileStep] = useState<'product' | 'tier'>('product');

  const initialProtocolRef = useRef(currentProtocolId);
  const initialTierRef = useRef(currentTier);
  const initialFormulaRef = useRef(currentFormulaId);
  const initialPackRef = useRef(currentPackSize);

  // Reset all state to current values when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedProtocol(currentProtocolId);
      setSelectedTier(currentTier);
      setSelectedFormulaId(currentFormulaId);
      setSelectedPackSize(currentPackSize);
      setError(null);
      setErrorPartial(false);
      setErrorMultiLine(false);
      setMobileStep('product');
      initialProtocolRef.current = currentProtocolId;
      initialTierRef.current = currentTier;
      initialFormulaRef.current = currentFormulaId;
      initialPackRef.current = currentPackSize;
    }
  }, [isOpen, currentProtocolId, currentTier, currentFormulaId, currentPackSize]);

  // If the selected protocol changes and the current tier is no longer valid, snap to first
  const availableTiers = getAvailableTiers(isProtocol ? selectedProtocol : '1');
  useEffect(() => {
    if (isProtocol && !availableTiers.includes(selectedTier)) {
      setSelectedTier(availableTiers[0]);
    }
  }, [isProtocol, selectedProtocol, availableTiers, selectedTier]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setErrorPartial(false);
    setErrorMultiLine(false);
    try {
      if (isProtocol) {
        const result = await onSave(selectedProtocol, selectedTier);
        if (!result.success) {
          setError(result.message || 'Failed to update');
          setErrorPartial(result.partial === true);
          setErrorMultiLine(result.multiLine === true);
        }
      } else if (onSaveFormula) {
        const result = await onSaveFormula(selectedFormulaId, selectedPackSize);
        if (!result.success) {
          setError(result.message || 'Failed to update');
          setErrorPartial(result.partial === true);
          setErrorMultiLine(result.multiLine === true);
        }
      } else {
        setError('Formula changes are not yet supported. Contact support.');
        setErrorPartial(false);
        setErrorMultiLine(false);
      }
    } catch {
      setError('Something went wrong. Please try again.');
      setErrorPartial(false);
      setErrorMultiLine(false);
    } finally {
      setSaving(false);
    }
  };

  const hasProtocolChanges =
    isProtocol &&
    (selectedProtocol !== initialProtocolRef.current ||
      selectedTier !== initialTierRef.current);
  const hasFormulaChanges =
    !isProtocol &&
    (selectedFormulaId !== initialFormulaRef.current ||
      selectedPackSize !== initialPackRef.current);
  const hasChanges = hasProtocolChanges || hasFormulaChanges;
  const canSaveFormula = !isProtocol && !!onSaveFormula;

  return {
    // State values
    selectedProtocol,
    selectedTier,
    selectedFormulaId,
    selectedPackSize,
    error,
    errorPartial,
    errorMultiLine,
    saving,
    mobileStep,
    // Setters
    setSelectedProtocol,
    setSelectedTier,
    setSelectedFormulaId,
    setSelectedPackSize,
    setMobileStep,
    // Refs (for isCurrent checks in panels)
    initialProtocolRef,
    initialTierRef,
    initialFormulaRef,
    initialPackRef,
    // Derived
    hasProtocolChanges,
    hasFormulaChanges,
    hasChanges,
    canSaveFormula,
    availableTiers,
    // Actions
    handleSave,
  };
}
