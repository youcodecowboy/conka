"use client";

import { useState, useEffect, useRef } from "react";
import { MolecularStructure as MolecularStructureType } from "@/app/lib/ingredientsData";

interface MolecularStructureProps {
  structure: MolecularStructureType;
  ingredientName: string;
}

export function MolecularStructure({ structure, ingredientName }: MolecularStructureProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Using the simpler PubChem image URL format
  const imageUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/CID/${structure.pubchemCid}/PNG`;
  const pubchemUrl = `https://pubchem.ncbi.nlm.nih.gov/compound/${structure.pubchemCid}`;

  // Handle image load state more reliably
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // If image is already cached and complete
    if (img.complete && img.naturalHeight !== 0) {
      setIsLoading(false);
      return;
    }

    const handleLoad = () => {
      setIsLoading(false);
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
    };

    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);

    // Timeout fallback - if image doesn't load within 10 seconds, assume it's loaded
    // (sometimes onLoad doesn't fire for cached images)
    const timeout = setTimeout(() => {
      if (img.complete || img.naturalHeight > 0) {
        setIsLoading(false);
      }
    }, 3000);

    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
      clearTimeout(timeout);
    };
  }, [imageUrl]);

  // Reset states when structure changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [structure.pubchemCid]);

  return (
    <div className="neo-box p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="font-clinical text-xs opacity-50 uppercase">Chemical Structure</p>
        <a
          href={pubchemUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs opacity-60 hover:opacity-100 transition-opacity"
        >
          View on PubChem →
        </a>
      </div>
      
      <div className="relative bg-white rounded-lg p-4 flex items-center justify-center min-h-[200px]">
        {isLoading && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-white rounded-lg z-10">
            <div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin opacity-30" />
          </div>
        )}
        
        {hasError ? (
          <div className="text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Unable to load structure</p>
            <a 
              href={pubchemUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs hover:underline mt-1 inline-block"
            >
              View on PubChem
            </a>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={imgRef}
            src={imageUrl}
            alt={`${ingredientName} (${structure.activeCompound}) molecular structure`}
            className={`max-w-[250px] max-h-[250px] h-auto transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            crossOrigin="anonymous"
          />
        )}
      </div>
      
      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="font-clinical text-sm font-medium">{structure.activeCompound}</p>
          <p className="font-clinical text-xs opacity-50">Active Compound</p>
        </div>
        <div className="text-right">
          <p className="font-clinical text-xs opacity-50">PubChem CID</p>
          <p className="font-clinical text-sm">{structure.pubchemCid}</p>
        </div>
      </div>
    </div>
  );
}
