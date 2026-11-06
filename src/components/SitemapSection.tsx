import React from 'react';
import { Compass, Car, Filter, Wrench, MapPin, BadgeDollarSign, Shield, ArrowRight } from 'lucide-react';
import { Vehicle } from '../data/vehicles';

interface SitemapSectionProps {
  vehicles: Vehicle[];
  onNavigate: (view: string, param?: string) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
}

export const SitemapSection: React.FC<SitemapSectionProps> = ({
  vehicles,
  onNavigate,
  onSelectVehicle,
}) => {
  return (
    <section className="w-full bg-[#f5f5f7] py-16 px-6">
      <div className="max-w-[1240px] mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-[680px] mx-auto">
          <span className="launch-status-label mb-2">
            Architecture & Navigation Index
          </span>
          <h1 className="hero-display mb-4">
            Site Map.
          </h1>
          <p className="text-[17px] text-[#707070] leading-[1.47]" style={{ letterSpacing: '-0.374px' }}>
            The complete directory of all vehicles, engineering divisions, trade-in studios, showroom locations, and operational policies.
          </p>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Box 1: Platform Hubs */}
          <div className="apple-card p-8 bg-white">
            <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-[#e6e6e8]">
              <Compass className="w-5 h-5 text-[#0071e3]" />
              <h3 className="text-[18px] font-semibold text-[#1d1d1f]">Primary Platform</h3>
            </div>
            <ul className="space-y-3 text-[14px]">
              <li>
                <button
                  onClick={() => onNavigate('overview')}
                  className="font-medium text-[#1d1d1f] hover:text-[#0071e3] text-left cursor-pointer"
                >
                  Overview / Flagship Showcase
                </button>
                <p className="text-[12px] text-[#707070]">Hero cinematic stage & company overview.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('inventory')}
                  className="font-medium text-[#1d1d1f] hover:text-[#0071e3] text-left cursor-pointer"
                >
                  Curated Showroom Fleet
                </button>
                <p className="text-[12px] text-[#707070]">Interactive vehicle catalog with filters.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('workshop')}
                  className="font-medium text-[#1d1d1f] hover:text-[#0071e3] text-left cursor-pointer"
                >
                  Mombasa In-House Workshop
                </button>
                <p className="text-[12px] text-[#707070]">48-hour overhaul and 100-point protocol.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('trade-in')}
                  className="font-medium text-[#1d1d1f] hover:text-[#0071e3] text-left cursor-pointer"
                >
                  Trade-In & Valuation Studio
                </button>
                <p className="text-[12px] text-[#707070]">Interactive equity appraisal calculator.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="font-medium text-[#1d1d1f] hover:text-[#0071e3] text-left cursor-pointer"
                >
                  Heritage & Japanese Bidding
                </button>
                <p className="text-[12px] text-[#707070]">26-year story and USS Tokyo sourcing.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('locations')}
                  className="font-medium text-[#1d1d1f] hover:text-[#0071e3] text-left cursor-pointer"
                >
                  Showrooms & VIP Test Drives
                </button>
                <p className="text-[12px] text-[#707070]">Mombasa Tangana/Nyali & Nairobi Westlands.</p>
              </li>
            </ul>
          </div>

          {/* Box 2: Dedicated Car Pages */}
          <div className="apple-card p-8 bg-white">
            <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-[#e6e6e8]">
              <Car className="w-5 h-5 text-[#0071e3]" />
              <h3 className="text-[18px] font-semibold text-[#1d1d1f]">Vehicle Product Pages</h3>
            </div>
            <ul className="space-y-3 text-[14px]">
              {vehicles.map((v) => (
                <li key={v.id}>
                  <button
                    onClick={() => onSelectVehicle(v)}
                    className="font-medium text-[#1d1d1f] hover:text-[#0071e3] text-left cursor-pointer"
                  >
                    {v.name}
                  </button>
                  <p className="text-[12px] text-[#707070]">
                    Stock #{v.stockNo} · KES {v.priceKes.toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Box 3: Technical & Workshop Protocol */}
          <div className="apple-card p-8 bg-white">
            <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-[#e6e6e8]">
              <Wrench className="w-5 h-5 text-[#0071e3]" />
              <h3 className="text-[18px] font-semibold text-[#1d1d1f]">Workshop & Quality</h3>
            </div>
            <ul className="space-y-3 text-[14px]">
              <li>
                <button
                  onClick={() => onNavigate('workshop')}
                  className="font-medium text-[#1d1d1f] hover:text-[#0071e3] text-left cursor-pointer"
                >
                  100-Point Pre-Delivery Protocol
                </button>
                <p className="text-[12px] text-[#707070]">Full checklist covering 6 mechanical stages.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('workshop')}
                  className="font-medium text-[#1d1d1f] hover:text-[#0071e3] text-left cursor-pointer"
                >
                  5,000 km Warranty Covenant
                </button>
                <p className="text-[12px] text-[#707070]">Covered powertrain and driveline terms.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('workshop')}
                  className="font-medium text-[#1d1d1f] hover:text-[#0071e3] text-left cursor-pointer"
                >
                  Synthetic Lubricant Overhaul
                </button>
                <p className="text-[12px] text-[#707070]">Castrol Edge synthetic oil specification.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('workshop')}
                  className="font-medium text-[#1d1d1f] hover:text-[#0071e3] text-left cursor-pointer"
                >
                  Computer Diagnostic Module Scans
                </button>
                <p className="text-[12px] text-[#707070]">OBD-II ECU scans using factory software.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('workshop')}
                  className="font-medium text-[#1d1d1f] hover:text-[#0071e3] text-left cursor-pointer"
                >
                  Hybrid Battery Health Certification
                </button>
                <p className="text-[12px] text-[#707070]">Delta voltage & SOH load analysis.</p>
              </li>
            </ul>
          </div>

          {/* Box 4: Showrooms & Desks */}
          <div className="apple-card p-8 bg-white">
            <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-[#e6e6e8]">
              <MapPin className="w-5 h-5 text-[#0071e3]" />
              <h3 className="text-[18px] font-semibold text-[#1d1d1f]">Locations & Contact</h3>
            </div>
            <ul className="space-y-3 text-[14px]">
              <li>
                <button
                  onClick={() => onNavigate('locations')}
                  className="font-medium text-[#1d1d1f] hover:text-[#0071e3] text-left cursor-pointer"
                >
                  Mombasa Island Flagship (Tangana Rd)
                </button>
                <p className="text-[12px] text-[#707070]">Opposite AutoXpress · Tel: +254 714 333888.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('locations')}
                  className="font-medium text-[#1d1d1f] hover:text-[#0071e3] text-left cursor-pointer"
                >
                  Mombasa Nyali Branch (Links Rd)
                </button>
                <p className="text-[12px] text-[#707070]">Coast retail showroom & customer reception.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('locations')}
                  className="font-medium text-[#1d1d1f] hover:text-[#0071e3] text-left cursor-pointer"
                >
                  Nairobi Westlands Hub (Mwanzi Rd)
                </button>
                <p className="text-[12px] text-[#707070]">Opposite Westgate Mall · Tel: +254 748 999333.</p>
              </li>
              <li>
                <a
                  href="https://wa.me/254714333888"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#0066cc] hover:underline"
                >
                  WhatsApp Support Concierge
                </a>
                <p className="text-[12px] text-[#707070]">Instant auction sheet & photo requests.</p>
              </li>
            </ul>
          </div>

          {/* Box 5: Sourcing & Finance */}
          <div className="apple-card p-8 bg-white">
            <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-[#e6e6e8]">
              <BadgeDollarSign className="w-5 h-5 text-[#0071e3]" />
              <h3 className="text-[18px] font-semibold text-[#1d1d1f]">Financing & Sourcing</h3>
            </div>
            <ul className="space-y-3 text-[14px]">
              <li>
                <button
                  onClick={() => onNavigate('trade-in')}
                  className="font-medium text-[#1d1d1f] hover:text-[#0071e3] text-left cursor-pointer"
                >
                  Trade-In Valuation Studio
                </button>
                <p className="text-[12px] text-[#707070]">Apply current vehicle as direct equity.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="font-medium text-[#1d1d1f] hover:text-[#0071e3] text-left cursor-pointer"
                >
                  USS Tokyo & TAA Direct Bidding
                </button>
                <p className="text-[12px] text-[#707070]">Custom auction ordering direct from Japan.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('inventory')}
                  className="font-medium text-[#1d1d1f] hover:text-[#0071e3] text-left cursor-pointer"
                >
                  Asset Finance Partnerships
                </button>
                <p className="text-[12px] text-[#707070]">Up to 80% financing via NCBA, Stanbic, I&M.</p>
              </li>
            </ul>
          </div>

          {/* Box 6: Standards & Legal */}
          <div className="apple-card p-8 bg-white">
            <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-[#e6e6e8]">
              <Shield className="w-5 h-5 text-[#0071e3]" />
              <h3 className="text-[18px] font-semibold text-[#1d1d1f]">Import Standards & Legal</h3>
            </div>
            <ul className="space-y-3 text-[14px]">
              <li>
                <span className="font-medium text-[#1d1d1f]">KRA Duty Clearance</span>
                <p className="text-[12px] text-[#707070]">All import duties, VAT, and levies paid in full.</p>
              </li>
              <li>
                <span className="font-medium text-[#1d1d1f]">QISJ / JEVIC Certification</span>
                <p className="text-[12px] text-[#707070]">Authenticated Japanese odometer certificates.</p>
              </li>
              <li>
                <span className="font-medium text-[#1d1d1f]">NTSA TIMS Registration</span>
                <p className="text-[12px] text-[#707070]">Clean logbook transfer directly into client name.</p>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
