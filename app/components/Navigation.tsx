"use client";

import { useState, useEffect } from "react";
import { CiBeaker1 } from "react-icons/ci";

interface NavigationProps {
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

export default function Navigation({ cartOpen, setCartOpen }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only hide header when scrolling down past a threshold
      if (currentScrollY > 100) {
        setIsScrollingDown(currentScrollY > lastScrollY);
      } else {
        setIsScrollingDown(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Header - Edge to edge */}
      <header className={`w-full lg:fixed top-0 left-0 right-0 z-50 bg-[var(--background)] transition-transform duration-300 border-b-2 border-current border-opacity-10 ${
        isScrollingDown ? "lg:-translate-y-full" : "lg:translate-y-0"
      }`}>
        <div className="px-6 md:px-16 py-6 flex justify-between items-center">
          {/* Logo - Left (links to home) */}
          <a href="/" className="flex items-center">
            <span className="text-2xl md:text-3xl font-bold tracking-tight font-primary">conka.</span>
          </a>
          
          {/* Desktop Navigation & Cart - Right */}
          <div className="hidden lg:flex items-center">
            <nav className="flex items-center gap-6">
              <a href="#" className="font-clinical text-sm tracking-wide hover:opacity-70 transition-all flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 1 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
                The Science
              </a>
              <a href="#" className="font-clinical text-sm tracking-wide hover:opacity-70 transition-all flex items-center gap-2">
                <CiBeaker1 size={16} />
                Ingredients
              </a>
              <a href="#" className="font-clinical text-sm tracking-wide hover:opacity-70 transition-all flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                Results
              </a>
              <a href="#" className="font-clinical text-sm tracking-wide hover:opacity-70 transition-all flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                Our Story
              </a>
              <a href="#" className="px-6 py-1.5 rounded-full bg-transparent text-black font-clinical text-sm border-2 border-black hover:bg-black hover:text-white transition-all flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                Shop
              </a>
            </nav>
            <button 
              onClick={() => setCartOpen(true)}
              className="ml-6 p-2 hover:opacity-70 transition-all"
              aria-label="Open cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </button>
          </div>

          {/* Mobile - Cart & Menu */}
          <div className="lg:hidden flex items-center gap-2">
            <button 
              onClick={() => setCartOpen(true)}
              className="p-2 hover:opacity-70 transition-all"
              aria-label="Open cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:opacity-70 transition-all"
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <line x1="3" y1="12" x2="21" y2="12"/>
                    <line x1="3" y1="18" x2="21" y2="18"/>
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-[var(--background)]">
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-between items-center mb-12">
              <a href="/" className="flex items-center">
                <span className="text-3xl font-bold tracking-tight font-primary">conka.</span>
              </a>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2"
                aria-label="Close menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              <a href="#" className="font-clinical text-2xl tracking-wide">The Science</a>
              <a href="#" className="font-clinical text-2xl tracking-wide">Ingredients</a>
              <a href="#" className="font-clinical text-2xl tracking-wide">Results</a>
              <a href="#" className="font-clinical text-2xl tracking-wide">Our Story</a>
              <a href="#" className="font-clinical text-2xl tracking-wide">Shop</a>
            </nav>
            <div className="mt-auto">
              <button 
                onClick={() => { setCartOpen(true); setMobileMenuOpen(false); }}
                className="w-full px-8 py-4 rounded-full bg-black text-white font-semibold text-lg flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

