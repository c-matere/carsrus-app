import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onExploreFleet: () => void;
  onExploreWorkshop: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreFleet, onExploreWorkshop }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="w-full bg-white pt-16 pb-24 px-6 text-center">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Bare Launch Orange status label (NO pill background!) */}
        <span className="launch-status-label mb-3 animate-apple-fade">
          Operating in Kenya Since 2000
        </span>

        {/* Product Kicker */}
        <p className="product-kicker mb-3 animate-apple-up delay-100">
          Cars 'R' Us (K) Ltd
        </p>

        {/* 80px / 600 Hero Display Headline with -1.2px tracking */}
        <h1 className="hero-display mb-6 animate-apple-up delay-150">
          Precision Japanese mobility.<br />
          Pre-serviced for Kenya.
        </h1>

        {/* Subheading body copy */}
        <p className="max-w-[700px] mx-auto text-[#707070] text-[17px] md:text-[19px] leading-[1.47] mb-14 animate-apple-up delay-200" style={{ letterSpacing: '-0.374px' }}>
          Over 4,000 verified vehicles delivered across Mombasa and Nairobi. Handpicked from Japanese auction houses, completely serviced in our Mombasa workshop, and delivered with zero surprises.
        </p>

        {/* Center Visual Event: Breathtaking Editorial Automotive Video Stage */}
        <div className="relative w-full mx-auto animate-hero-zoom">
          <div className="w-full h-[340px] sm:h-[480px] md:h-[620px] rounded-[24px] sm:rounded-[28px] overflow-hidden relative bg-[#f5f5f7]">
            {/* Cinematic HD Video Loop */}
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              poster="./vehicles/flagship-hero.jpg"
            >
              <source src="https://videos.pexels.com/video-files/3015510/3015510-hd_1920_1080_24fps.mp4" type="video/mp4" />
              <img src="./vehicles/flagship-hero.jpg" alt="Cars R Us Flagship Fleet" className="w-full h-full object-cover" />
            </video>

            {/* Subtle Editorial Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8 pointer-events-none">
              <div className="text-left text-white max-w-[620px]">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#0071e3] inline-block animate-pulse"></span>
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-white/90">
                    Tokyo Auction to Kenyan Roadway
                  </span>
                </div>
                <p className="text-[20px] sm:text-[24px] font-semibold leading-tight text-white drop-shadow-sm">
                  Grade 4.5+ verified provenance. Zero auction mysteries.
                </p>
              </div>
            </div>

            {/* Video Controls (Quiet, translucent circular pills) */}
            <div className="absolute top-5 right-5 flex items-center gap-2 z-30">
              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-full bg-white/80 hover:bg-white backdrop-blur-md flex items-center justify-center text-[#1d1d1f] shadow-sm transition-all cursor-pointer"
                title={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
              </button>
              <button
                onClick={toggleMute}
                className="w-8 h-8 rounded-full bg-white/80 hover:bg-white backdrop-blur-md flex items-center justify-center text-[#1d1d1f] shadow-sm transition-all cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Floating Pricing / Handover Callout (28px radius, shadowless, 1px silver border) */}
          <div className="floating-capsule p-6 max-w-[780px] mx-auto -mt-10 relative z-20 flex flex-col sm:flex-row items-center justify-between gap-6 text-left bg-white">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full sm:w-auto">
              <div>
                <span className="text-[11px] text-[#86868b] uppercase tracking-wide block font-medium">Japanese Grade</span>
                <span className="text-[15px] font-semibold text-[#0071e3]">4.5+ Verified Sourcing</span>
              </div>
              <div>
                <span className="text-[11px] text-[#86868b] uppercase tracking-wide block font-medium">Workshop Overhaul</span>
                <span className="text-[15px] font-semibold text-[#1d1d1f]">48-Hour Protocol</span>
              </div>
              <div>
                <span className="text-[11px] text-[#86868b] uppercase tracking-wide block font-medium">Zero-Worry</span>
                <span className="text-[15px] font-semibold text-[#1d1d1f]">5,000 km Warranty</span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-end">
              <button
                onClick={onExploreFleet}
                className="pricing-blue-pill cursor-pointer"
              >
                <span>Explore Fleet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
