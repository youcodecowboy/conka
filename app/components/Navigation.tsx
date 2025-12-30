"use client";

import { useState, useEffect, useRef } from "react";
import { CiBeaker1 } from "react-icons/ci";
import { protocolContent } from "@/app/lib/productData";

interface NavigationProps {
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

export default function Navigation({ cartOpen, setCartOpen }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const shopDropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        shopDropdownRef.current &&
        !shopDropdownRef.current.contains(event.target as Node)
      ) {
        setShopDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
              <a href="/#science" className="font-clinical text-sm tracking-wide hover:opacity-70 transition-all flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 1 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
                The Science
              </a>
              <a href="/#ingredients" className="font-clinical text-sm tracking-wide hover:opacity-70 transition-all flex items-center gap-2">
                <CiBeaker1 size={16} />
                Ingredients
              </a>
              <a href="/#results" className="font-clinical text-sm tracking-wide hover:opacity-70 transition-all flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                Results
              </a>
              <a href="/#story" className="font-clinical text-sm tracking-wide hover:opacity-70 transition-all flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                Our Story
              </a>

              {/* Shop Dropdown */}
              <div ref={shopDropdownRef} className="relative">
                <button
                  onClick={() => setShopDropdownOpen(!shopDropdownOpen)}
                  className="px-6 py-1.5 rounded-full bg-transparent font-clinical text-sm border-2 border-current hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                  Shop
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform ${shopDropdownOpen ? "rotate-180" : ""}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {shopDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-[800px] bg-[var(--background)] border-2 border-current rounded-lg shadow-lg overflow-hidden z-50">
                    {/* Quiz CTA */}
                    <a
                      href="/quiz"
                      className="block p-4 bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-opacity border-b-2 border-current relative"
                      onClick={() => setShopDropdownOpen(false)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                            <line x1="12" y1="17" x2="12.01" y2="17"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-bold text-white">Find Your Protocol</p>
                            <span className="px-2 py-0.5 bg-green-500 text-white font-clinical text-xs font-bold rounded-full">RECOMMENDED</span>
                          </div>
                          <p className="font-clinical text-xs opacity-80 text-white">Take our 2-minute quiz to find your perfect match.</p>
                        </div>
                      </div>
                    </a>

                    {/* Protocols Section - 2x2 Grid */}
                    <div className="p-4 border-b-2 border-current">
                      <div className="flex items-center gap-2 mb-4">
                        <p className="font-clinical text-xs uppercase opacity-50">Protocols</p>
                        <p className="font-primary text-xs opacity-70">mixed plans for maximum performance</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {(["1", "2", "3", "4"] as const).map((protocolId) => {
                          const protocol = protocolContent[protocolId];
                          const iconMap = {
                            shield: (
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                              </svg>
                            ),
                            bolt: (
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                              </svg>
                            ),
                            balance: (
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="3" x2="12" y2="21" />
                                <path d="M3 12h18" />
                                <circle cx="6" cy="8" r="3" />
                                <circle cx="18" cy="8" r="3" />
                                <circle cx="6" cy="16" r="3" />
                                <circle cx="18" cy="16" r="3" />
                              </svg>
                            ),
                            crown: (
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                              </svg>
                            ),
                          };
                          
                          return (
                            <a
                              key={protocolId}
                              href={`/protocol/${protocolId}`}
                              className="block p-3 rounded border-2 border-transparent hover:border-current hover:bg-current/5 transition-all"
                              onClick={() => setShopDropdownOpen(false)}
                            >
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 flex items-center justify-center text-[#AAB9BC] flex-shrink-0">
                                  {iconMap[protocol.icon as keyof typeof iconMap]}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-bold text-sm mb-1">{protocol.name}</p>
                                  <p className="font-clinical text-xs opacity-70 leading-relaxed">{protocol.subtitle}</p>
                                </div>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    </div>

                    {/* Individual Formulas - Side by Side */}
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <p className="font-clinical text-xs uppercase opacity-50">Individual Formulas</p>
                        <p className="font-primary text-xs opacity-70">Order Conka individually</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <a
                          href="/conka-flow"
                          className="flex items-center gap-3 p-3 rounded border-2 border-transparent hover:border-current hover:bg-current/5 transition-all"
                          onClick={() => setShopDropdownOpen(false)}
                        >
                          <span className="w-8 h-8 bg-[#AAB9BC] rounded-sm flex-shrink-0"></span>
                          <div>
                            <span className="font-bold text-sm block">Conka Flow</span>
                            <span className="font-clinical text-xs opacity-70">Caffeine-Free Focus</span>
                          </div>
                        </a>
                        <a
                          href="/conka-clarity"
                          className="flex items-center gap-3 p-3 rounded border-2 border-transparent hover:border-current hover:bg-current/5 transition-all"
                          onClick={() => setShopDropdownOpen(false)}
                        >
                          <span className="w-8 h-8 bg-amber-500 rounded-sm flex-shrink-0"></span>
                          <div>
                            <span className="font-bold text-sm block">Conka Clarity</span>
                            <span className="font-clinical text-xs opacity-70">Peak Performance Boost</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
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

          {/* Mobile - Menu Only (Cart moved to menu) */}
          <div className="lg:hidden flex items-center">
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
        <div className="lg:hidden fixed inset-0 z-40 bg-[var(--background)] flex flex-col">
          {/* Scrollable Content - Centered vertically */}
          <div className="flex-1 overflow-y-auto p-6 pb-16 flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
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

            {/* Content - With top spacing */}
            <div className="mt-4">
              {/* Quiz CTA - Prominent with RECOMMENDED tag - FIRST */}
              <div className="block p-3 mb-4 bg-black text-white rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <p className="font-bold text-base">Find Your Protocol</p>
                      <span className="px-1.5 py-0.5 bg-green-500 text-white font-clinical text-[10px] font-bold rounded-full">RECOMMENDED</span>
                    </div>
                    <p className="font-clinical text-xs opacity-80">2-minute quiz</p>
                  </div>
                </div>
                <a
                  href="/quiz"
                  className="block w-full py-2 bg-white text-black text-center font-bold text-sm rounded-lg hover:opacity-90 transition-opacity"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Take the Quiz
                </a>
              </div>

              {/* Shop Protocols Section */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <p className="font-clinical text-xs uppercase opacity-50">Shop Protocols</p>
                  <p className="font-primary text-xs opacity-70">mixed plans</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <a href="/protocol/1" className="py-2 px-3 flex items-center gap-2 border-2 border-black/10 rounded-lg hover:border-black/30 transition-all" onClick={() => setMobileMenuOpen(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 flex-shrink-0">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <div>
                      <p className="font-bold text-sm">Protocol 1</p>
                      <p className="font-clinical text-xs opacity-70">F01 Daily</p>
                    </div>
                  </a>
                  <a href="/protocol/2" className="py-2 px-3 flex items-center gap-2 border-2 border-black/10 rounded-lg hover:border-black/30 transition-all" onClick={() => setMobileMenuOpen(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 flex-shrink-0">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                    <div>
                      <p className="font-bold text-sm">Protocol 2</p>
                      <p className="font-clinical text-xs opacity-70">F02 Daily</p>
                    </div>
                  </a>
                  <a href="/protocol/3" className="py-2 px-3 flex items-center gap-2 border-2 border-black/10 rounded-lg hover:border-black/30 transition-all" onClick={() => setMobileMenuOpen(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 flex-shrink-0">
                      <line x1="12" y1="3" x2="12" y2="21" />
                      <path d="M3 12h18" />
                    </svg>
                    <div>
                      <p className="font-bold text-sm">Protocol 3</p>
                      <p className="font-clinical text-xs opacity-70">Balanced</p>
                    </div>
                  </a>
                  <a href="/protocol/4" className="py-2 px-3 flex items-center gap-2 border-2 border-black/10 rounded-lg hover:border-black/30 transition-all" onClick={() => setMobileMenuOpen(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 flex-shrink-0">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                    <div>
                      <p className="font-bold text-sm">Protocol 4</p>
                      <p className="font-clinical text-xs opacity-70">Ultimate</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Individual Formulas Section */}
              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2">
                  <p className="font-clinical text-xs uppercase opacity-50">Individual Formulas</p>
                  <p className="font-primary text-xs opacity-70">order individually</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <a href="/conka-flow" className="py-2 px-3 flex items-center gap-2 border-2 border-black/10 rounded-lg hover:border-black/30 transition-all" onClick={() => setMobileMenuOpen(false)}>
                    <span className="w-3 h-3 bg-[#AAB9BC] rounded-sm flex-shrink-0"></span>
                    <span className="font-bold text-sm">Conka Flow</span>
                  </a>
                  <a href="/conka-clarity" className="py-2 px-3 flex items-center gap-2 border-2 border-black/10 rounded-lg hover:border-black/30 transition-all" onClick={() => setMobileMenuOpen(false)}>
                    <span className="w-3 h-3 bg-amber-500 rounded-sm flex-shrink-0"></span>
                    <span className="font-bold text-sm">Conka Clarity</span>
                  </a>
                </div>
              </div>

              {/* Navigation Label - Now at the bottom */}
              <p className="font-clinical text-xs uppercase opacity-50 mb-2">Navigation</p>
              
              {/* Main Nav Links - 2x2 Grid with Icons */}
              <nav className="grid grid-cols-2 gap-2">
                <a 
                  href="/#science" 
                  className="flex items-center gap-2 py-2 px-3 border-2 border-black/10 rounded-lg hover:border-black/30 transition-all" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 flex-shrink-0">
                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 1 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                  <span className="font-clinical text-sm tracking-wide">The Science</span>
                </a>
                <a 
                  href="/#ingredients" 
                  className="flex items-center gap-2 py-2 px-3 border-2 border-black/10 rounded-lg hover:border-black/30 transition-all" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <CiBeaker1 size={16} className="opacity-60 flex-shrink-0" />
                  <span className="font-clinical text-sm tracking-wide">Ingredients</span>
                </a>
                <a 
                  href="/#results" 
                  className="flex items-center gap-2 py-2 px-3 border-2 border-black/10 rounded-lg hover:border-black/30 transition-all" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 flex-shrink-0">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <span className="font-clinical text-sm tracking-wide">Results</span>
                </a>
                <a 
                  href="/#story" 
                  className="flex items-center gap-2 py-2 px-3 border-2 border-black/10 rounded-lg hover:border-black/30 transition-all" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 flex-shrink-0">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  <span className="font-clinical text-sm tracking-wide">Our Story</span>
                </a>
              </nav>
            </div>
          </div>

          {/* Cart & Checkout Section */}
          <div className="px-6 py-4 bg-[var(--background)] border-t-2 border-black">
            <div className="flex gap-3">
              <button 
                onClick={() => { setCartOpen(true); setMobileMenuOpen(false); }}
                className="flex-1 bg-transparent border-2 border-black text-black px-4 py-3 font-semibold text-sm rounded-lg flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                View Cart
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); }}
                className="flex-1 bg-black text-white px-4 py-3 font-bold text-sm rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                  <line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
