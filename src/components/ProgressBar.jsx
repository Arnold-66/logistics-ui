// ProgressBar.jsx — arrow / chevron breadcrumb steps (Odoo style)
// React + Tailwind. Per-step colors. Zero white space between arrows.
import React from 'react';
import { Check } from 'lucide-react';

const SIZES = {
  sm: { h: 'h-8',  notch: 12, dot: 'w-4 h-4', dotText: 'text-[9px]',  label: 'text-[11px]', icon: 'w-2.5 h-2.5', pad: 'px-2' },
  md: { h: 'h-11', notch: 18, dot: 'w-6 h-6', dotText: 'text-[11px]', label: 'text-xs',     icon: 'w-3.5 h-3.5', pad: 'px-3' },
  lg: { h: 'h-14', notch: 24, dot: 'w-8 h-8', dotText: 'text-sm',     label: 'text-sm',     icon: 'w-4 h-4',     pad: 'px-4' },
};

const DEFAULT_COLORS = [
  '#714b67', // Odoo purple
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // amber
  '#06b6d4', // cyan
  '#ef4444', // red
];

/** Builds the chevron clip-path for a segment. */
const chevron = (n, isFirst, isLast, isOnly) => {
  if (isOnly) return 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
  if (isFirst) return `polygon(0 0, calc(100% - ${n}px) 0, 100% 50%, calc(100% - ${n}px) 100%, 0 100%)`;
  if (isLast)  return `polygon(0 0, 100% 0, 100% 100%, 0 100%, ${n}px 50%)`;
  return `polygon(0 0, calc(100% - ${n}px) 0, 100% 50%, calc(100% - ${n}px) 100%, 0 100%, ${n}px 50%)`;
};

/** #rrggbb -> rgba() so we can tint without extra deps. */
const alpha = (hex, a) => {
  const h = hex.replace('#', '');
  const v = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const num = parseInt(v, 16);
  return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${a})`;
};

const ProgressBar = ({
  steps = [],
  currentStep = 0,
  onStepClick = null,
  theme = 'light',
  stepColors = [],
  size = 'md',
  showLabels = true,
  showNumbers = true,
  clickable = true,
  showPercent = false,
  showDescription = true,
  gap = 4,
  className = '',
  progress = null,
}) => {
  const isDark = theme === 'dark';
  const cfg = SIZES[size] || SIZES.md;
  const n = cfg.notch;
  const palette = stepColors.length ? stepColors : DEFAULT_COLORS;
  const colorAt = (i) => palette[i % palette.length];

  const pct = progress !== null
    ? progress
    : steps.length ? ((currentStep + 1) / steps.length) * 100 : 0;

  const idleBg = isDark ? '#374151' : '#e8ecf3';
  const idleText = isDark ? '#9ca3af' : '#64748b';

  // Overlap slightly less than the notch so a chevron-shaped sliver of the
  // page background shows through between segments — same look as the
  // original .step:before white arrow trick.
  const overlap = Math.max(0, n - gap);

  return (
    <div className={`w-full ${className}`}>
      <div className="flex w-full select-none">
        {steps.map((step, i) => {
          const isDone = i < currentStep;
          const isCurrent = i === currentStep;
          const isReached = i <= currentStep;
          const color = colorAt(i);

          // Done steps are tinted, current is solid, upcoming is neutral.
          const bg = isCurrent ? color : isDone ? alpha(color, 0.85) : idleBg;
          const fg = isReached ? '#ffffff' : idleText;

          const clip = chevron(n, i === 0, i === steps.length - 1, steps.length === 1);
          const interactive = clickable && typeof onStepClick === 'function';

          return (
            <div
              key={step.id ?? i}
              onClick={interactive ? () => onStepClick(i) : undefined}
              role={interactive ? 'button' : undefined}
              tabIndex={interactive ? 0 : undefined}
              onKeyDown={interactive ? (e) => (e.key === 'Enter' || e.key === ' ') && onStepClick(i) : undefined}
              title={step.title}
              className={`
                group relative flex min-w-0 flex-1 items-center justify-center
                ${cfg.h} ${interactive ? 'cursor-pointer' : 'cursor-default'}
                outline-none
              `}
              style={{
                backgroundColor: bg,
                color: fg,
                clipPath: clip,
                WebkitClipPath: clip,
                // pull each segment left so the notch swallows the point — no gaps
                marginLeft: i === 0 ? 0 : `-${overlap}px`,
                // add the eaten width back so segments stay visually equal
                paddingLeft: i === 0 ? 0 : n,
                paddingRight: i === steps.length - 1 ? 0 : n,
                borderTopLeftRadius: i === 0 ? 6 : 0,
                borderBottomLeftRadius: i === 0 ? 6 : 0,
                borderTopRightRadius: i === steps.length - 1 ? 6 : 0,
                borderBottomRightRadius: i === steps.length - 1 ? 6 : 0,
                zIndex: steps.length - i,
                transition: 'background-color .3s ease, color .3s ease',
              }}
            >
              {/* subtle sheen on the active step */}
              {isCurrent && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{ background: `linear-gradient(90deg, ${alpha('#ffffff', 0.18)}, transparent 60%)` }}
                />
              )}

              <span className={`relative z-10 flex min-w-0 items-center gap-2 ${cfg.pad}`}>
                {showNumbers && (
                  <span
                    className={`
                      ${cfg.dot} flex flex-shrink-0 items-center justify-center rounded-full font-bold
                      transition-transform duration-300 ${isCurrent ? 'scale-110' : ''}
                    `}
                    style={{
                      backgroundColor: isReached ? 'rgba(255,255,255,.22)' : isDark ? 'rgba(255,255,255,.08)' : 'rgba(15,23,42,.06)',
                      border: isCurrent ? '2px solid rgba(255,255,255,.55)' : '2px solid transparent',
                    }}
                  >
                    {isDone ? <Check className={cfg.icon} strokeWidth={3} /> : <span className={cfg.dotText}>{i + 1}</span>}
                  </span>
                )}

                {showLabels && (
                  <span className={`${cfg.label} truncate font-medium ${isCurrent ? 'font-semibold' : ''}`}>
                    {step.title}
                  </span>
                )}
              </span>
            </div>
          );
        })}
      </div>

      {(showPercent || (showDescription && steps[currentStep]?.description)) && (
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {showDescription ? steps[currentStep]?.description : ''}
          </p>
          {showPercent && (
            <span
              className="flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-bold"
              style={{ backgroundColor: alpha(colorAt(currentStep), 0.12), color: colorAt(currentStep) }}
            >
              {Math.round(pct)}%
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
