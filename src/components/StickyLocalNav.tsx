import React from 'react';
import { ArrowLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { Vehicle } from '../data/vehicles';

interface StickyLocalNavProps {
  currentView: string;
  selectedVehicle: Vehicle | null;
  onNavigate: (view: string, param?: string) => void;
  onBackToInventory: () => void;
}

export const StickyLocalNav: React.FC<StickyLocalNavProps> = ({
  currentView,
  selectedVehicle,
  onNavigate,
  onBackToInventory,
}) => {
  // If viewing an individual car
  if (currentView === 'vehicle-detail' && selectedVehicle) {
    return (
      <div className="sticky top-[44px] z-40 bg-white/90 backdrop-blur-md border-b border-[#d6d6d6] transition-all">
        <div className="max-w-[1240px] mx-auto px-6 h-[52px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToInventory}
              className="text-[12px] text-[#707070] hover:text-[#1d1d1f] flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Fleet</span>
            </button>
            <span className="text-[#d6d6d6]">|</span>
            <span className="font-semibold text-[#1d1d1f] text-[15px] sm:text-[18px] tracking-tight truncate max-w-[200px] sm:max-w-none">
              {selectedVehicle.name}
            </span>
            <span className="hidden md:inline text-[12px] text-[#86868b] bg-[#f5f5f7] px-2.5 py-0.5 rounded-full font-medium">
              {selectedVehicle.stockNo}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[14px] font-semibold text-[#1d1d1f] hidden sm:inline">
              KES {selectedVehicle.priceKes.toLocaleString()}
            </span>
            <a
              href={`https://wa.me/254714333888?text=Hello%20Cars%20R%20Us,%20I%20am%20ready%20to%20reserve%20or%20inspect%20the%20${encodeURIComponent(selectedVehicle.name)}%20(${selectedVehicle.stockNo}).`}
              target="_blank"
              rel="noopener noreferrer"
              className="pricing-blue-pill"
            >
              Reserve / Inquire
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Section titles mapping
  const titleMap: Record<string, string> = {
    overview: 'The Japanese Import Collection',
    inventory: 'Verified Japanese Inventory',
    workshop: 'Mombasa Engineering Workshop',
    'trade-in': 'Trade-In & Valuation Studio',
    about: 'The Cars \'R\' Us Heritage',
    locations: 'Showroom Hubs & Concierge',
    sitemap: 'Site Map & Navigation Tree',
    favorites: 'Your Saved Showroom Fleet',
  };

  const currentTitle = titleMap[currentView] || 'Cars \'R\' Us Kenya';

  return (
    <div className="sticky top-[44px] z-40 bg-white/90 backdrop-blur-md border-b border-[#d6d6d6]">
      <div className="max-w-[1240px] mx-auto px-6 h-[52px] flex items-center justify-between">
        <div className="font-semibold text-[#1d1d1f] text-[16px] sm:text-[19px] tracking-tight flex items-center gap-2">
          <span>{currentTitle}</span>
        </div>

        <div className="flex items-center gap-3">
          {currentView !== 'workshop' && (
            <button
              onClick={() => onNavigate('workshop')}
              className="outlined-explore-pill hidden sm:inline-flex cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#0071e3]" />
              <span>5,000 km Warranty</span>
            </button>
          )}

          {currentView !== 'inventory' ? (
            <button
              onClick={() => onNavigate('inventory')}
              className="pricing-blue-pill cursor-pointer"
            >
              Browse Fleet
            </button>
          ) : (
            <button
              onClick={() => onNavigate('trade-in')}
              className="outlined-explore-pill cursor-pointer"
            >
              Trade-In Calculator
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
