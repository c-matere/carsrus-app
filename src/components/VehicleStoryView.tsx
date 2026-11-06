import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MessageCircle,
  FileText,
  Sliders,
  Sparkles,
  Layers,
  Compass,
  ArrowRight,
  Cpu,
  Armchair
} from 'lucide-react';
import { Vehicle, EditorialFeature, FeatureSlide } from '../data/vehicles';
import { useAnimatedNumber } from '../hooks/useAnimations';
import { SkeletonImage } from './SkeletonImage';

interface VehicleStoryViewProps {
  vehicle: Vehicle;
  allVehicles: Vehicle[];
  onSelectVehicle: (v: Vehicle) => void;
  onBackToFleet: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onScheduleTestDrive: (v: Vehicle) => void;
}

/**
 * EditorialFeatureSection
 * Light Theme Apple Aesthetic for Cars 'R' Us
 */
const EditorialFeatureSection: React.FC<{
  feature: EditorialFeature;
  sectionIndex: number;
  totalSections: number;
  vehicleName: string;
  stockNo: string;
}> = ({ feature, sectionIndex, totalSections, vehicleName, stockNo }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const activeSlide: FeatureSlide =
    feature.slides[activeSlideIndex] || feature.slides[0];

  useEffect(() => {
    if (!isPlaying || feature.slides.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % feature.slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, feature.slides.length]);

  const renderFeatureIcon = () => {
    switch (feature.id) {
      case 'seats':
        return <Armchair className="w-4 h-4 text-[#0071e3]" />;
      case 'transmission':
        return <Cpu className="w-4 h-4 text-[#0071e3]" />;
      case 'infotainment':
        return <Sliders className="w-4 h-4 text-[#0071e3]" />;
      case 'safety':
        return <ShieldCheck className="w-4 h-4 text-[#0071e3]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#0071e3]" />;
    }
  };

  return (
    <section className="w-full bg-white border-b border-[#e5e5ea] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1240px] mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-[960px]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f5f7] border border-[#e5e5ea] text-[11px] font-semibold uppercase tracking-wider text-[#1d1d1f]">
            {renderFeatureIcon()}
            <span>0{sectionIndex + 1} / 0{totalSections} · {feature.badge}</span>
          </div>

          <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-bold text-[#1d1d1f] tracking-tight leading-[1.15]">
            {feature.title}
          </h2>

          <p className="text-[17px] sm:text-[19px] text-[#424245] leading-relaxed font-normal">
            {feature.lead}
          </p>
        </div>

        {/* 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Column 1: Cinematic Slide Showcase (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="w-full h-[360px] sm:h-[460px] lg:h-[500px] rounded-[24px] overflow-hidden bg-[#f5f5f7] border border-[#e5e5ea] relative group">
              <SkeletonImage
                key={activeSlide.id || activeSlide.imageUrl}
                src={activeSlide.imageUrl}
                alt={activeSlide.title}
                className="transition-transform duration-700 ease-out group-hover:scale-102"
                containerClassName="w-full h-full"
              />

              {/* Floating Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-white">
                  Slide {activeSlideIndex + 1} of {feature.slides.length}
                </span>

                {activeSlide.metric && (
                  <div className="bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3]" />
                    <span className="text-[11px] font-medium text-white/80 hidden xs:inline">{activeSlide.metricLabel}:</span>
                    <span className="text-[12px] sm:text-[13px] font-bold text-white">{activeSlide.metric}</span>
                  </div>
                )}
              </div>

              {/* Bottom Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent flex items-end p-6 sm:p-8 pointer-events-none z-10">
                <div className="space-y-1.5 max-w-[560px]">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-300 block">
                    {activeSlide.subtitle}
                  </span>
                  <h3 className="text-[20px] sm:text-[23px] font-bold text-white drop-shadow-sm leading-snug">
                    {activeSlide.title}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] text-zinc-200 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                    {activeSlide.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Slide Navigation Dock */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 bg-[#f5f5f7] border border-[#e5e5ea] rounded-[20px]">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {feature.slides.map((s, idx) => {
                  const isActive = activeSlideIndex === idx;
                  return (
                    <button
                      key={s.id || idx}
                      onClick={() => setActiveSlideIndex(idx)}
                      className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all shrink-0 cursor-pointer active:scale-95 ${
                        isActive
                          ? 'bg-[#1d1d1f] text-white font-semibold shadow-xs'
                          : 'bg-white text-[#424245] hover:text-[#1d1d1f] hover:bg-black/5'
                      }`}
                    >
                      <span>{s.title.split(' ')[0]} {s.title.split(' ')[1] || ''}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-end gap-1.5 shrink-0">
                <button
                  onClick={() =>
                    setActiveSlideIndex((prev) =>
                      prev === 0 ? feature.slides.length - 1 : prev - 1
                    )
                  }
                  className="w-8 h-8 rounded-full bg-white hover:bg-black/5 flex items-center justify-center text-[#1d1d1f] border border-[#e5e5ea] cursor-pointer active:scale-90 transition-transform"
                  title="Previous perspective"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-8 h-8 rounded-full bg-white hover:bg-black/5 flex items-center justify-center text-[#1d1d1f] border border-[#e5e5ea] cursor-pointer active:scale-90 transition-transform"
                  title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5" />
                  ) : (
                    <Play className="w-3.5 h-3.5 ml-0.5" />
                  )}
                </button>

                <button
                  onClick={() =>
                    setActiveSlideIndex((prev) => (prev + 1) % feature.slides.length)
                  }
                  className="w-8 h-8 rounded-full bg-white hover:bg-black/5 flex items-center justify-center text-[#1d1d1f] border border-[#e5e5ea] cursor-pointer active:scale-90 transition-transform"
                  title="Next perspective"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Column 2: In-Depth Engineering Narrative & Specs (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="space-y-4 text-[15px] sm:text-[16px] text-[#424245] leading-relaxed">
              {feature.narrative.map((para, pIdx) => (
                <p key={pIdx} className="border-l-2 border-[#0071e3]/40 pl-4">
                  {para}
                </p>
              ))}
            </div>

            <div className="pt-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868b] block mb-3">
                System Engineering Highlights
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {feature.specs.map((spec, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3.5 rounded-[16px] bg-[#f5f5f7] border border-[#e5e5ea] space-y-1 hover:border-[#0071e3]/50 transition-colors"
                  >
                    <span className="text-[11px] text-[#86868b] uppercase tracking-wider block font-medium">
                      {spec.label}
                    </span>
                    <span className="text-[13px] sm:text-[14px] font-semibold text-[#1d1d1f] leading-snug block">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/254714333888?text=Hello%20Cars%20R%20Us,%20I%20am%20inquiring%20about%20the%20${encodeURIComponent(feature.title)}%20on%20the%20${encodeURIComponent(vehicleName)}%20(${stockNo}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[13px] text-[#0071e3] hover:underline font-medium group cursor-pointer"
              >
                <span>Inquire about this feature on WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export const VehicleStoryView: React.FC<VehicleStoryViewProps> = ({
  vehicle,
  allVehicles,
  onSelectVehicle,
  onBackToFleet,
  isFavorite,
  onToggleFavorite,
  onScheduleTestDrive,
}) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [showAuctionModal, setShowAuctionModal] = useState(false);
  const [depositPercent, setDepositPercent] = useState(25);
  const [loanTenureMonths, setLoanTenureMonths] = useState(48);

  const depositAmount = (vehicle.priceKes * depositPercent) / 100;
  const loanPrincipal = vehicle.priceKes - depositAmount;
  const annualInterestRate = 0.135;
  const monthlyRate = annualInterestRate / 12;
  const monthlyPayment = Math.round(
    (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, loanTenureMonths)) /
      (Math.pow(1 + monthlyRate, loanTenureMonths) - 1)
  );

  const animatedMonthlyPayment = useAnimatedNumber(monthlyPayment, 350);
  const animatedDepositAmount = useAnimatedNumber(depositAmount, 350);

  const activeColor = vehicle.colors[selectedColorIndex] || vehicle.colors[0];

  return (
    <div className="w-full bg-[#fbfbfd] text-[#1d1d1f] pb-24">
      
      {/* 1. MODEL SWITCHER HORIZON BAR */}
      <div className="w-full bg-[#f5f5f7]/95 backdrop-blur-md border-b border-[#e5e5ea] py-2 px-3 sm:px-4 sticky top-[44px] z-30 transition-all">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 min-w-0">
            <button
              onClick={onBackToFleet}
              className="text-[12px] text-[#86868b] hover:text-[#1d1d1f] flex items-center gap-1 cursor-pointer shrink-0 mr-1 sm:mr-2 px-2.5 py-1 rounded-full bg-black/5 hover:bg-black/10 active:scale-95 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden xs:inline font-medium">Fleet</span>
            </button>

            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868b] hidden lg:inline mr-1 shrink-0">
              Showroom Models:
            </span>
            <div className="flex items-center bg-white border border-[#e5e5ea] p-1 rounded-full shrink-0 shadow-xs">
              {allVehicles.map((v) => {
                const isCurrent = v.id === vehicle.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => {
                      onSelectVehicle(v);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`px-3 sm:px-4 py-1.5 rounded-full text-[12px] transition-all shrink-0 cursor-pointer active:scale-95 ${
                      isCurrent
                        ? 'bg-[#1d1d1f] text-white font-semibold shadow-xs'
                        : 'text-[#424245] hover:text-[#1d1d1f] font-medium'
                    }`}
                  >
                    {v.name.split(' ')[1]} {v.name.split(' ')[2] || ''}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <span className="text-[13px] font-bold text-[#1d1d1f] hidden md:inline">
              KES {vehicle.priceKes.toLocaleString()}
            </span>
            <a
              href={`https://wa.me/254714333888?text=Hello%20Cars%20R%20Us,%20I%20am%20inquiring%20about%20the%20${encodeURIComponent(vehicle.name)}%20(${vehicle.stockNo}).`}
              target="_blank"
              rel="noopener noreferrer"
              className="pricing-blue-pill !py-1.5 !px-3 sm:!px-4 text-[12px] sm:text-[13px] whitespace-nowrap active:scale-95 transition-transform"
            >
              Inquire
            </a>
          </div>
        </div>
      </div>

      {/* 2. MONUMENTAL HERO */}
      <section className="w-full pt-14 pb-16 px-4 sm:px-6 text-center max-w-[1240px] mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f5f7] border border-[#e5e5ea] text-[11px] font-semibold text-[#1d1d1f] uppercase tracking-wider mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3]" />
          <span>{vehicle.status} · Stock #{vehicle.stockNo}</span>
        </div>

        <p className="text-[13px] sm:text-[14px] font-semibold uppercase tracking-[0.25em] text-[#86868b] mb-2">
          {vehicle.moniker}
        </p>

        <h1 className="hero-display mb-5 text-[#1d1d1f]">
          {vehicle.name}
        </h1>

        <blockquote className="max-w-[760px] mx-auto text-[#424245] text-[17px] sm:text-[20px] leading-relaxed italic mb-10 font-normal">
          "{vehicle.essenceQuote}"
        </blockquote>

        {/* Master Visual Canvas */}
        <div className="relative w-full max-w-[1020px] mx-auto mb-8">
          <div className="w-full h-[380px] sm:h-[520px] lg:h-[560px] rounded-[28px] overflow-hidden bg-[#f5f5f7] border border-[#e5e5ea] relative">
            <SkeletonImage
              key={activeColor.name}
              src={activeColor.imageUrl}
              alt={`${vehicle.name} in ${activeColor.name}`}
              className="transition-transform duration-700 hover:scale-102"
              containerClassName="w-full h-full"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6 sm:p-8">
              <div className="text-left text-white space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-white/80 block">
                  Commission Specification
                </span>
                <p className="text-[18px] sm:text-[22px] font-bold text-white drop-shadow-sm">
                  {activeColor.name} · Grade {vehicle.auctionGrade} Provenance
                </p>
              </div>
            </div>
          </div>

          {/* Color Switcher Capsule */}
          <div className="floating-capsule p-3.5 max-w-[460px] mx-auto -mt-7 relative z-20 flex items-center justify-between bg-white border border-[#e5e5ea] shadow-lg">
            <div className="text-left pl-2">
              <span className="text-[10px] text-[#86868b] uppercase font-semibold block">Factory Finish</span>
              <span className="text-[13px] font-semibold text-[#1d1d1f] truncate max-w-[200px] block">
                {activeColor.name}
              </span>
            </div>

            <div className="flex items-center gap-2.5 pr-2">
              {vehicle.colors.map((c, idx) => {
                const isSelected = selectedColorIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedColorIndex(idx)}
                    className={`w-7 h-7 rounded-full transition-all cursor-pointer relative flex items-center justify-center ${
                      isSelected ? 'ring-2 ring-[#0071e3] ring-offset-2 ring-offset-white scale-110' : 'opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4-Column Metric Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-[920px] mx-auto pt-6 text-left">
          <div className="border-l-2 border-[#e5e5ea] pl-4">
            <span className="text-[11px] text-[#86868b] uppercase block font-medium">Year & Mileage</span>
            <span className="text-[16px] font-semibold text-[#1d1d1f]">{vehicle.year} · {vehicle.mileageKm.toLocaleString()} km</span>
          </div>
          <div className="border-l-2 border-[#e5e5ea] pl-4">
            <span className="text-[11px] text-[#86868b] uppercase block font-medium">Auction Condition</span>
            <span className="text-[16px] font-semibold text-[#1d1d1f]">{vehicle.auctionGrade} / {vehicle.interiorGrade}</span>
          </div>
          <div className="border-l-2 border-[#e5e5ea] pl-4">
            <span className="text-[11px] text-[#86868b] uppercase block font-medium">Drivetrain</span>
            <span className="text-[16px] font-semibold text-[#1d1d1f]">{vehicle.drivetrain.split('(')[0]}</span>
          </div>
          <div className="border-l-2 border-[#e5e5ea] pl-4">
            <span className="text-[11px] text-[#86868b] uppercase block font-medium">Delivered Price</span>
            <span className="text-[17px] font-semibold text-[#1d1d1f]">KES {vehicle.priceKes.toLocaleString()}</span>
          </div>
        </div>
      </section>

      {/* 3. DEDICATED EDITORIAL FEATURE SPREADS */}
      <div className="w-full">
        {vehicle.editorialFeatures.map((feat, idx) => (
          <EditorialFeatureSection
            key={feat.id}
            feature={feat}
            sectionIndex={idx}
            totalSections={vehicle.editorialFeatures.length}
            vehicleName={vehicle.name}
            stockNo={vehicle.stockNo}
          />
        ))}
      </div>

      {/* 4. TECHNICAL SPECIFICATIONS & PROVENANCE */}
      <section className="w-full bg-[#f5f5f7] py-20 px-4 sm:px-6">
        <div className="max-w-[1240px] mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#e5e5ea] text-[11px] font-semibold uppercase tracking-wider text-[#1d1d1f] mb-2">
                <FileText className="w-3.5 h-3.5 text-[#0071e3]" />
                <span>Engineering Archive & Provenance</span>
              </span>
              <h2 className="text-[28px] sm:text-[36px] font-bold text-[#1d1d1f] tracking-tight">
                Technical Specifications & Provenance.
              </h2>
            </div>

            <button
              onClick={() => setShowAuctionModal(true)}
              className="outlined-explore-pill cursor-pointer hover:border-[#1d1d1f] transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-[#86868b]" />
              <span>Inspect {vehicle.auctionHall} Auction Sheet</span>
            </button>
          </div>

          <div className="p-6 sm:p-8 bg-white rounded-[24px] border border-[#e5e5ea] divide-y divide-[#e5e5ea] shadow-xs">
            {vehicle.specifications.map((group, idx) => (
              <div key={idx} className="py-6 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-3 gap-4">
                <span className="text-[15px] font-bold text-[#1d1d1f]">{group.category}</span>
                <div className="md:col-span-2 space-y-2 text-[14px]">
                  {group.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex justify-between py-1 border-b border-[#f5f5f7] last:border-0">
                      <span className="text-[#86868b]">{item.label}</span>
                      <span className="text-[#1d1d1f] font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ASSET FINANCING & MOMBASA STAMP */}
      <section className="w-full bg-white py-20 px-4 sm:px-6 border-t border-[#e5e5ea]">
        <div className="max-w-[1240px] mx-auto space-y-10">
          <div className="p-6 sm:p-10 lg:p-12 bg-[#f5f5f7] rounded-[24px] border border-[#e5e5ea]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e5e5ea]">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#e5e5ea] text-[11px] font-semibold uppercase tracking-wider text-[#1d1d1f] mb-2">
                  <span>Financial Acquisition</span>
                </span>
                <h3 className="text-[24px] font-bold text-[#1d1d1f]">Asset Finance Repayment Calculator</h3>
                <p className="text-[13px] text-[#86868b] mt-1">Official pre-approved financing via NCBA Bank, Stanbic Bank, and I&M Bank Kenya.</p>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[11px] text-[#86868b] uppercase block font-medium">Estimated Monthly Installment</span>
                <span className="text-[28px] font-bold text-[#0071e3] transition-all">
                  KES {animatedMonthlyPayment.toLocaleString()}<span className="text-[14px] font-normal text-[#86868b]">/mo</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
              <div>
                <div className="flex justify-between text-[13px] mb-2">
                  <span className="font-medium text-[#1d1d1f]">Deposit Equity ({depositPercent}%)</span>
                  <span className="font-semibold text-[#1d1d1f] transition-all">KES {animatedDepositAmount.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="60"
                  step="5"
                  value={depositPercent}
                  onChange={(e) => setDepositPercent(Number(e.target.value))}
                  className="w-full accent-[#0071e3] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#86868b] mt-1">
                  <span>15%</span>
                  <span>35%</span>
                  <span>60%</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[13px] mb-2">
                  <span className="font-medium text-[#1d1d1f]">Loan Duration ({loanTenureMonths} Months / {loanTenureMonths / 12} Years)</span>
                  <span className="font-semibold text-[#1d1d1f]">{loanTenureMonths} Months</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="60"
                  step="12"
                  value={loanTenureMonths}
                  onChange={(e) => setLoanTenureMonths(Number(e.target.value))}
                  className="w-full accent-[#0071e3] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#86868b] mt-1">
                  <span>1 Year</span>
                  <span>3 Years</span>
                  <span>5 Years</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mombasa Pre-Delivery Protocol Stamp */}
          <div className="p-6 sm:p-8 bg-[#f5f5f7] rounded-[24px] border border-[#e5e5ea]">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#e5e5ea]">
              <ShieldCheck className="w-6 h-6 text-[#0071e3]" />
              <div>
                <h4 className="text-[18px] font-bold text-[#1d1d1f]">Mombasa 48-Hour Pre-Delivery Overhaul Stamp</h4>
                <p className="text-[12px] text-[#86868b]">Certified on Tangana Road for Stock #{vehicle.stockNo}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vehicle.workshopProtocol.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-[13px] text-[#424245]">
                  <CheckCircle2 className="w-4 h-4 text-[#0071e3] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Conversion Action Bar */}
          <div className="p-8 bg-[#f5f5f7] rounded-[24px] border border-[#e5e5ea] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#e5e5ea] text-[11px] font-semibold uppercase tracking-wider text-[#1d1d1f] mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3]" />
                <span>Immediate Availability</span>
              </span>
              <h3 className="text-[22px] font-bold text-[#1d1d1f]">
                Reserve {vehicle.name}
              </h3>
              <p className="text-[13px] text-[#86868b] mt-1">
                Deliverable to your residence in Nairobi or Mombasa within 48 hours.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => onScheduleTestDrive(vehicle)}
                className="outlined-explore-pill py-2.5 px-6 text-[13px] cursor-pointer w-full sm:w-auto hover:border-[#1d1d1f] transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Book VIP Test Drive</span>
              </button>

              <a
                href={`https://wa.me/254714333888?text=Hello%20Cars%20R%20Us,%20I%20would%20like%20to%20reserve%20the%20${encodeURIComponent(vehicle.name)}%20(${vehicle.stockNo})%20priced%20at%20KES%20${vehicle.priceKes.toLocaleString()}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="pricing-blue-pill !py-3 !px-6 text-[13px] w-full sm:w-auto justify-center"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Sales Concierge</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. AUCTION SHEET MODAL */}
      {showAuctionModal && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] max-w-[680px] w-full p-6 sm:p-8 relative border border-[#e5e5ea] shadow-2xl">
            <button
              onClick={() => setShowAuctionModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 cursor-pointer text-[#86868b] hover:text-[#1d1d1f]"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5f5f7] border border-[#e5e5ea] text-[11px] font-semibold uppercase tracking-wider text-[#1d1d1f] mb-2">
              <span>Authentic Japanese Export Document</span>
            </span>
            <h3 className="text-[22px] font-bold text-[#1d1d1f] mb-1">
              {vehicle.auctionHall} Auction Sheet
            </h3>
            <p className="text-[13px] text-[#86868b] mb-6">
              Verified Odometer: {vehicle.mileageKm.toLocaleString()} KM · Overall Grade: {vehicle.auctionGrade} · Interior: {vehicle.interiorGrade}
            </p>

            <div className="bg-[#f5f5f7] rounded-[16px] p-6 text-[13px] font-mono space-y-2 border border-[#e5e5ea]">
              <div className="flex justify-between border-b border-[#e5e5ea] pb-1.5">
                <span className="text-[#86868b]">Auction Hall:</span>
                <span className="font-semibold text-[#1d1d1f]">{vehicle.auctionHall} (Japan)</span>
              </div>
              <div className="flex justify-between border-b border-[#e5e5ea] pb-1.5">
                <span className="text-[#86868b]">Stock Identification:</span>
                <span className="font-semibold text-[#1d1d1f]">{vehicle.stockNo}</span>
              </div>
              <div className="flex justify-between border-b border-[#e5e5ea] pb-1.5">
                <span className="text-[#86868b]">Overall Inspection Score:</span>
                <span className="font-semibold text-[#1d1d1f]">{vehicle.auctionGrade}</span>
              </div>
              <div className="flex justify-between border-b border-[#e5e5ea] pb-1.5">
                <span className="text-[#86868b]">Interior / Exterior Score:</span>
                <span className="font-semibold text-[#1d1d1f]">{vehicle.interiorGrade}</span>
              </div>
              <div className="flex justify-between border-b border-[#e5e5ea] pb-1.5">
                <span className="text-[#86868b]">Accident / Frame Damage:</span>
                <span className="font-semibold text-emerald-600">ZERO (Clean Original Pillars)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#86868b]">QISJ Pre-Shipment Inspection:</span>
                <span className="font-semibold text-emerald-600">PASSED & AUTHENTICATED</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <a
                href={`https://wa.me/254714333888?text=Hello%20Cars%20R%20Us,%20please%20send%20the%20original%20scanned%20Japanese%20auction%20sheet%20PDF%20for%20${encodeURIComponent(vehicle.name)}%20(${vehicle.stockNo}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="pricing-blue-pill !py-2.5 !px-5 text-[13px]"
              >
                Request Scanned Original PDF on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
