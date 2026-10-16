import React from 'react';
import { Project } from '../types/portfolio';

interface ProjectVisualProps {
  project: Project;
  className?: string;
  isDetailed?: boolean;
}

export const ProjectVisual: React.FC<ProjectVisualProps> = ({ project, className = '', isDetailed = false }) => {
  const { diagramStyle, themeColor, title } = project;

  return (
    <div
      className={`relative w-full overflow-hidden bg-neutral-950 border border-neutral-800/80 rounded-xl flex items-center justify-center select-none group transition-all duration-300 ${className}`}
      style={{ minHeight: isDetailed ? '280px' : '190px' }}
    >
      {/* Subtle background ambient mesh */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-35"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 40%, ${themeColor} 0%, transparent 70%)`,
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Financial Visual Renderers */}
      {diagramStyle === 'forecast' && (
        <svg viewBox="0 0 500 240" className="w-full h-full p-4 max-h-64" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Axes */}
          <line x1="50" y1="200" x2="450" y2="200" stroke="#334155" strokeWidth="1.5" />
          <line x1="50" y1="40" x2="50" y2="200" stroke="#334155" strokeWidth="1.5" />
          
          {/* Axis Labels */}
          <text x="50" y="30" fill="#94a3b8" fontSize="9" fontFamily="JetBrains Mono">$ ARR (Millions)</text>
          <text x="120" y="215" fill="#64748b" fontSize="9" fontFamily="JetBrains Mono">Q1</text>
          <text x="210" y="215" fill="#64748b" fontSize="9" fontFamily="JetBrains Mono">Q2</text>
          <text x="300" y="215" fill="#64748b" fontSize="9" fontFamily="JetBrains Mono">Q3</text>
          <text x="390" y="215" fill="#64748b" fontSize="9" fontFamily="JetBrains Mono">Q4 (Forecast)</text>

          {/* Confidence interval area */}
          <path d="M50 170 Q 200 140, 300 110 L 450 60 L 450 135 L 300 130 Q 200 150, 50 170 Z" fill={themeColor} fillOpacity="0.12" />

          {/* Historical Solid Line */}
          <path d="M50 170 L 130 155 L 210 135 L 300 115" stroke="#f8fafc" strokeWidth="2.5" />
          <circle cx="50" cy="170" r="4" fill="#f8fafc" />
          <circle cx="130" cy="155" r="4" fill="#f8fafc" />
          <circle cx="210" cy="135" r="4" fill="#f8fafc" />
          <circle cx="300" cy="115" r="4" fill="#f8fafc" />

          {/* Bull Scenario Line */}
          <path d="M300 115 L 450 60" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="450" cy="60" r="4" fill="#10b981" />
          <text x="455" y="63" fill="#10b981" fontSize="9" fontFamily="JetBrains Mono" fontWeight="600">Bull: $48M</text>

          {/* Base Scenario Line */}
          <path d="M300 115 L 450 95" stroke={themeColor} strokeWidth="2.5" />
          <circle cx="450" cy="95" r="4" fill={themeColor} />
          <text x="455" y="98" fill={themeColor} fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">Base: $45M</text>

          {/* Bear Scenario Line */}
          <path d="M300 115 L 450 135" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="450" cy="135" r="4" fill="#f43f5e" />
          <text x="455" y="138" fill="#f43f5e" fontSize="9" fontFamily="JetBrains Mono">Bear: $41M</text>

          {/* Header indicator */}
          <rect x="180" y="15" width="160" height="20" rx="4" fill="#0f172a" stroke="#334155" />
          <text x="260" y="29" fill={themeColor} fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">Monte Carlo 10k Iterations</text>
        </svg>
      )}

      {diagramStyle === 'variance' && (
        <svg viewBox="0 0 500 240" className="w-full h-full p-4 max-h-64" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Baseline Zero Line */}
          <line x1="40" y1="120" x2="460" y2="120" stroke="#475569" strokeWidth="1.5" />
          <text x="45" y="115" fill="#94a3b8" fontSize="9" fontFamily="JetBrains Mono">Budget Baseline ($0)</text>

          {/* Department Variance Bars */}
          {/* R&D - Favorable */}
          <rect x="70" y="70" width="45" height="50" rx="3" fill="#10b981" fillOpacity="0.85" />
          <text x="92" y="62" fill="#10b981" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono">-$45k</text>
          <text x="92" y="140" fill="#cbd5e1" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono">R&D</text>
          <text x="92" y="152" fill="#64748b" fontSize="8" textAnchor="middle" fontFamily="JetBrains Mono">Under bud.</text>

          {/* Marketing - Unfavorable Overrun */}
          <rect x="145" y="120" width="45" height="55" rx="3" fill="#ef4444" fillOpacity="0.85" />
          <text x="167" y="190" fill="#ef4444" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono">+$62k</text>
          <text x="167" y="135" fill="#cbd5e1" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono">Mktg</text>
          <text x="167" y="147" fill="#64748b" fontSize="8" textAnchor="middle" fontFamily="JetBrains Mono">Ad spend</text>

          {/* Sales - Favorable */}
          <rect x="220" y="85" width="45" height="35" rx="3" fill="#10b981" fillOpacity="0.85" />
          <text x="242" y="77" fill="#10b981" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono">-$28k</text>
          <text x="242" y="140" fill="#cbd5e1" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono">Sales</text>
          <text x="242" y="152" fill="#64748b" fontSize="8" textAnchor="middle" fontFamily="JetBrains Mono">Timing</text>

          {/* G&A - Minor */}
          <rect x="295" y="120" width="45" height="15" rx="3" fill="#ef4444" fillOpacity="0.85" />
          <text x="317" y="150" fill="#ef4444" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono">+$8k</text>
          <text x="317" y="135" fill="#cbd5e1" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono">G&A</text>
          <text x="317" y="170" fill="#64748b" fontSize="8" textAnchor="middle" fontFamily="JetBrains Mono">Software</text>

          {/* Total Net Variance */}
          <rect x="375" y="110" width="55" height="10" rx="3" fill="#10b981" stroke="#34d399" />
          <text x="402" y="100" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="JetBrains Mono">-$3k Net</text>
          <text x="402" y="140" fill="#f8fafc" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="JetBrains Mono">Consolidated</text>

          <text x="250" y="30" fill="#cbd5e1" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono">Budget vs. Actuals Variance Decomposition</text>
        </svg>
      )}

      {diagramStyle === 'liquidity' && (
        <svg viewBox="0 0 500 240" className="w-full h-full p-4 max-h-64" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Axis */}
          <line x1="50" y1="190" x2="450" y2="190" stroke="#334155" strokeWidth="1.5" />
          <line x1="50" y1="40" x2="50" y2="190" stroke="#334155" strokeWidth="1.5" />

          {/* Minimum covenant threshold line */}
          <line x1="50" y1="150" x2="450" y2="150" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="445" y="145" fill="#ef4444" fontSize="9" textAnchor="end" fontFamily="JetBrains Mono">Minimum Covenant Buffer ($3.0M)</text>

          {/* Cash trajectory spline */}
          <path d="M50 80 Q 150 70, 220 110 T 320 90 T 450 75" stroke="#f59e0b" strokeWidth="3" fill="none" />
          <circle cx="50" cy="80" r="4" fill="#f59e0b" />
          <circle cx="150" cy="72" r="4" fill="#f59e0b" />
          <circle cx="220" cy="110" r="5" fill="#38bdf8" />
          <circle cx="320" cy="90" r="4" fill="#f59e0b" />
          <circle cx="450" cy="75" r="4" fill="#10b981" />

          <text x="220" y="132" fill="#38bdf8" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono">Week 6 Low: $5.2M</text>
          <text x="450" y="62" fill="#10b981" fontSize="9" textAnchor="end" fontFamily="JetBrains Mono">W13 Headroom: +$6.8M</text>

          <text x="50" y="210" fill="#64748b" fontSize="8" fontFamily="JetBrains Mono">W1</text>
          <text x="140" y="210" fill="#64748b" fontSize="8" fontFamily="JetBrains Mono">W4</text>
          <text x="230" y="210" fill="#64748b" fontSize="8" fontFamily="JetBrains Mono">W7</text>
          <text x="320" y="210" fill="#64748b" fontSize="8" fontFamily="JetBrains Mono">W10</text>
          <text x="410" y="210" fill="#64748b" fontSize="8" fontFamily="JetBrains Mono">W13</text>

          <text x="250" y="25" fill="#cbd5e1" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono">13-Week Rolling Cash Flow & Working Capital Headroom</text>
        </svg>
      )}

      {diagramStyle === 'waterfall' && (
        <svg viewBox="0 0 500 240" className="w-full h-full p-4 max-h-64" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Revenue start column */}
          <rect x="50" y="50" width="50" height="150" rx="3" fill="#0ea5e9" />
          <text x="75" y="42" fill="#0ea5e9" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono">$100M</text>
          <text x="75" y="215" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="JetBrains Mono">Gross Rev</text>

          {/* COGS reduction */}
          <rect x="120" y="50" width="45" height="40" rx="3" fill="#ef4444" />
          <text x="142" y="42" fill="#ef4444" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono">-$25M</text>
          <text x="142" y="215" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="JetBrains Mono">COGS</text>

          {/* Gross Profit intermediate */}
          <rect x="185" y="90" width="45" height="110" rx="3" fill="#10b981" />
          <text x="207" y="82" fill="#10b981" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono">$75M</text>
          <text x="207" y="215" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="JetBrains Mono">Gross Profit</text>

          {/* OPEX deduction */}
          <rect x="250" y="90" width="45" height="65" rx="3" fill="#ef4444" />
          <text x="272" y="82" fill="#ef4444" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono">-$42M</text>
          <text x="272" y="215" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="JetBrains Mono">OPEX</text>

          {/* EBITDA finish */}
          <rect x="315" y="155" width="55" height="45" rx="3" fill="#8b5cf6" />
          <text x="342" y="147" fill="#8b5cf6" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="JetBrains Mono">$33M</text>
          <text x="342" y="215" fill="#f8fafc" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="JetBrains Mono">EBITDA (33%)</text>

          {/* Tie-off dotted lines */}
          <line x1="100" y1="50" x2="120" y2="50" stroke="#64748b" strokeDasharray="2 2" />
          <line x1="165" y1="90" x2="185" y2="90" stroke="#64748b" strokeDasharray="2 2" />
          <line x1="230" y1="90" x2="250" y2="90" stroke="#64748b" strokeDasharray="2 2" />
          <line x1="295" y1="155" x2="315" y2="155" stroke="#64748b" strokeDasharray="2 2" />

          <text x="250" y="20" fill="#cbd5e1" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono">Corporate P&L EBITDA Bridge Analysis</text>
        </svg>
      )}

      {diagramStyle === 'unit_economics' && (
        <svg viewBox="0 0 500 240" className="w-full h-full p-4 max-h-64" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* CAC Investment Box */}
          <rect x="60" y="60" width="140" height="120" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
          <text x="130" y="90" fill="#a5b4fc" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="JetBrains Mono">Fully Loaded CAC</text>
          <text x="130" y="125" fill="#ffffff" fontSize="22" fontWeight="bold" textAnchor="middle" fontFamily="JetBrains Mono">$8,250</text>
          <text x="130" y="155" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono">Payback: 11.2 Months</text>

          {/* Arrow */}
          <path d="M220 120H265" stroke="#ec4899" strokeWidth="2.5" markerEnd="url(#arrow)" />

          {/* LTV Value Box */}
          <rect x="280" y="50" width="150" height="140" rx="8" fill="#1f1329" stroke="#ec4899" strokeWidth="1.5" />
          <text x="355" y="80" fill="#f472b6" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="JetBrains Mono">Customer Lifetime Value</text>
          <text x="355" y="120" fill="#ffffff" fontSize="24" fontWeight="bold" textAnchor="middle" fontFamily="JetBrains Mono">$31,350</text>
          <text x="355" y="150" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="JetBrains Mono">LTV / CAC: 3.8x</text>
          <text x="355" y="170" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono">Net Margin: 74%</text>

          <text x="250" y="25" fill="#cbd5e1" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono">SaaS Unit Economics & Contribution Payback Matrix</text>
        </svg>
      )}

      {diagramStyle === 'terminal' && (
        <div className="w-full h-full p-4 font-mono text-xs flex flex-col justify-center">
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-neutral-300">
            <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-neutral-800 text-[10px] text-neutral-500">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700 inline-block" />
              <span className="ml-2 font-mono">fpa-pipeline v3.1.0</span>
            </div>
            <div className="space-y-1 text-[11px]">
              <p className="text-emerald-400">$ python run_variance_engine.py --period 2026-Q3</p>
              <p className="text-neutral-400">  [✓] Connected to General Ledger staging views (0.4s)</p>
              <p className="text-neutral-400">  [✓] Audited 42,800 journal entries across 14 cost centers</p>
              <p className="text-neutral-400">  [✓] Decomposed volume-price-mix variance attribution</p>
              <p className="text-amber-300">  Board pack updated in 1.4s · Reconciled to $0.00 penny delta</p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Title Bar */}
      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-neutral-400 bg-neutral-950/80 backdrop-blur-sm px-2.5 py-1 rounded border border-neutral-800/60">
        <span className="font-mono text-neutral-300 font-medium truncate">{title}</span>
        <span className="text-[10px] text-neutral-500 font-mono shrink-0 ml-2">{project.category}</span>
      </div>
    </div>
  );
};
