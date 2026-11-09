import React from 'react';
import { Vehicle } from '../data/vehicles';

interface FooterProps {
  vehicles: Vehicle[];
  onNavigate: (view: string, param?: string) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
}

export const Footer: React.FC<FooterProps> = ({
  vehicles,
  onNavigate,
  onSelectVehicle,
}) => {
  return (
    <footer className="w-full bg-[#f5f5f7] border-t border-[#d6d6d6] text-[#707070] text-[12px] py-12 px-6">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Footnote Disclaimers */}
        <div className="border-b border-[#d6d6d6] pb-8 mb-10 space-y-3 leading-[1.33]">
          <p>
            1. 5,000 km Warranty Covenant: The Cars 'R' Us 5,000 km / 3-Month Warranty applies to all verified retail passenger vehicles. Covers internal lubricated engine mechanical components and automatic transmission/transaxle assemblies. Subject to standard operating guidelines and documented service records at our approved workshop facilities.
          </p>
          <p>
            2. Transparent Vehicle Pricing: All quoted prices in Kenya Shillings (KES) are inclusive of 16% VAT, Import Duty, Excise Duty, and Railway Development Levy. Number plate registration and logbook transfer handled directly by our Mombasa documentation desk.
          </p>
          <p>
            3. Japanese Auction Grading: Grade 4.5 vehicles represent top-tier cosmetic and mechanical condition with genuine mileage verified by QISJ or JEVIC pre-shipment inspections.
          </p>
        </div>

        {/* Brand Logo & Identity Bar */}
        <div className="flex items-center gap-3 mb-10 pb-6 border-b border-[#e6e6e8]">
          <img
            src="/carsrus-logo.png"
            alt="Cars 'R' Us Kenya"
            className="h-9 w-auto object-contain"
          />
          <div>
            <span className="text-[14px] font-semibold text-[#1d1d1f] block leading-tight">Cars 'R' Us (Kenya) Ltd</span>
            <span className="text-[11px] text-[#86868b]">Precision Japanese Mobility · Est. 2000 Mombasa & Nairobi</span>
          </div>
        </div>

        {/* Structured Multi-Column Directory */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          
          <div>
            <h4 className="font-semibold text-[#1d1d1f] mb-3">Explore Fleet</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('inventory')} className="hover:text-[#1d1d1f] text-left cursor-pointer">
                  All Showroom Fleet
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('inventory')} className="hover:text-[#1d1d1f] text-left cursor-pointer">
                  SUVs & 4WD
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('inventory')} className="hover:text-[#1d1d1f] text-left cursor-pointer">
                  Hybrids & e-POWER
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('inventory')} className="hover:text-[#1d1d1f] text-left cursor-pointer">
                  Executive MPVs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('inventory')} className="hover:text-[#1d1d1f] text-left cursor-pointer">
                  Compact Crossovers
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#1d1d1f] mb-3">Featured Cars</h4>
            <ul className="space-y-2">
              {vehicles.slice(0, 5).map((v) => (
                <li key={v.id}>
                  <button
                    onClick={() => onSelectVehicle(v)}
                    className="hover:text-[#1d1d1f] text-left truncate max-w-[160px] cursor-pointer"
                  >
                    {v.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#1d1d1f] mb-3">Services</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('workshop')} className="hover:text-[#1d1d1f] text-left cursor-pointer">
                  Mombasa Workshop
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workshop')} className="hover:text-[#1d1d1f] text-left cursor-pointer">
                  100-Point Inspection
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workshop')} className="hover:text-[#1d1d1f] text-left cursor-pointer">
                  5,000 km Warranty
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('trade-in')} className="hover:text-[#1d1d1f] text-left cursor-pointer">
                  Trade-In Valuation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('trade-in')} className="hover:text-[#1d1d1f] text-left cursor-pointer">
                  Asset Finance
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#1d1d1f] mb-3">Showrooms</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('locations')} className="hover:text-[#1d1d1f] text-left cursor-pointer">
                  Mombasa — Tangana Rd
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('locations')} className="hover:text-[#1d1d1f] text-left cursor-pointer">
                  Mombasa — Nyali
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('locations')} className="hover:text-[#1d1d1f] text-left cursor-pointer">
                  Nairobi — Westlands
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('locations')} className="hover:text-[#1d1d1f] text-left cursor-pointer">
                  VIP Test Drives
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#1d1d1f] mb-3">Company</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#1d1d1f] text-left cursor-pointer">
                  Heritage (Est. 2000)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#1d1d1f] text-left cursor-pointer">
                  Auction Sourcing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('locations')} className="hover:text-[#1d1d1f] text-left cursor-pointer">
                  Contact Concierge
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sitemap')} className="text-[#0066cc] font-medium hover:underline text-left cursor-pointer">
                  Full Site Map
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="border-t border-[#d6d6d6] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>Copyright © 2000–2026 Cars 'R' Us (Kenya) Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('sitemap')} className="hover:underline cursor-pointer">
              Site Map
            </button>
            <button onClick={() => onNavigate('workshop')} className="hover:underline cursor-pointer">
              Warranty Covenant
            </button>
            <a href="https://www.carsrus.co.ke/" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Legacy Portal
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
