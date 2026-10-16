import React, { useState } from 'react';
import { ArrowDown, Linkedin, Mail, ExternalLink, TrendingUp, DollarSign, Calculator, BarChart3 } from 'lucide-react';
import { ProfileData } from '../types/portfolio';

interface HeroProps {
  profile: ProfileData;
  onOpenCustomizer: () => void;
  onOpenDeployGuide: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onOpenCustomizer, onOpenDeployGuide }) => {
  const [activeTab, setActiveTab] = useState<'forecast' | 'variance' | 'runway'>('forecast');
  
  // Interactive mini financial sandbox state
  const [baseRevenue, setBaseRevenue] = useState(42); // $42M
  const [growthRate, setGrowthRate] = useState(18); // 18%
  const [opexEfficiency, setOpexEfficiency] = useState(65); // 65% of rev

  const projectedRev = Math.round(baseRevenue * (1 + growthRate / 100) * 10) / 10;
  const projectedOpex = Math.round(projectedRev * (opexEfficiency / 100) * 10) / 10;
  const projectedEbitda = Math.round((projectedRev - projectedOpex) * 10) / 10;
  const ebitdaMargin = Math.round((projectedEbitda / projectedRev) * 100);

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-neutral-900 overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split-Screen Hero Grid (Items Stretch for matching height) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Clean editorial kicker (Unboxed text with typographic separator, NO pills) */}
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-4 tracking-wide uppercase">
              <span>Financial Planning & Analysis (FP&A)</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400 font-medium">Corporate Modeling & Strategy</span>
            </div>

            {/* Display Headline with text-wrap: balance */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-100 font-display leading-[1.08] mb-6 [text-wrap:balance]">
              Driving strategic growth through predictive financial modeling & automated analysis.
            </h1>

            {/* Lead Copy */}
            <p className="text-base sm:text-lg text-neutral-300 font-body leading-relaxed max-w-2xl mb-8">
              {profile.bio}
            </p>

            {/* Primary Action Row */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a
                href="#projects"
                className="px-5 py-3 text-sm font-semibold text-neutral-950 bg-neutral-100 hover:bg-white rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm inline-flex items-center gap-2"
              >
                <span>Explore Financial Models</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="px-5 py-3 text-sm font-medium text-neutral-200 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:text-white rounded-lg transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-2"
              >
                <span>Let's Connect</span>
              </a>

              <button
                onClick={onOpenCustomizer}
                className="px-3.5 py-3 text-xs font-mono text-neutral-400 hover:text-neutral-200 transition-colors whitespace-nowrap"
                title="Personalize portfolio details"
              >
                Customize Bio
              </button>
            </div>

            {/* Social & Contact Direct Links */}
            <div className="flex items-center gap-6 text-sm text-neutral-400 border-t border-neutral-900 pt-6">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
              >
                <Linkedin className="w-4 h-4 text-emerald-400" />
                <span className="font-mono text-xs text-neutral-200">LinkedIn Profile</span>
              </a>

              <a
                href={`mailto:${profile.email}`}
                className="hover:text-neutral-100 transition-colors inline-flex items-center gap-1.5"
              >
                <Mail className="w-4 h-4" />
                <span className="font-mono text-xs">{profile.email}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Financial Intelligence Sandbox */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex-1 bg-neutral-900/90 border border-neutral-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
              
              {/* Header with Segmented Tabs */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800 gap-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400">
                  <Calculator className="w-4 h-4 text-emerald-400" />
                  <span className="font-medium text-neutral-200">Financial Model Sandbox</span>
                </div>

                {/* Tab Switcher */}
                <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800 text-[11px] font-mono">
                  <button
                    onClick={() => setActiveTab('forecast')}
                    className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                      activeTab === 'forecast'
                        ? 'bg-neutral-800 text-neutral-100 font-medium'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    Scenario
                  </button>
                  <button
                    onClick={() => setActiveTab('variance')}
                    className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                      activeTab === 'variance'
                        ? 'bg-neutral-800 text-neutral-100 font-medium'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    Variance
                  </button>
                  <button
                    onClick={() => setActiveTab('runway')}
                    className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                      activeTab === 'runway'
                        ? 'bg-neutral-800 text-neutral-100 font-medium'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    Runway
                  </button>
                </div>
              </div>

              {/* Dynamic Sandbox Display */}
              <div className="py-4 flex-1 flex flex-col justify-center">
                {activeTab === 'forecast' && (
                  <div className="space-y-4">
                    <div className="bg-neutral-950 rounded-xl p-4 border border-neutral-800/80 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                        <span>Dynamic P&L Projections</span>
                        <span className="text-emerald-400">Live Sensitivity Engine</span>
                      </div>

                      {/* Sliders */}
                      <div className="space-y-2 text-xs font-mono">
                        <div className="flex items-center justify-between text-neutral-400">
                          <span>Target Growth Rate:</span>
                          <span className="text-emerald-400 font-bold">+{growthRate}% YoY</span>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="40"
                          value={growthRate}
                          onChange={(e) => setGrowthRate(Number(e.target.value))}
                          className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
                        />
                      </div>

                      {/* Financial KPI Output Cards */}
                      <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono pt-2">
                        <div className="bg-neutral-900 border border-neutral-800 p-2.5 rounded">
                          <p className="text-neutral-400">Projected Rev</p>
                          <p className="text-neutral-100 font-bold text-sm mt-0.5">${projectedRev}M</p>
                        </div>
                        <div className="bg-neutral-900 border border-neutral-800 p-2.5 rounded">
                          <p className="text-neutral-400">Est. OPEX</p>
                          <p className="text-neutral-300 font-bold text-sm mt-0.5">${projectedOpex}M</p>
                        </div>
                        <div className="bg-neutral-900 border border-neutral-800 p-2.5 rounded">
                          <p className="text-neutral-400">EBITDA ({ebitdaMargin}%)</p>
                          <p className="text-emerald-400 font-bold text-sm mt-0.5">${projectedEbitda}M</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-400 leading-relaxed font-body">
                      Interactive parameter drivers model the downstream impact of sales headcount and customer expansion on operating leverage.
                    </p>
                  </div>
                )}

                {activeTab === 'variance' && (
                  <div className="bg-neutral-950 rounded-xl p-4 border border-neutral-800/80 space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between text-neutral-400 pb-2 border-b border-neutral-800">
                      <span>Q3 Consolidated Variance</span>
                      <span className="text-emerald-400 font-medium">99.1% to Plan</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400">Revenue (Actual vs Bud):</span>
                        <span className="text-emerald-400">+$420,000 (Favorable)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400">R&D Software OPEX:</span>
                        <span className="text-emerald-400">-$65,000 (Savings)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400">Marketing Acquisition:</span>
                        <span className="text-rose-400">+$82,000 (Overrun)</span>
                      </div>
                      <div className="pt-2 border-t border-neutral-800 flex items-center justify-between font-bold">
                        <span className="text-neutral-200">Net EBITDA Impact:</span>
                        <span className="text-emerald-400">+$403,000 Beat</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'runway' && (
                  <div className="bg-neutral-950 rounded-xl p-4 border border-neutral-800/80 space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between text-neutral-400 pb-2 border-b border-neutral-800">
                      <span>Liquidity & Cash Buffer</span>
                      <span className="text-amber-400">22.4 Months Runway</span>
                    </div>
                    <div className="space-y-1.5 text-neutral-300">
                      <p>Current Unencumbered Cash: <strong className="text-white">$14.2M</strong></p>
                      <p>Net Monthly Operating Burn: <strong className="text-white">$634k</strong></p>
                      <p>Minimum Covenant Floor: <strong className="text-rose-400">$3.0M</strong></p>
                      <p className="text-emerald-400 pt-1">Safe Headroom Margin: +$11.2M unencumbered</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Sandbox Footer */}
              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
                <span className="font-mono text-[11px]">Financial Modeling Engine</span>
                <button
                  onClick={onOpenDeployGuide}
                  className="text-neutral-300 hover:text-emerald-400 transition-colors inline-flex items-center gap-1 font-mono text-[11px]"
                >
                  <span>GitHub Turnkey Ready</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Key Metrics Strip Below the Split */}
        <div className="mt-14 pt-8 border-t border-neutral-800/80 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {profile.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-bold font-display text-neutral-100 tabular-nums">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm font-medium text-neutral-300 mt-0.5">
                {stat.label}
              </span>
              <span className="text-xs text-neutral-500 mt-0.5">
                {stat.detail}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
