import React from 'react';
import { Home, Car, Wrench, ArrowLeftRight, Heart, MessageCircle, ArrowLeft } from 'lucide-react';
import { Vehicle } from '../data/vehicles';

interface MobileBottomDockProps {
  currentView: string;
  selectedVehicle: Vehicle | null;
  onNavigate: (view: string) => void;
  onBackToInventory: () => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
}

export const MobileBottomDock: React.FC<MobileBottomDockProps> = ({
  currentView,
  selectedVehicle,
  onNavigate,
  onBackToInventory,
  favoritesCount,
  onOpenFavorites,
}) => {
  // If user is deep inside a single vehicle's story, show conversion action dock
  if (selectedVehicle) {
    return (
      <div className="fixed bottom-3 inset-x-3 z-40 md:hidden animate-apple-up">
        <div className="bg-white/95 backdrop-blur-xl border border-black/10 rounded-full px-4 py-2.5 shadow-2xl flex items-center justify-between gap-3 text-[#1d1d1f]">
          <button
            onClick={onBackToInventory}
            className="w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 text-[#1d1d1f] flex items-center justify-center shrink-0 cursor-pointer active:scale-95 transition-transform"
            title="Back to fleet"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="min-w-0 flex-1">
            <span className="text-[11px] text-[#86868b] block truncate">
              {selectedVehicle.name}
            </span>
            <span className="text-[14px] font-bold text-[#1d1d1f] block leading-tight">
              KES {selectedVehicle.priceKes.toLocaleString()}
            </span>
          </div>

          <a
            href={`https://wa.me/254714333888?text=Hello%20Cars%20R%20Us,%20I%20am%20ready%20to%20reserve%20or%20inspect%20the%20${encodeURIComponent(selectedVehicle.name)}%20(${selectedVehicle.stockNo}).`}
            target="_blank"
            rel="noopener noreferrer"
            className="pricing-blue-pill !py-2 !px-4 text-[13px] font-semibold shrink-0 shadow-lg active:scale-95 transition-transform"
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            <span>Inquire</span>
          </a>
        </div>
      </div>
    );
  }

  // Standard Mobile Thumb Dock (Home, Fleet, Workshop, Valuation, Saved, WhatsApp)
  const navItems = [
    { id: 'overview', label: 'Home', icon: Home },
    { id: 'inventory', label: 'Fleet', icon: Car },
    { id: 'trade-in', label: 'Trade-In', icon: ArrowLeftRight },
    { id: 'workshop', label: 'Service', icon: Wrench },
  ];

  return (
    <div className="fixed bottom-3 inset-x-3 z-40 md:hidden animate-apple-up">
      <div className="bg-white/95 backdrop-blur-xl border border-black/10 rounded-full px-3 py-1.5 shadow-2xl flex items-center justify-around text-[#1d1d1f]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-full transition-all cursor-pointer active:scale-90 ${
                isActive ? 'text-[#0071e3]' : 'text-[#86868b] hover:text-[#1d1d1f]'
              }`}
            >
              <div className={`p-1 rounded-full ${isActive ? 'bg-[#0071e3]/10' : ''}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight ${isActive ? 'font-semibold text-[#0071e3]' : 'font-normal'}`}>
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Saved Vehicles with Live Badge */}
        <button
          onClick={onOpenFavorites}
          className="flex flex-col items-center justify-center py-1 px-2.5 text-[#86868b] hover:text-[#1d1d1f] transition-all cursor-pointer active:scale-90 relative"
        >
          <div className="p-1 rounded-full relative">
            <Heart className="w-4 h-4" />
            {favoritesCount > 0 && (
              <span className="absolute -top-0.5 -right-1 bg-[#0071e3] text-white text-[8px] w-3 h-3 rounded-full flex items-center justify-center font-bold">
                {favoritesCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Saved</span>
        </button>

        {/* Direct WhatsApp Concierge */}
        <a
          href="https://wa.me/254714333888?text=Hello%20Cars%20R%20Us,%20I%20am%20inquiring%20about%20your%20fleet."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-2.5 text-[#1d1d1f] transition-all cursor-pointer active:scale-90 relative"
          title="WhatsApp Concierge"
        >
          <div className="p-1 rounded-full bg-black/5 border border-black/10 relative">
            <MessageCircle className="w-4 h-4 text-[#0071e3]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3] absolute top-0.5 right-0.5 animate-pulse" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Chat</span>
        </a>
      </div>
    </div>
  );
};
