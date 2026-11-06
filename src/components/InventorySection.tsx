import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown, Shield, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Vehicle } from '../data/vehicles';
import { VehicleCard } from './VehicleCard';

interface InventorySectionProps {
  vehicles: Vehicle[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onCustomImportRequest: () => void;
}

export const InventorySection: React.FC<InventorySectionProps> = ({
  vehicles,
  favorites,
  onToggleFavorite,
  onSelectVehicle,
  onCustomImportRequest,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'year'>('featured');

  const categories = [
    { id: 'all', label: 'All Fleet', count: vehicles.length },
    { id: 'suv', label: 'SUVs & 4WD', count: vehicles.filter(v => v.category === 'suv').length },
    { id: 'hybrid', label: 'Hybrids & e-POWER', count: vehicles.filter(v => v.category === 'hybrid' || v.fuelType.includes('Hybrid') || v.fuelType.includes('e-POWER')).length },
    { id: 'van', label: 'Executive MPVs', count: vehicles.filter(v => v.category === 'van').length },
    { id: 'compact', label: 'Compact & Crossovers', count: vehicles.filter(v => v.category === 'compact').length },
  ];

  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((v) => {
        // Category filter
        if (activeCategory === 'all') return true;
        if (activeCategory === 'hybrid') {
          return v.category === 'hybrid' || v.fuelType.toLowerCase().includes('hybrid') || v.fuelType.toLowerCase().includes('power');
        }
        return v.category === activeCategory;
      })
      .filter((v) => {
        // Search query
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          v.name.toLowerCase().includes(q) ||
          v.stockNo.toLowerCase().includes(q) ||
          v.tagline.toLowerCase().includes(q) ||
          v.bodyType.toLowerCase().includes(q) ||
          v.engine.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceKes - b.priceKes;
        if (sortBy === 'price-desc') return b.priceKes - a.priceKes;
        if (sortBy === 'year') return b.year - a.year;
        return 0; // featured order
      });
  }, [vehicles, activeCategory, searchQuery, sortBy]);

  return (
    <section className="w-full bg-[#f5f5f7] py-16 px-6">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-[680px] mx-auto mb-10">
          <span className="launch-status-label mb-2">
            Cleared & Ready For Handover
          </span>
          <h2 className="hero-display mb-4">
            The Japanese Fleet.
          </h2>
          <p className="text-[17px] text-[#707070] leading-[1.47]" style={{ letterSpacing: '-0.374px' }}>
            Every vehicle has completed our 48-hour Mombasa workshop overhaul, includes a 5,000 km warranty covenant, and carries an authenticated Grade 4.5+ Japanese auction sheet.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-[24px] border border-[#d6d6d6] mb-10 space-y-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#1d1d1f] text-white shadow-xs'
                      : 'bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e6e6e8]'
                  }`}
                >
                  {cat.label} ({cat.count})
                </button>
              );
            })}
          </div>

          {/* Search Input & Sort Selector */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-[#f5f5f7]">
            <div className="relative w-full sm:flex-1">
              <Search className="w-4 h-4 text-[#86868b] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by model, chassis, or stock code (e.g. RAV4, CRU-4062, Hybrid)..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-[#f5f5f7] border border-[#e6e6e8] text-[13px] text-[#1d1d1f] placeholder:text-[#86868b] focus:outline-none focus:border-[#0071e3]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] text-[#86868b] hover:text-[#1d1d1f]"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-[12px] text-[#86868b] hidden sm:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 rounded-full bg-[#f5f5f7] border border-[#e6e6e8] text-[12px] font-medium text-[#1d1d1f] focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured Collection</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="year">Newest Year</option>
              </select>

              <span className="text-[12px] text-[#86868b] font-medium ml-2">
                {filteredVehicles.length} {filteredVehicles.length === 1 ? 'vehicle' : 'vehicles'}
              </span>
            </div>
          </div>

        </div>

        {/* Vehicles Grid */}
        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                isFavorite={favorites.includes(vehicle.id)}
                onToggleFavorite={onToggleFavorite}
                onSelect={onSelectVehicle}
              />
            ))}
          </div>
        ) : (
          <div className="apple-card p-12 text-center bg-white">
            <h3 className="text-[20px] font-semibold text-[#1d1d1f] mb-2">No matching vehicles found</h3>
            <p className="text-[14px] text-[#707070] mb-6">
              We update our showroom with fresh vessel arrivals weekly from Tokyo, Yokohama, and Nagoya.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="outlined-explore-pill cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Custom Bidding Sourcing Callout */}
        <div className="apple-card p-8 md:p-12 mt-12 bg-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-[580px]">
            <span className="launch-status-label mb-1">Direct Japanese Bidding</span>
            <h3 className="text-[24px] font-semibold text-[#1d1d1f] mb-2">Looking for a specific model or color?</h3>
            <p className="text-[14px] text-[#707070] leading-relaxed">
              We execute weekly live bids directly at USS Tokyo, CAA, and TAA. Our Japanese team physically inspects your desired vehicle before purchase.
            </p>
          </div>
          <button
            onClick={onCustomImportRequest}
            className="pricing-blue-pill-lg shrink-0 cursor-pointer"
          >
            <span>Commission Custom Import</span>
          </button>
        </div>

      </div>
    </section>
  );
};
