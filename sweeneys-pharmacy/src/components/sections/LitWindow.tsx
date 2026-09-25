"use client";

import { useId, useRef, type PointerEvent } from "react";
import { Mark } from "@/components/ui/Mark";
import { groupWeekHours } from "@/lib/hours-format";
import { usePharmacyStatus } from "@/lib/use-pharmacy-status";
import { PHONE_DISPLAY } from "@/content/site";

type Lit = "on" | "off" | "idle";

/** Bottle silhouettes along the back shelves: [x offset, height]. */
const BOTTLES: ReadonlyArray<readonly [number, number]> = [
  [0, 26], [14, 34], [28, 22], [40, 30], [56, 36], [70, 24], [84, 32], [98, 28],
  [112, 38], [128, 24], [142, 32], [156, 27], [170, 35], [186, 23], [200, 31], [214, 28], [228, 34],
];

/**
 * "The lit window": the shopfront at night. Light, sign and door hanger follow
 * the live open/closed state. Decorative; the status pill carries the meaning.
 */
export function LitWindow() {
  const uid = useId().replace(/:/g, "");
  const status = usePharmacyStatus();
  const lit: Lit = !status ? "idle" : status.state === "closed" ? "off" : "on";
  const rows = groupWeekHours();
  const frameRef = useRef<HTMLDivElement>(null); // static, never transformed: safe to measure
  const sceneRef = useRef<HTMLDivElement>(null); // the part that tilts

  // Gentle 3D tilt toward the cursor. Mouse only, and never with reduced motion.
  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = sceneRef.current;
    const frame = frameRef.current;
    if (!el || !frame || e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = frame.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1100px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 7).toFixed(2)}deg)`;
  };
  const handleLeave = () => {
    if (sceneRef.current) sceneRef.current.style.transform = "";
  };

  return (
    <div ref={frameRef} onPointerMove={handleMove} onPointerLeave={handleLeave} className="mx-auto w-full max-w-[520px]" aria-hidden="true">
    <div ref={sceneRef} className="window-scene relative" data-lit={lit}>
      <svg viewBox="0 0 520 640" className="h-auto w-full overflow-visible" focusable="false">
        <defs>
          <radialGradient id={`${uid}-glass`} cx="50%" cy="38%" r="80%">
            <stop offset="0" stopColor="#FFDD94" />
            <stop offset="0.5" stopColor="#F5B84A" />
            <stop offset="1" stopColor="#B36F1C" />
          </radialGradient>
          <radialGradient id={`${uid}-halo`} cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#F5B84A" stopOpacity="0.5" />
            <stop offset="0.55" stopColor="#F5B84A" stopOpacity="0.12" />
            <stop offset="1" stopColor="#F5B84A" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${uid}-spill`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F5B84A" stopOpacity="0.7" />
            <stop offset="1" stopColor="#F5B84A" stopOpacity="0" />
          </linearGradient>
          <clipPath id={`${uid}-pane`}>
            <rect x="200" y="190" width="268" height="292" />
          </clipPath>
        </defs>

        {/* Atmospheric halo behind the building */}
        <ellipse className="glow-layer" cx="334" cy="340" rx="330" ry="310" fill={`url(#${uid}-halo)`} />

        {/* Facade */}
        <rect x="16" y="24" width="488" height="590" rx="6" fill="#10291F" stroke="rgba(244,239,226,0.10)" />

        {/* Fascia sign */}
        <rect x="36" y="44" width="448" height="104" rx="4" fill="#1D4F3B" stroke="#D8B25A" strokeWidth="2" />
        <rect x="45" y="53" width="430" height="86" rx="2" fill="none" stroke="#D8B25A" strokeOpacity="0.45" />
        <g transform="translate(58 66)">
          <Mark size={52} className="text-brass" cut="#1D4F3B" />
        </g>
        <text x="122" y="80" className="font-sans" fontSize="11" fontWeight="700" letterSpacing="3.4" fill="#D8B25A">
          KARIMA SWEENEY MPSI
        </text>
        <text
          x="122"
          y="121"
          className="font-display"
          fontSize="29"
          fontWeight="500"
          fill="#D8B25A"
          textLength="342"
          lengthAdjust="spacing"
        >
          SWEENEY&rsquo;S PHARMACY
        </text>
        <rect x="24" y="152" width="472" height="8" fill="#0A1B14" />

        {/* Door */}
        <rect x="44" y="176" width="128" height="372" rx="3" fill="#0A1B14" />
        <rect x="56" y="190" width="104" height="250" fill="#0A1B14" />
        <rect className="glow-layer" x="56" y="190" width="104" height="250" fill={`url(#${uid}-glass)`} />
        <rect x="56" y="448" width="104" height="88" fill="#163F2F" stroke="#D8B25A" strokeOpacity="0.4" />
        <rect x="146" y="372" width="5" height="60" rx="2.5" fill="#D8B25A" />
        <g className="glass-text" transform="translate(86 214)">
          <Mark size={44} cut="var(--color-ink)" />
        </g>
        <text x="108" y="292" textAnchor="middle" className="glass-text font-display" fontSize="13" fontWeight="500" letterSpacing="1.2">
          SWEENEY&rsquo;S
        </text>
        <text x="108" y="308" textAnchor="middle" className="glass-text font-sans" fontSize="8.5" fontWeight="700" letterSpacing="2.4">
          PHARMACY
        </text>

        {/* Open / closed door hanger */}
        {lit !== "idle" && (
          <g>
            <line x1="108" y1="326" x2="108" y2="338" stroke="#D8B25A" strokeWidth="1.5" />
            <rect
              x="74"
              y="338"
              width="68"
              height="28"
              rx="14"
              fill={lit === "on" ? "#1D4F3B" : "#0A1B14"}
              stroke="#D8B25A"
              strokeWidth="1.5"
            />
            <text
              x="108"
              y="357"
              textAnchor="middle"
              className="font-sans"
              fontSize="12"
              fontWeight="700"
              letterSpacing="2.4"
              fill={lit === "on" ? "#F6E7B8" : "#D8B25A"}
            >
              {lit === "on" ? "OPEN" : "CLOSED"}
            </text>
          </g>
        )}

        {/* Display window */}
        <rect x="188" y="176" width="292" height="372" rx="3" fill="#0A1B14" />
        <rect x="200" y="190" width="268" height="292" fill="#0A1B14" />
        <rect className="glow-layer" x="200" y="190" width="268" height="292" fill={`url(#${uid}-glass)`} />

        {/* Interior: shelves and pendant lamps */}
        <g clipPath={`url(#${uid}-pane)`} className="lamp-breathe" opacity="0.9">
          {[0, 1].map((shelf) => (
            <g key={shelf} transform={`translate(214 ${shelf === 0 ? 250 : 318})`}>
              {BOTTLES.map(([x, h], i) => (
                <rect key={i} x={x} y={-h} width="9" height={h} rx="2" fill="#5B3608" opacity={shelf === 0 ? 0.3 : 0.24} />
              ))}
              <rect x="-4" y="0" width="246" height="3" fill="#5B3608" opacity="0.38" />
            </g>
          ))}
          {[268, 400].map((x) => (
            <g key={x}>
              <line x1={x} y1="190" x2={x} y2="214" stroke="#5B3608" strokeOpacity="0.5" />
              <path d={`M${x - 11} 226a11 11 0 0 1 22 0z`} fill="#FFF3CF" />
            </g>
          ))}
        </g>

        {/* Gold-leaf hours on the glass */}
        <g className="glass-text font-sans">
          <text x="334" y="366" textAnchor="middle" fontSize="11" fontWeight="700" letterSpacing="3.4">
            OPENING HOURS
          </text>
          <line x1="292" y1="376" x2="376" y2="376" stroke="currentColor" strokeWidth="1" style={{ stroke: "var(--glass-ink)" }} />
          {rows.map((row, i) => (
            <g key={row.label} fontSize="13.5" fontWeight="500">
              <text x="232" y={400 + i * 20}>{row.label}</text>
              <text x="436" y={400 + i * 20} textAnchor="end" className="tabular">
                {row.hours}
              </text>
            </g>
          ))}
        </g>

        {/* Stall riser with the phone number */}
        <rect x="200" y="490" width="268" height="46" fill="#163F2F" stroke="#D8B25A" strokeOpacity="0.4" />
        <text x="334" y="519" textAnchor="middle" className="font-sans tabular" fontSize="17" fontWeight="700" letterSpacing="2.6" fill="#D8B25A">
          {PHONE_DISPLAY}
        </text>

        {/* Pavement and light spill */}
        <rect x="-10" y="614" width="540" height="26" fill="#0A1B14" />
        <path className="glow-layer" d="M188 614H480L548 640H120Z" fill={`url(#${uid}-spill)`} />
      </svg>
    </div>
    </div>
  );
}
