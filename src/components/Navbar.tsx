import React, { useState } from 'react';
import { Search, Heart, MessageCircle, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
  favoritesCount: number;
  onOpenSearch: () => void;
  onOpenFavorites: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  favoritesCount,
  onOpenSearch,
  onOpenFavorites,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'overview', label: 'Overview' },
    { id: 'inventory', label: 'Vehicles' },
    { id: 'workshop', label: 'Mombasa Workshop' },
    { id: 'trade-in', label: 'Trade-In' },
    { id: 'about', label: 'About' },
    { id: 'locations', label: 'Locations' },
    { id: 'sitemap', label: 'Site Map' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav className="w-full bg-white border-b border-[#e6e6e8] h-[44px] flex items-center justify-center px-4 sm:px-6 sticky top-0 z-50">
        <div className="max-w-[1240px] w-full flex items-center justify-between text-[12px] font-normal text-[#1d1d1f]/80" style={{ letterSpacing: '-0.12px' }}>
          
          {/* Brand Logo from Original Site */}
          <button
            onClick={() => handleLinkClick('overview')}
            className="flex items-center gap-2.5 font-semibold text-[#1d1d1f] hover:opacity-85 transition-opacity cursor-pointer shrink-0"
          >
            <img
              src="./carsrus-logo.png"
              alt="Cars 'R' Us Kenya Logo"
              className="h-6 sm:h-7 w-auto object-contain"
            />
            <span className="font-semibold text-[13px] tracking-tight hidden sm:inline text-[#1d1d1f]">Cars 'R' Us</span>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`transition-colors cursor-pointer ${
                    isActive ? 'text-[#1d1d1f] font-semibold' : 'text-[#1d1d1f]/75 hover:text-[#1d1d1f]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Utility Actions */}
          <div className="flex items-center gap-4 text-[#1d1d1f]">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="hover:text-[#0071e3] transition-colors p-1 cursor-pointer"
              title="Search inventory"
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            {/* Saved Vehicles Trigger */}
            <button
              onClick={onOpenFavorites}
              className="hover:text-[#0071e3] transition-colors p-1 relative cursor-pointer"
              title="Saved vehicles"
            >
              <Heart className="w-3.5 h-3.5" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-[#0071e3] text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-semibold">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Concierge Link */}
            <a
              href="https://wa.me/254714333888?text=Hello%20Cars%20R%20Us,%20I%20am%20inquiring%20about%20your%20verified%20Japanese%20fleet."
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0071e3] transition-colors hidden sm:flex items-center gap-1.5 font-medium text-[11px]"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#0071e3]" />
              <span>Concierge</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1 text-[#1d1d1f] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[44px] bg-white z-40 p-6 flex flex-col justify-between md:hidden animate-in fade-in duration-200 overflow-y-auto">
          <div className="space-y-4 pt-4">
            <span className="text-[11px] font-semibold text-[#86868b] uppercase tracking-wider block mb-2">Navigation</span>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="w-full text-left py-2.5 text-[18px] font-medium text-[#1d1d1f] border-b border-[#f5f5f7] flex items-center justify-between"
              >
                <span>{link.label}</span>
                {currentView === link.id && <span className="text-[12px] text-[#0071e3] font-semibold">Current</span>}
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-[#e6e6e8] space-y-3">
            <a
              href="https://wa.me/254714333888"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full pricing-blue-pill-lg text-center justify-center flex"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Concierge (+254 714 333888)</span>
            </a>
            <p className="text-center text-[12px] text-[#86868b]">
              Mombasa Island & Nairobi Westlands
            </p>
          </div>
        </div>
      )}
    </>
  );
};
