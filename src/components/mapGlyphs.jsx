// ===========================================================================
// WORLD-REGION LANDMARK GLYPHS — hand-drawn inline-SVG icons for the key folklore
// scene of every outer region (mountain, sky, underworld, river, sea, forest),
// designed to match the village glyph style in DebugView.jsx. Each is
// `function gName(x, y)` returning a <g> centred on (x,y); ~30px; soft shadow;
// thin dark strokes; muted palette. Exported as WORLD_GLYPH (name→fn) and
// WORLD_LANDMARKS (node id → glyph + label + absolute world position).
// ===========================================================================
const shadow = (cx, cy, rx, ry) => <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="rgba(0,0,0,.22)" />

// ── MOUNT TOMORR ──────────────────────────────────────────────────────────
function gBabaTomor(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(2, 16, 20, 6)}
      <polygon points="0,-4 -20,16 20,16" fill="#8b9781" stroke="#5b6653" strokeWidth={2.4} />
      <polygon points="0,-4 -7,5 7,5" fill="#eef2ee" />
      <path d="M -8 -22 Q 0 -26 8 -22 L 11 4 L -11 4 Z" fill="#9a938a" stroke="#4b463d" strokeWidth={1.8} />
      <line x1={11} y1={-26} x2={11} y2={5} stroke="#6f4f34" strokeWidth={2.2} />
      <circle cx={0} cy={-26} r={5.2} fill="#d8b48a" stroke="#4b463d" strokeWidth={1.4} />
      <path d="M -4 -24 Q 0 -10 4 -24 Z" fill="#eef2ee" stroke="#c9c2b6" strokeWidth={0.8} />
      <path d="M -5 -29 Q 0 -33 5 -29" fill="none" stroke="#eef2ee" strokeWidth={2.4} />
    </g>
  )
}
function gEagle(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(0, 15, 16, 4)}
      <polygon points="0,2 -14,15 14,15" fill="#7d8a72" stroke="#5b6653" strokeWidth={2} />
      <path d="M 0 -6 Q -20 -18 -26 -6 Q -16 -8 0 -2 Z" fill="#5c4a36" stroke="#3a2e20" strokeWidth={1.6} />
      <path d="M 0 -6 Q 20 -18 26 -6 Q 16 -8 0 -2 Z" fill="#6b5a44" stroke="#3a2e20" strokeWidth={1.6} />
      <path d="M 0 -8 L -3 4 L 3 4 Z" fill="#4f3a2a" stroke="#3a2e20" strokeWidth={1.4} />
      <circle cx={0} cy={-9} r={3.2} fill="#efe9dc" stroke="#3a2e20" strokeWidth={1.2} />
      <polygon points="0,-11 5,-9 0,-7" fill="#d8a24a" />
    </g>
  )
}
function gJutbina(x, y) {
  const kulla = (kx, h, shade) => (
    <g transform={`translate(${kx},0)`}>
      <rect x={-7} y={-h} width={14} height={h + 12} fill={shade} stroke="#4b463d" strokeWidth={2} />
      {[-7, -1.5, 4].map((bx, i) => <rect key={i} x={bx} y={-h - 4} width={3.5} height={5} fill={shade} stroke="#4b463d" strokeWidth={1} />)}
      <rect x={-1.5} y={-h + 6} width={3} height={6} fill="#2f2b24" />
      <rect x={-3} y={4} width={6} height={8} fill="#2f2b24" />
    </g>
  )
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(0, 16, 30, 6)}
      {kulla(-16, 26, '#9a948a')}
      {kulla(14, 34, '#8f8d84')}
      {kulla(-1, 44, '#a6a39b')}
    </g>
  )
}
function gShurdhi(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(0, 18, 20, 5)}
      <g fill="#5b5a63" stroke="#38363f" strokeWidth={1.8}>
        <circle cx={-12} cy={-4} r={9} />
        <circle cx={0} cy={-9} r={11} />
        <circle cx={12} cy={-4} r={9} />
        <rect x={-20} y={-6} width={40} height={9} rx={3} stroke="none" />
      </g>
      <polygon points="2,2 -6,16 1,15 -3,26 10,9 3,10 8,2" fill="#e8c24a" stroke="#a67c1c" strokeWidth={1} />
      <circle cx={-13} cy={12} r={2.2} fill="#c9d2da" />
      <circle cx={-7} cy={20} r={1.8} fill="#c9d2da" />
    </g>
  )
}
function gVerbti(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(0, 16, 15, 5)}
      <path d="M 0 16 Q -14 4 -8 -10 Q -3 -2 0 -14 Q 3 -2 8 -10 Q 14 4 0 16 Z" fill="#e8892b" stroke="#b45a1c" strokeWidth={1.8} />
      <path d="M 0 14 Q -7 4 -4 -6 Q 0 -1 0 -9 Q 4 3 4 -1 Q 6 6 0 14 Z" fill="#f4c24a" />
      <rect x={-9} y={-1} width={18} height={4.5} rx={1} fill="#4b463d" opacity={0.9} />
    </g>
  )
}
function gPeri(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(0, 16, 14, 4)}
      <path d="M -7 -14 Q 0 -18 7 -14 L 12 14 Q 0 10 -12 14 Z" fill="#f4f0e6" stroke="#c2bcae" strokeWidth={1.6} />
      <path d="M -6 -12 Q -20 -14 -18 2 Q -12 -6 -6 -6 Z" fill="#eef2ee" stroke="#b7cdd6" strokeWidth={1.3} opacity={0.9} />
      <path d="M 6 -12 Q 20 -14 18 2 Q 12 -6 6 -6 Z" fill="#eef2ee" stroke="#b7cdd6" strokeWidth={1.3} opacity={0.9} />
      <circle cx={0} cy={-17} r={4.4} fill="#efe4d6" stroke="#c2bcae" strokeWidth={1.2} />
      <path d="M -4 -19 Q 0 -23 4 -19" fill="none" stroke="#cdb078" strokeWidth={2.2} />
    </g>
  )
}
function gKatallan(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(0, 17, 18, 5)}
      <path d="M -11 16 L -9 -8 Q 0 -14 9 -8 L 11 16 Z" fill="#7a6a4f" stroke="#3f342a" strokeWidth={2} />
      <line x1={9} y1={-10} x2={20} y2={-24} stroke="#6f4f34" strokeWidth={4} strokeLinecap="round" />
      <circle cx={21} cy={-25} r={5} fill="#7c5a3c" stroke="#4f3a2a" strokeWidth={1.6} />
      <circle cx={0} cy={-16} r={7} fill="#9c8560" stroke="#3f342a" strokeWidth={1.8} />
      <circle cx={0} cy={-16} r={2.6} fill="#efe9dc" stroke="#3f342a" strokeWidth={1} />
      <circle cx={0} cy={-16} r={1.1} fill="#2f2b24" />
    </g>
  )
}
function gKreshnik(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(0, 16, 13, 5)}
      <path d="M -7 -8 Q 0 -12 7 -8 L 10 15 L -10 15 Z" fill="#6b4a3a" stroke="#3a281e" strokeWidth={1.8} />
      <circle cx={0} cy={-13} r={5} fill="#d8b48a" stroke="#3a281e" strokeWidth={1.4} />
      <path d="M -5 -15 Q 0 -21 5 -15 Z" fill="#efe9dc" stroke="#3a281e" strokeWidth={1.2} />
      <path d="M -3 -11 Q 0 -9 3 -11" fill="none" stroke="#3a281e" strokeWidth={1.4} />
      <ellipse cx={-11} cy={4} rx={4.5} ry={6} fill="#8a5a34" stroke="#3a281e" strokeWidth={1.4} transform="rotate(-20 -11 4)" />
      <line x1={-13} y1={-6} x2={-9} y2={9} stroke="#3a281e" strokeWidth={2} />
      <line x1={-13} y1={-6} x2={-9.6} y2={9} stroke="#e8e3d8" strokeWidth={0.6} />
    </g>
  )
}

// ── THE SKY REALM ─────────────────────────────────────────────────────────
function gDielli(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(2, 18, 24, 6)}
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2, lng = i % 2 ? 24 : 16
        return <line key={i} x1={Math.cos(a) * 17} y1={Math.sin(a) * 17} x2={Math.cos(a) * lng} y2={Math.sin(a) * lng} stroke="#e0a92e" strokeWidth={i % 2 ? 4.5 : 3} strokeLinecap="round" />
      })}
      <circle r={17} fill="#f6cf49" stroke="#c9871e" strokeWidth={2.4} />
      <circle r={17} fill="none" stroke="#fce38a" strokeWidth={1.4} opacity={0.7} />
      <path d="M -12 -13 L -12 -20 L -6 -15 L 0 -22 L 6 -15 L 12 -20 L 12 -13 Z" fill="#f4b41f" stroke="#a8710f" strokeWidth={1.6} />
      <circle cx={-6} cy={-2} r={1.9} fill="#7a4f10" />
      <circle cx={6} cy={-2} r={1.9} fill="#7a4f10" />
      <path d="M -6 6 A 7 7 0 0 0 6 6" fill="none" stroke="#7a4f10" strokeWidth={2.2} strokeLinecap="round" />
    </g>
  )
}
function gHena(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(2, 16, 19, 5)}
      <circle r={20} fill="#dfe7f2" opacity={0.35} />
      <path d="M 6 -18 A 18 18 0 1 0 6 18 A 14 14 0 1 1 6 -18 Z" fill="#eef3fb" stroke="#a9b6cc" strokeWidth={2.2} />
      <circle cx={-4} cy={-4} r={1.7} fill="#8f9cb5" />
      <circle cx={-4} cy={4} r={1.7} fill="#8f9cb5" />
      <path d="M -9 1 A 5 5 0 0 1 -9 -1" fill="none" stroke="#8f9cb5" strokeWidth={1.9} strokeLinecap="round" />
      <path d="M 15 -13 l 1.3 3.4 l 3.6 0.3 l -2.8 2.3 l 0.9 3.5 l -3 -2 l -3 2 l 0.9 -3.5 l -2.8 -2.3 l 3.6 -0.3 Z" fill="#fce38a" stroke="#d8b23a" strokeWidth={0.8} />
    </g>
  )
}
function gPrende(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(0, 20, 16, 5)}
      <path d="M 0 -6 L -13 20 L 13 20 Z" fill="#c98fb0" stroke="#8a4f6d" strokeWidth={2} />
      <path d="M 0 -6 L 0 20" stroke="#a86690" strokeWidth={1.2} opacity={0.6} />
      <circle cx={0} cy={-13} r={6.5} fill="#f0d9b5" stroke="#b98f5e" strokeWidth={1.6} />
      <circle cx={0} cy={-13} r={10} fill="none" stroke="#f4c8a0" strokeWidth={1.6} opacity={0.75} />
      <g transform="translate(15,-16)">
        <path d="M 0 -7 l 1.7 4.6 l 4.9 0.3 l -3.8 3.1 l 1.2 4.8 l -4 -2.7 l -4 2.7 l 1.2 -4.8 l -3.8 -3.1 l 4.9 -0.3 Z" fill="#fce38a" stroke="#e0a92e" strokeWidth={1.2} />
      </g>
    </g>
  )
}
function gBijaHene(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(0, 20, 16, 5)}
      <path d="M 0 -5 L -12 20 L 12 20 Z" fill="#5b6fae" stroke="#2f3a63" strokeWidth={2} />
      <path d="M -1 6 A 5 5 0 1 0 -1 12 A 3.6 3.6 0 1 1 -1 6 Z" fill="#eef3fb" stroke="#a9b6cc" strokeWidth={1} />
      <circle cx={0} cy={-12} r={6.5} fill="#f0d9b5" stroke="#b98f5e" strokeWidth={1.6} />
      <path d="M 0 -20 l 1.2 3.1 l 3.3 0.2 l -2.6 2.1 l 0.9 3.2 l -2.8 -1.9 l -2.8 1.9 l 0.9 -3.2 l -2.6 -2.1 l 3.3 -0.2 Z" fill="#fce38a" stroke="#d8b23a" strokeWidth={0.8} />
      <path d="M 15 -16 L 9 -3 L 14 -3 L 8 12 L 12 -1 L 8 -1 Z" fill="#f4c430" stroke="#b7860b" strokeWidth={1.2} strokeLinejoin="round" />
    </g>
  )
}
function gDiellShtepi(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(3, 22, 34, 8)}
      {[[0, 18, 22], [-20, 21, 15], [20, 21, 15]].map(([dx, dy, r], i) => <circle key={i} cx={dx} cy={dy} r={r} fill="#fff" opacity={0.9} />)}
      <rect x={-30} y={-12} width={11} height={30} rx={2} fill="#e6b53a" stroke="#a8710f" strokeWidth={1.8} />
      <rect x={19} y={-12} width={11} height={30} rx={2} fill="#e6b53a" stroke="#a8710f" strokeWidth={1.8} />
      <polygon points="-24.5,-12 -30,-22 -19,-22" fill="#f6cf49" stroke="#a8710f" strokeWidth={1.6} />
      <polygon points="24.5,-12 19,-22 30,-22" fill="#f6cf49" stroke="#a8710f" strokeWidth={1.6} />
      <rect x={-19} y={-6} width={38} height={24} rx={2} fill="#f4c634" stroke="#a8710f" strokeWidth={2.2} />
      <polygon points="-19,-6 0,-20 19,-6" fill="#f6cf49" stroke="#a8710f" strokeWidth={2} />
      <circle cx={0} cy={-9} r={2.6} fill="#fff3c4" />
      {[-11, 11].map((wx, i) => <rect key={i} x={wx - 2.5} y={-1} width={5} height={7} fill="#fff3c4" />)}
      <rect x={-4} y={7} width={8} height={11} rx={1} fill="#8a5a12" />
    </g>
  )
}
function gPemaDielli(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(1, 20, 16, 5)}
      <path d="M -3 20 L -2 2 L -6 -6 M 3 20 L 2 2 L 7 -5" fill="none" stroke="#8a5a2a" strokeWidth={4.5} strokeLinecap="round" />
      <rect x={-3.5} y={0} width={7} height={20} rx={2} fill="#8a5a2a" stroke="#5c3a18" strokeWidth={1.4} />
      <circle cx={0} cy={-9} r={16} fill="#e7c24a" stroke="#a8710f" strokeWidth={2} />
      <circle cx={-11} cy={-2} r={10} fill="#eecb52" stroke="#a8710f" strokeWidth={1.6} />
      <circle cx={11} cy={-2} r={10} fill="#eecb52" stroke="#a8710f" strokeWidth={1.6} />
      {[[-8, -12], [7, -13], [0, -3], [-12, -3], [11, -4]].map(([fx, fy], i) => (
        <g key={i} transform={`translate(${fx},${fy})`}>
          <circle r={3} fill="#f6cf49" stroke="#c9871e" strokeWidth={1} />
          {Array.from({ length: 6 }, (_, j) => { const a = (j / 6) * Math.PI * 2; return <line key={j} x1={Math.cos(a) * 3.4} y1={Math.sin(a) * 3.4} x2={Math.cos(a) * 5.2} y2={Math.sin(a) * 5.2} stroke="#e0a92e" strokeWidth={1.1} strokeLinecap="round" /> })}
        </g>
      ))}
    </g>
  )
}
function gErera(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(0, 16, 22, 6)}
      <path d="M -20 -6 C -8 -14 6 -14 6 -4 C 6 2 -2 2 -2 -3 C -2 -6 1 -6 2 -4" fill="none" stroke="#bcccde" strokeWidth={3.6} strokeLinecap="round" />
      <path d="M -22 4 C -6 -2 12 -2 12 8 C 12 14 4 14 4 9 C 4 6 7 6 8 8" fill="none" stroke="#a7bad0" strokeWidth={3.6} strokeLinecap="round" />
      <path d="M -14 14 C 0 9 14 11 14 18 C 14 22 8 22 8 18" fill="none" stroke="#cdd9e8" strokeWidth={3} strokeLinecap="round" />
      <circle cx={-20} cy={-1} r={7} fill="#eef3fb" stroke="#96a6bd" strokeWidth={1.8} />
      <circle cx={-22} cy={-3} r={1.4} fill="#6e7d94" />
      <path d="M -18 2 q 2 2 4 0" fill="none" stroke="#6e7d94" strokeWidth={1.4} strokeLinecap="round" />
    </g>
  )
}
function gDemQiell(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(2, 16, 24, 6)}
      <ellipse cx={2} cy={4} rx={19} ry={12} fill="#f2eee4" stroke="#9c8f74" strokeWidth={2.2} />
      {[-10, -2, 8, 15].map((lx, i) => <rect key={i} x={lx} y={12} width={3.4} height={10} rx={1.4} fill="#e6dfce" stroke="#9c8f74" strokeWidth={1.2} />)}
      <ellipse cx={-16} cy={-2} rx={9} ry={8} fill="#f6f2ea" stroke="#9c8f74" strokeWidth={2} />
      <path d="M -22 -8 C -27 -16 -24 -18 -20 -16 M -12 -8 C -8 -16 -12 -18 -15 -15" fill="none" stroke="#d8cba8" strokeWidth={2.6} strokeLinecap="round" />
      <circle cx={-18} cy={-2} r={1.5} fill="#5c5344" />
      <circle cx={-14} cy={0} r={1} fill="#8a7d63" />
      <path d="M -8 4 q 10 6 20 0" fill="none" stroke="#c98fb0" strokeWidth={2.4} strokeLinecap="round" />
      {[[-4, 6], [2, 8], [8, 6]].map(([gx, gy], i) => <circle key={i} cx={gx} cy={gy} r={1.8} fill="#e0a92e" />)}
    </g>
  )
}

// ── THE WORLD BELOW ───────────────────────────────────────────────────────
function gKulshedra(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(2, 14, 20, 6)}
      <path d="M-16 12 C -22 2 -10 -2 -2 3 C 8 9 18 4 15 -4" fill="none" stroke="#241d2b" strokeWidth={7} strokeLinecap="round" />
      <path d="M-16 12 C -22 2 -10 -2 -2 3 C 8 9 18 4 15 -4" fill="none" stroke="#3c3348" strokeWidth={3.4} strokeLinecap="round" />
      {[[-11, -16, -20], [0, -20, 0], [11, -16, 20]].map(([hx, hy, r], i) => (
        <g key={i} transform={`translate(${hx},${hy}) rotate(${r})`}>
          <path d="M0 14 C -3 6 -3 0 0 -4 C 3 0 3 6 0 14 Z" fill="#2e2636" stroke="#120e1a" strokeWidth={1.4} />
          <path d="M-3 -3 L0 -9 L3 -3 Z" fill="#2e2636" stroke="#120e1a" strokeWidth={1.2} />
          <circle cx={-1.6} cy={-3} r={1.2} fill="#f6cf49" />
          <circle cx={1.6} cy={-3} r={1.2} fill="#f6cf49" />
        </g>
      ))}
      <path d="M0 -22 C -4 -30 -1 -34 0 -40 C 1 -34 4 -30 0 -22 Z" fill="#e8892b" opacity={0.92} />
      <path d="M0 -24 C -2 -30 -0.6 -33 0 -37 C 0.6 -33 2 -30 0 -24 Z" fill="#f6cf49" />
    </g>
  )
}
function gBukuraDheut(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(0, 13, 8, 3)}
      <circle cx={0} cy={-3} r={14} fill="#f4ecd0" opacity={0.14} />
      <rect x={-9} y={-18} width={18} height={30} rx={2} fill="#211b28" stroke="#0f0b16" strokeWidth={1.6} />
      {[-4.5, 0, 4.5].map((bx, i) => <line key={i} x1={bx} y1={-18} x2={bx} y2={12} stroke="#4a4152" strokeWidth={1.3} />)}
      <path d="M-5 12 L-5 -2 A5 5 0 0 1 5 -2 L5 12 Z" fill="#e9e2d2" stroke="#b8a882" strokeWidth={1} />
      <circle cx={0} cy={-6} r={4} fill="#f4ecd8" stroke="#b8a882" strokeWidth={1} />
      <path d="M-4 -9 L-4 -11 L-2 -9.5 L0 -12 L2 -9.5 L4 -11 L4 -9 Z" fill="#e8b53c" stroke="#8a6a1e" strokeWidth={0.6} />
    </g>
  )
}
function gGuardianSerpent(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(0, 12, 18, 5)}
      <path d="M-18 12 A18 9 0 0 1 18 12 Z" fill="#b98a2c" stroke="#7a5a12" strokeWidth={1.4} />
      {[[-11, 9], [-3, 11], [6, 9], [12, 10], [0, 7]].map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r={2} fill="#f6cf49" stroke="#8a6a1e" strokeWidth={0.5} />)}
      <path d="M-13 8 C -18 -2 -6 -6 2 -2 C 11 2 14 -4 8 -9" fill="none" stroke="#2c3a26" strokeWidth={6} strokeLinecap="round" />
      <path d="M-13 8 C -18 -2 -6 -6 2 -2 C 11 2 14 -4 8 -9" fill="none" stroke="#4d6640" strokeWidth={2.6} strokeLinecap="round" />
      <circle cx={8} cy={-11} r={4} fill="#33422b" stroke="#141c10" strokeWidth={1.2} />
      <path d="M6 -14 l-1.5 -4 l3 2 z" fill="#e8b53c" />
      <path d="M10 -14 l1.5 -4 l-3 2 z" fill="#e8b53c" />
      <circle cx={9} cy={-11} r={1.3} fill="#f6cf49" />
    </g>
  )
}
function gDeadCity(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(4, 20, 30, 7)}
      {[[-22, -14, 12, 34], [-8, -22, 13, 42], [7, -12, 12, 32], [20, -18, 11, 38]].map(([tx, ty, tw, th], i) => (
        <g key={i}>
          <rect x={tx} y={ty} width={tw} height={th} fill="#231d2a" stroke="#0f0b16" strokeWidth={1.6} />
          <rect x={tx} y={ty - 3} width={tw * 0.35} height={3} fill="#231d2a" stroke="#0f0b16" strokeWidth={0.8} />
          <rect x={tx + tw * 0.62} y={ty - 3} width={tw * 0.38} height={3} fill="#231d2a" stroke="#0f0b16" strokeWidth={0.8} />
          <rect x={tx + 3} y={ty + 6} width={3} height={4} fill="#e8b53c" opacity={0.85} />
          <rect x={tx + tw - 6} y={ty + 12} width={3} height={4} fill="#c9a24a" opacity={0.75} />
        </g>
      ))}
    </g>
  )
}
function gBazaar(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(2, 12, 20, 5)}
      {[[-14, 0], [4, 2], [18, -1]].map(([sx, sy], i) => (
        <g key={i} transform={`translate(${sx},${sy})`}>
          <rect x={-7} y={-2} width={14} height={12} fill="#2a2330" stroke="#120e1a" strokeWidth={1.3} />
          <path d="M-9 -2 L0 -9 L9 -2 Z" fill="#5a3a3a" stroke="#2a1616" strokeWidth={1} />
          <path d="M-9 -2 L-6 -2 L-4.5 -5.5 Z" fill="#7a4d4d" />
          <path d="M-2 -2 L2 -2 L0 -6 Z" fill="#7a4d4d" />
          <circle cx={-2} cy={2} r={1.4} fill="#f6cf49" />
          <rect x={1} y={1} width={4} height={2} fill="#c9a24a" />
        </g>
      ))}
      <ellipse cx={2} cy={2} rx={22} ry={9} fill="#9fd6e0" opacity={0.08} />
    </g>
  )
}
function gShadowTrial(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(2, 12, 16, 5)}
      <rect x={-7} y={-16} width={14} height={26} rx={6} fill="#1a1420" stroke="#0d0912" strokeWidth={1.6} />
      <rect x={-7} y={-16} width={14} height={26} rx={6} fill="#c9a24a" opacity={0.14} />
      {[[-11, 0.9], [0, 1], [11, 0.9]].map(([fx, sc], i) => (
        <g key={i} transform={`translate(${fx},0) scale(${sc})`}>
          <path d="M-4 12 L-4 -3 A4 5 0 0 1 4 -3 L4 12 Z" fill="#171220" opacity={0.92} />
          <circle cx={0} cy={-6} r={3.4} fill="#171220" opacity={0.92} />
          <circle cx={-1.2} cy={-6} r={0.6} fill="#c9a24a" opacity={0.7} />
          <circle cx={1.2} cy={-6} r={0.6} fill="#c9a24a" opacity={0.7} />
        </g>
      ))}
    </g>
  )
}
function gShaft(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(1, 9, 13, 4)}
      <ellipse cx={0} cy={2} rx={13} ry={7} fill="#4a4038" stroke="#1f1a16" strokeWidth={2.2} />
      <ellipse cx={0} cy={2} rx={8.5} ry={4.6} fill="#0c0a08" />
      <ellipse cx={0} cy={3} rx={2.4} ry={1.2} fill="#e8892b" opacity={0.55} />
      <rect x={11} y={-13} width={2.4} height={15} rx={1} fill="#3a2e22" />
      <circle cx={12.2} cy={-14} r={3} fill="#e8892b" />
      <circle cx={12.2} cy={-15} r={1.6} fill="#f6cf49" />
    </g>
  )
}
function gFates(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(0, 12, 16, 5)}
      {[[-11, '#e6e0d2', '#b3ac9a'], [0, '#d9ae3e', '#8a6a1e'], [11, '#1b1622', '#0c0912']].map(([fx, body, strk], i) => (
        <g key={i} transform={`translate(${fx},0)`}>
          <path d="M-5 12 L-5 -4 Q0 -13 5 -4 L5 12 Z" fill={body} stroke={strk} strokeWidth={1.2} />
          <path d="M-3 -4 Q0 -10 3 -4 L2 0 Q0 2 -2 0 Z" fill="#100c16" opacity={0.8} />
        </g>
      ))}
      <path d="M-11 -2 Q0 -6 11 -2" fill="none" stroke="#f6cf49" strokeWidth={0.9} opacity={0.7} />
    </g>
  )
}

// ── THE RIVER & THE ZANA ──────────────────────────────────────────────────
function gZana(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(2, 14, 8, 3)}
      <path d="M11 -15 A 15 15 0 0 1 11 13" fill="none" stroke="#7a5c3a" strokeWidth={1.8} />
      <line x1={11} y1={-15} x2={11} y2={13} stroke="#d8d2c4" strokeWidth={0.8} />
      <path d="M-6 -2 L6 -2 L4 14 L-4 14 Z" fill="#b6cddb" stroke="#5e7f92" strokeWidth={1.1} />
      <line x1={-3} y1={2} x2={-2} y2={13} stroke="#8fb0c2" strokeWidth={0.7} />
      <line x1={3} y1={2} x2={2} y2={13} stroke="#8fb0c2" strokeWidth={0.7} />
      <path d="M-4 -5 q-3 8 -1 15" fill="none" stroke="#cdb06e" strokeWidth={1.4} />
      <circle cx={0} cy={-9} r={3.6} fill="#e6cfa0" stroke="#a98a52" strokeWidth={0.8} />
      <circle cx={0} cy={-14} r={1.5} fill="#f6cf49" opacity={0.85} />
    </g>
  )
}
function gBolla(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(1, 10, 14, 4)}
      <circle r={12} fill="none" stroke="#5c7a3f" strokeWidth={5} />
      <circle r={12} fill="none" stroke="#7fa356" strokeWidth={3} />
      <circle r={6} fill="none" stroke="#5c7a3f" strokeWidth={4.5} />
      <ellipse cx={11} cy={-6} rx={5} ry={3.6} fill="#7fa356" stroke="#3f5a2a" strokeWidth={1.1} transform="rotate(-30 11 -6)" />
      <line x1={9} y1={-8} x2={13} y2={-6} stroke="#2f3a20" strokeWidth={1} />
      <line x1={14} y1={-8} x2={17} y2={-10} stroke="#c24a3a" strokeWidth={0.9} strokeLinecap="round" />
    </g>
  )
}
function gRiddleElder(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(1, 13, 7, 3)}
      <line x1={7} y1={-11} x2={9} y2={13} stroke="#6f4f34" strokeWidth={1.8} strokeLinecap="round" />
      <path d="M-6 -1 L6 -1 L5 13 L-5 13 Z" fill="#8a6a45" stroke="#5c4230" strokeWidth={1.1} />
      <path d="M-3 -3 L3 -3 L1.5 7 L-1.5 7 Z" fill="#e2ddce" stroke="#b6ae98" strokeWidth={0.6} />
      <circle cx={0} cy={-7} r={3.4} fill="#cdb079" stroke="#8a6a45" strokeWidth={0.8} />
      <path d="M-4 -7 A 4 4 0 0 1 4 -7 L3 -4 L-3 -4 Z" fill="#6f5233" />
      <text x={-11} y={-6} fontSize={9} fill="#5c4230" fontStyle="italic" fontFamily="serif">?</text>
    </g>
  )
}
function gLake(x, y) {
  // the Floçka's still tarn — a real body of water, sized to read as a lake
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(0, 24, 46, 9)}
      {/* reed fringe around the shore */}
      {[[-44, -4], [-30, 18], [40, 12], [46, -8], [10, 24], [-14, -22]].map(([rx, ry], i) => (
        <line key={i} x1={rx} y1={ry} x2={rx + (i % 2 ? 3 : -3)} y2={ry - 15} stroke="#6f8a3f" strokeWidth={1.8} opacity={0.7} />
      ))}
      {/* the tarn */}
      <ellipse cx={0} cy={0} rx={49} ry={31} fill="#6ba3ba" stroke="#4d7f92" strokeWidth={2.6} />
      <ellipse cx={0} cy={-2} rx={45} ry={27} fill="#8fc3d3" opacity={0.5} />
      <ellipse cx={-12} cy={-10} rx={22} ry={9} fill="#d0e8ef" opacity={0.5} />
      {/* still-water ripples */}
      <path d="M-28 7 q 9 -4 18 0 q 9 4 18 0" fill="none" stroke="#eef7f9" strokeWidth={1.4} opacity={0.7} />
      <path d="M-16 16 q 7 -3 14 0 q 7 3 14 0" fill="none" stroke="#eef7f9" strokeWidth={1.1} opacity={0.6} />
      {/* the water-maiden — a swirl of hair and a fair head just above the water */}
      <g transform="translate(15,-4)">
        <path d="M0 4 q -8 -2 -7 -10 q 1 -7 7 -7 q 6 0 7 7 q 1 8 -7 10 Z" fill="#40707f" opacity={0.75} />
        <circle cx={0} cy={-6} r={3.2} fill="#f0d8bf" stroke="#c9a883" strokeWidth={0.6} />
      </g>
    </g>
  )
}
function gEagleNest(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(1, 11, 11, 4)}
      <path d="M-13 8 A 13 8 0 0 1 13 8 Z" fill="#8a6a45" stroke="#5c4230" strokeWidth={1.6} />
      {[[-8, 6], [-3, 5], [2, 6], [8, 6], [-5, 8], [4, 8]].map(([tx, ty], i) => <line key={i} x1={tx - 4} y1={ty} x2={tx + 4} y2={ty - 2} stroke="#6f4f34" strokeWidth={1} opacity={0.7} />)}
      <circle cx={-4} cy={2} r={3.2} fill="#cdb079" stroke="#8a6a45" strokeWidth={0.8} />
      <circle cx={4} cy={2} r={3.2} fill="#cdb079" stroke="#8a6a45" strokeWidth={0.8} />
      <path d="M-4 -1 l-1.5 -2 l1.5 0.6 z" fill="#a85f2a" />
      <path d="M4 -1 l1.5 -2 l-1.5 0.6 z" fill="#a85f2a" />
    </g>
  )
}
function gZanaGift(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(0, 11, 7, 3)}
      <path d="M-6 -2 L6 -2 L4.5 11 L-4.5 11 Z" fill="#9c7a58" stroke="#5c4230" strokeWidth={1.4} />
      <ellipse cx={0} cy={-2} rx={5.6} ry={2} fill="#f4f0e6" stroke="#d8d2c4" strokeWidth={0.7} />
      <path d="M-11 4 Q 2 -12 12 -13" fill="none" stroke="#e2ddce" strokeWidth={2.4} strokeLinecap="round" />
      <path d="M-11 4 Q 2 -12 12 -13" fill="none" stroke="#ffffff" strokeWidth={1} strokeLinecap="round" />
      {[[-6, -1], [-1, -5], [4, -8]].map(([fx, fy], i) => <line key={i} x1={fx} y1={fy} x2={fx + 3} y2={fy - 3} stroke="#c9c2b6" strokeWidth={0.7} />)}
    </g>
  )
}
function gCradleRock(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(2, 11, 13, 4)}
      <path d="M-15 12 Q -18 -6 -2 -8 Q 16 -10 15 8 Q 14 12 -15 12 Z" fill="#9a938a" stroke="#5b5348" strokeWidth={1.8} />
      <path d="M-8 -2 Q 0 -6 8 -3" fill="none" stroke="#7a736a" strokeWidth={0.9} />
      <path d="M-9 -8 A 9 5 0 0 0 9 -8 Z" fill="#8a6a45" stroke="#5c4230" strokeWidth={1.3} />
      <path d="M-9 -8 L9 -8 L6 -14 L-6 -14 Z" fill="#b6cddb" stroke="#5e7f92" strokeWidth={1} opacity={0.9} />
    </g>
  )
}

// ── THE SEA ───────────────────────────────────────────────────────────────
function gBaloz(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(2, 13, 20, 5)}
      <path d="M -22 12 q 5 -5 10 0 q 5 5 10 0 q 5 -5 10 0 q 5 5 10 0" fill="none" stroke="#e9f5f8" strokeWidth={2} opacity={0.85} />
      <path d="M -20 12 Q -13 -6 -3 8 Q 6 -10 20 12 Z" fill="#4a5b3f" stroke="#242b1c" strokeWidth={1.9} />
      <path d="M -13 6 a 2 2 0 0 0 -1 5 M 1 3 a 2 2 0 0 0 -1 6" stroke="#2c3720" strokeWidth={1.2} fill="none" opacity={0.6} />
      <path d="M 12 8 Q 8 -14 24 -16 Q 34 -14 33 -3 Q 32 6 22 10 Z" fill="#556647" stroke="#242b1c" strokeWidth={1.9} />
      <path d="M 24 -16 l 3 -6 l 4 6 Z" fill="#3c4a30" stroke="#242b1c" strokeWidth={1.2} />
      <path d="M 22 3 L 33 1 L 30 7 Z" fill="#1f2616" />
      <path d="M 25 3 l 1.5 4 l 1.5 -4 Z" fill="#efe7d5" />
      <circle cx={26} cy={-6} r={2.1} fill="#e8b53c" stroke="#242b1c" strokeWidth={0.7} />
    </g>
  )
}
function gGjergj(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(1, 12, 8, 3)}
      <line x1={9} y1={-6} x2={19} y2={-24} stroke="#c9c2b6" strokeWidth={2.4} strokeLinecap="round" />
      <line x1={5} y1={-3} x2={13} y2={-9} stroke="#8a6a45" strokeWidth={2.4} strokeLinecap="round" />
      <path d="M -7 12 L -6 -4 A 6 6 0 0 1 6 -4 L 7 12 Z" fill="#9c6142" stroke="#4f2f1e" strokeWidth={1.6} />
      <line x1={-6} y1={-1} x2={7} y2={5} stroke="#efe7d5" strokeWidth={2.6} />
      <line x1={-6} y1={2} x2={6} y2={8} stroke="#d8cfbb" strokeWidth={1.2} opacity={0.7} />
      <circle cx={0} cy={-11} r={4.6} fill="#c79a68" stroke="#7a5230" strokeWidth={1} />
    </g>
  )
}
function gSister(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(0, 12, 7, 3)}
      <path d="M -7 12 L -4 -5 A 5 5 0 0 1 6 -5 L 8 12 Z" fill="#7a5c6a" stroke="#3f2e37" strokeWidth={1.5} />
      <circle cx={0} cy={-11} r={4.4} fill="#c79a68" stroke="#7a5230" strokeWidth={1} />
      <path d="M -4 -11 Q -6 -2 -3 6 M 4 -11 Q 6 -2 3 6" stroke="#3a2b22" strokeWidth={2.2} fill="none" strokeLinecap="round" />
      <ellipse cx={9} cy={2} rx={3.4} ry={4.4} fill="#a9825f" stroke="#4f3a2a" strokeWidth={1.1} />
      <rect x={7.6} y={-3} width={2.8} height={2.4} fill="#7a5c3a" />
    </g>
  )
}
function gBukuraDetit(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(0, 13, 11, 4)}
      <path d="M -15 12 q 4 -5 8 0 q 4 5 8 0 q 4 -5 8 0" fill="none" stroke="#e9f5f8" strokeWidth={2} opacity={0.9} />
      <path d="M -5 12 L -3 -3 A 4 4 0 0 1 5 -3 L 6 12 Z" fill="#d7c6a6" stroke="#8a6238" strokeWidth={1.3} />
      <circle cx={1} cy={-9} r={4.2} fill="#e6cfa2" stroke="#8a6238" strokeWidth={1} />
      <path d="M -3 -9 Q -12 -1 -9 12 M 5 -9 Q 13 -2 10 12" stroke="#e8c24a" strokeWidth={2.6} fill="none" strokeLinecap="round" />
      <path d="M -6 -8 Q -9 0 -7 10" stroke="#f2d873" strokeWidth={1.4} fill="none" opacity={0.8} />
    </g>
  )
}
function gShoreKulla(x, y) {
  const w = 18, h = 40
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(3, h / 2 + 2, w * 0.8, 5)}
      <path d="M -15 20 Q 0 14 16 20 L 14 24 L -14 24 Z" fill="#8b8378" stroke="#5b5348" strokeWidth={1.4} />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} fill="#c6bfaf" stroke="#5b5348" strokeWidth={2} />
      <rect x={-w / 2 + 2.5} y={-h / 2 + 2.5} width={w - 5} height={h - 5} fill="none" stroke="#8b8378" strokeWidth={0.9} />
      {[-w / 2, -w / 2 + 6, -w / 2 + 12].map((bx, i) => <rect key={i} x={bx} y={-h / 2 - 3.5} width={4} height={4} fill="#c6bfaf" stroke="#5b5348" strokeWidth={1} />)}
      <rect x={-3} y={-11} width={6} height={7} fill="#e8b53c" opacity={0.85} />
      <rect x={-3} y={8} width={6} height={11} fill="#2f2b24" />
    </g>
  )
}
function gGraveLahuta(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(1, 11, 15, 4)}
      <path d="M -15 12 Q 0 -1 15 12 Z" fill="#8aa35a" stroke="#6c6152" strokeWidth={1.5} />
      <path d="M -13 12 L -13 -1 A 5 5 0 0 1 -3 -1 L -3 12 Z" fill="#d8d2c4" stroke="#8a8172" strokeWidth={1.6} />
      <line x1={-8} y1={-6} x2={-8} y2={2} stroke="#9a938a" strokeWidth={1.1} />
      <line x1={-11} y1={-2} x2={-5} y2={-2} stroke="#9a938a" strokeWidth={1.1} />
      <g transform="translate(8,2) rotate(18)">
        <ellipse cx={0} cy={6} rx={5} ry={7} fill="#7a5c3a" stroke="#4f3a2a" strokeWidth={1.4} />
        <rect x={-1.4} y={-16} width={2.8} height={16} rx={1} fill="#8a6a45" stroke="#4f3a2a" strokeWidth={1} />
        <path d="M -1.4 -16 q -3 -1 -1 -4" stroke="#4f3a2a" strokeWidth={1.4} fill="none" />
        <line x1={0} y1={-15} x2={0} y2={11} stroke="#efe7d5" strokeWidth={0.8} />
      </g>
    </g>
  )
}
function gFishingCoast(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(2, 12, 22, 5)}
      <path d="M -24 14 Q 0 8 24 14 L 22 18 L -22 18 Z" fill="#d8c79c" stroke="#b09a6a" strokeWidth={1.3} />
      <g transform="translate(-13,-2)">
        <rect x={-9} y={-6} width={18} height={13} rx={1.5} fill="#a9825f" stroke="#573f2d" strokeWidth={1.4} />
        <line x1={-9} y1={0.5} x2={9} y2={0.5} stroke="#573f2d" strokeWidth={1.1} />
      </g>
      <g transform="translate(11,6)">
        <path d="M -12 0 L 12 0 L 8 8 L -8 8 Z" fill="#7a5c3a" stroke="#4f3a2a" strokeWidth={1.6} />
        <line x1={-12} y1={0} x2={12} y2={0} stroke="#4f3a2a" strokeWidth={1.4} />
        <rect x={-0.8} y={-15} width={2} height={15} fill="#4f3a2a" />
        <path d="M 1 -14 L 10 -3 L 1 -3 Z" fill="#efe7d5" />
      </g>
    </g>
  )
}

// ── THE GREAT FOREST ──────────────────────────────────────────────────────
function gTraveller(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(0, 11, 14, 4)}
      <path d="M-11 10 L-7 -6 A7 7 0 0 1 7 -6 L11 10 Z" fill="#5c4f6b" stroke="#2e2838" strokeWidth={1.6} />
      <circle cx={0} cy={-9} r={5} fill="#3f3750" stroke="#2e2838" strokeWidth={1.4} />
      <path d="M-5 -10 A5 5 0 0 1 5 -10 L5 -8 A5 5 0 0 0 -5 -8 Z" fill="#2e2838" />
      <line x1={9} y1={11} x2={16} y2={5} stroke="#7a5c3a" strokeWidth={2} />
      <line x1={17} y1={11} x2={10} y2={5} stroke="#7a5c3a" strokeWidth={2} />
      <path d="M13 9 C 9 4 11 0 13 -5 C 15 0 17 4 13 9 Z" fill="#e8892b" />
      <path d="M13 8 C 11 4 12 1 13 -2 C 14 1 15 4 13 8 Z" fill="#f6cf49" />
    </g>
  )
}
function gCampfire(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(0, 10, 12, 4)}
      <line x1={-9} y1={10} x2={8} y2={0} stroke="#7a5c3a" strokeWidth={3} strokeLinecap="round" />
      <line x1={9} y1={10} x2={-8} y2={0} stroke="#6f4f34" strokeWidth={3} strokeLinecap="round" />
      <path d="M0 8 C -8 0 -3 -8 0 -16 C 3 -8 8 0 0 8 Z" fill="#e8892b" />
      <path d="M0 7 C -4 1 -1.5 -5 0 -11 C 1.5 -5 4 1 0 7 Z" fill="#f6cf49" />
      <circle cx={-6} cy={-10} r={1.2} fill="#f6cf49" opacity={0.8} />
      <circle cx={7} cy={-12} r={1} fill="#e8892b" opacity={0.8} />
    </g>
  )
}
function gWolf(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(0, 9, 15, 4)}
      {[-10, -5, 5, 10].map((lx, i) => <line key={i} x1={lx} y1={3} x2={lx} y2={9} stroke="#6a6c72" strokeWidth={2.4} strokeLinecap="round" />)}
      <ellipse cx={0} cy={0} rx={14} ry={6} fill="#8b8d93" stroke="#4a4c52" strokeWidth={1.4} />
      <path d="M-13 -1 Q -22 2 -20 9" fill="none" stroke="#8b8d93" strokeWidth={3.4} strokeLinecap="round" />
      <path d="M11 -3 L23 -1 L21 5 L12 5 Z" fill="#8b8d93" stroke="#4a4c52" strokeWidth={1.4} />
      <path d="M12 -4 l-2 -6 l4 3 z" fill="#7a7c82" stroke="#4a4c52" strokeWidth={1} />
      <path d="M16 -4 l0 -6 l3 4 z" fill="#7a7c82" stroke="#4a4c52" strokeWidth={1} />
      <circle cx={16} cy={-1} r={1.1} fill="#f4c430" />
    </g>
  )
}
function gBear(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(0, 10, 16, 5)}
      {[-11, -6, 6, 11].map((lx, i) => <line key={i} x1={lx} y1={4} x2={lx} y2={10} stroke="#6a4a30" strokeWidth={3.2} strokeLinecap="round" />)}
      <ellipse cx={0} cy={0} rx={15} ry={9} fill="#8a5d38" stroke="#4f341f" strokeWidth={1.6} />
      <circle cx={14} cy={-3} r={7} fill="#8a5d38" stroke="#4f341f" strokeWidth={1.6} />
      <circle cx={10} cy={-9} r={2.8} fill="#7a4f30" stroke="#4f341f" strokeWidth={1.1} />
      <circle cx={18} cy={-9} r={2.8} fill="#7a4f30" stroke="#4f341f" strokeWidth={1.1} />
      <ellipse cx={19} cy={-1} rx={3.4} ry={2.6} fill="#c7a678" stroke="#4f341f" strokeWidth={1} />
      <circle cx={21} cy={-1.5} r={1.1} fill="#2e2019" />
      <circle cx={13} cy={-4} r={1.1} fill="#2e2019" />
    </g>
  )
}
function gFox(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(0, 8, 13, 4)}
      {[-8, -4, 4, 8].map((lx, i) => <line key={i} x1={lx} y1={2} x2={lx} y2={8} stroke="#8a4a22" strokeWidth={2} strokeLinecap="round" />)}
      <ellipse cx={0} cy={0} rx={11} ry={5} fill="#c96b2e" stroke="#7a3f1c" strokeWidth={1.3} />
      <path d="M-10 -1 Q -20 -3 -22 4" fill="none" stroke="#c96b2e" strokeWidth={4.5} strokeLinecap="round" />
      <circle cx={-22} cy={4} r={2.6} fill="#efe9dc" stroke="#7a3f1c" strokeWidth={0.8} />
      <path d="M9 -2 L20 0 L11 5 Z" fill="#c96b2e" stroke="#7a3f1c" strokeWidth={1.3} />
      <path d="M9 -3 l-1 -7 l5 4 z" fill="#b05a24" stroke="#7a3f1c" strokeWidth={1} />
      <path d="M14 -2 l1 -7 l3 5 z" fill="#b05a24" stroke="#7a3f1c" strokeWidth={1} />
      <circle cx={14} cy={0} r={1} fill="#2e1c12" />
      <circle cx={20} cy={0.4} r={1} fill="#2e1c12" />
    </g>
  )
}
function gWitch(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(-1, 13, 11, 4)}
      <line x1={9} y1={-6} x2={11} y2={13} stroke="#5c4230" strokeWidth={2} strokeLinecap="round" />
      <path d="M-11 13 Q -13 -2 -3 -8 Q 4 -4 6 13 Z" fill="#3b2f45" stroke="#221a2b" strokeWidth={1.6} />
      <circle cx={-4} cy={-10} r={4.6} fill="#9a8a6c" stroke="#5c4f3a" strokeWidth={1.2} />
      <path d="M-8 -9 l-4 2 l4 1 z" fill="#9a8a6c" stroke="#5c4f3a" strokeWidth={0.8} />
      <path d="M-9 -11 Q -4 -18 1 -11 Q -4 -14 -9 -11 Z" fill="#221a2b" />
      <circle cx={-5} cy={-10} r={1} fill="#c1352b" />
    </g>
  )
}
function gRevenant(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(0, 13, 10, 3)}
      <path d="M-9 12 L-9 -6 A9 9 0 0 1 9 -6 L9 12 L5 8 L1 12 L-3 8 Z" fill="#d8d6cf" stroke="#8a877d" strokeWidth={1.4} opacity={0.95} />
      <rect x={-9} y={-1} width={18} height={7} fill="#7d828b" stroke="#4a4c52" strokeWidth={1.1} />
      {[-6, -2, 2, 6].map((mx, i) => <circle key={i} cx={mx} cy={2.5} r={1.2} fill="#aeb2b9" stroke="#4a4c52" strokeWidth={0.5} />)}
      <circle cx={0} cy={-7} r={5} fill="#eae8e2" stroke="#8a877d" strokeWidth={1.2} />
      <circle cx={-2} cy={-7} r={1.2} fill="#2e2b26" />
      <circle cx={2} cy={-7} r={1.2} fill="#2e2b26" />
    </g>
  )
}
function gDhampir(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(-3, 13, 12, 4)}
      <path d="M8 12 L8 0 A5 5 0 0 1 18 0 L18 12 L14 9 L11 12 Z" fill="#cfcdc6" stroke="#8a877d" strokeWidth={1} opacity={0.75} />
      <path d="M-13 13 L-9 -3 A6 6 0 0 1 3 -3 L1 13 Z" fill="#5a3a3f" stroke="#331e22" strokeWidth={1.5} />
      <circle cx={-3} cy={-7} r={4.4} fill="#c7a07a" stroke="#7a5638" strokeWidth={1.1} />
      <line x1={2} y1={-3} x2={15} y2={-16} stroke="#7a5c3a" strokeWidth={2.2} strokeLinecap="round" />
      <line x1={4} y1={-4} x2={16} y2={-16} stroke="#e6e2d6" strokeWidth={1.6} strokeLinecap="round" />
      <line x1={0} y1={-1} x2={5} y2={-6} stroke="#3a2a1c" strokeWidth={2.4} strokeLinecap="round" />
    </g>
  )
}
function gShtojzovalle(x, y) {
  const ring = [[0, -11], [10, 6], [-10, 6]]
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(0, 12, 14, 4)}
      <ellipse cx={0} cy={1} rx={14} ry={11} fill="none" stroke="#8fb9c4" strokeWidth={1.2} strokeDasharray="3 3" opacity={0.7} />
      <circle cx={13} cy={-13} r={4.5} fill="#eef2f4" opacity={0.85} />
      <circle cx={15} cy={-14} r={3.6} fill="#43603c" opacity={0.6} />
      {ring.map(([dx, dy], i) => (
        <g key={i} transform={`translate(${dx},${dy})`}>
          <circle cx={0} cy={-4} r={2.4} fill="#e7dff0" stroke="#9a90ad" strokeWidth={0.8} />
          <path d="M-3 6 L-2 -2 L2 -2 L3 6 Z" fill="#cfc4e4" stroke="#9a90ad" strokeWidth={0.8} />
        </g>
      ))}
    </g>
  )
}

// ── GENERIC glyphs — every OTHER node (no bespoke landmark) still gets a small
// thematic icon instead of a plain dot: endings by kind, hubs a signpost-ring,
// and ordinary scenes a little region token. Kept tiny (2–4 shapes) for speed.
function gEndGood(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      <path d="M-5 4 Q-8 -3 -4 -7" fill="none" stroke="#3ec46d" strokeWidth={1.8} strokeLinecap="round" />
      <path d="M5 4 Q8 -3 4 -7" fill="none" stroke="#3ec46d" strokeWidth={1.8} strokeLinecap="round" />
      <circle cx={0} cy={-1} r={2.6} fill="#e7b53c" stroke="#3ec46d" strokeWidth={1} />
    </g>
  )
}
function gEndBad(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      <path d="M-6 5 Q0 1 6 5 Z" fill="#6c6152" />
      <path d="M-3.2 5 L-3.2 -3 A3.2 3.2 0 0 1 3.2 -3 L3.2 5 Z" fill="#c3bcae" stroke="#e5544b" strokeWidth={1.2} />
      <line x1={-1.6} y1={-2} x2={1.6} y2={-2} stroke="#8a8172" strokeWidth={1} />
    </g>
  )
}
function gEndSecret(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      <path d="M0 -7 l1.7 4.5 l4.8 0.3 l-3.7 3 l1.2 4.7 l-4 -2.7 l-4 2.7 l1.2 -4.7 l-3.7 -3 l4.8 -0.3 Z"
            fill="#e7b53c" stroke="#a8790f" strokeWidth={0.9} />
    </g>
  )
}
function gHubMark(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      <circle cx={0} cy={0} r={5.5} fill="none" stroke="#b07bff" strokeWidth={1.8} opacity={0.85} />
      <circle cx={0} cy={0} r={2} fill="#b07bff" />
    </g>
  )
}
const SCENE = {
  forest: (x, y) => (
    <g transform={`translate(${x},${y})`}>
      <rect x={-1} y={2} width={2} height={4} fill="#6f4f34" />
      <polygon points="0,-7 -5,3 5,3" fill="#4c6743" stroke="#28351f" strokeWidth={0.8} />
      <polygon points="0,-3 -4,4 4,4" fill="#587a49" stroke="#28351f" strokeWidth={0.7} />
    </g>
  ),
  mountain: (x, y) => (
    <g transform={`translate(${x},${y})`}>
      <polygon points="0,-6 -6,5 6,5" fill="#8b9781" stroke="#5b6653" strokeWidth={1} />
      <polygon points="0,-6 -2.2,-1.2 2.2,-1.2" fill="#eef2ee" />
    </g>
  ),
  sky: (x, y) => (
    <g transform={`translate(${x},${y})`}>
      <circle cx={-3} cy={1} r={3.4} fill="#eef3fb" opacity={0.9} />
      <circle cx={3} cy={1} r={3} fill="#eef3fb" opacity={0.9} />
      <circle cx={0} cy={-2} r={3.2} fill="#f4f8ff" opacity={0.95} />
    </g>
  ),
  river: (x, y) => (
    <g transform={`translate(${x},${y})`}>
      <path d="M-6 1 q3 -3 6 0 q3 3 6 0" fill="none" stroke="#6fa7bc" strokeWidth={1.8} strokeLinecap="round" />
      <path d="M-6 4 q3 -3 6 0 q3 3 6 0" fill="none" stroke="#9fcdda" strokeWidth={1.4} strokeLinecap="round" />
    </g>
  ),
  sea: (x, y) => (
    <g transform={`translate(${x},${y})`}>
      <path d="M-6 2 q3 -3.5 6 0 q3 3.5 6 0" fill="none" stroke="#5f9ab2" strokeWidth={2} strokeLinecap="round" />
      <path d="M-4 -2 q2 -2.5 4 0" fill="none" stroke="#bfe0ea" strokeWidth={1.3} strokeLinecap="round" />
    </g>
  ),
  underworld: (x, y) => (
    <g transform={`translate(${x},${y})`}>
      <polygon points="0,6 -3.5,-4 3.5,-4" fill="#3a3342" stroke="#161320" strokeWidth={0.8} />
      <circle cx={0} cy={-4} r={1.3} fill="#e8892b" opacity={0.85} />
    </g>
  ),
  village: (x, y) => (
    <g transform={`translate(${x},${y})`}>
      <rect x={-4} y={-3} width={8} height={7} rx={1} fill="#a9825f" stroke="#573f2d" strokeWidth={1} />
      <line x1={-4} y1={0.5} x2={4} y2={0.5} stroke="#573f2d" strokeWidth={0.8} />
    </g>
  ),
}
// draw the right small glyph for a plain node — endings by kind, hubs a ring,
// everything else a region token (falls back to a scene dot).
export function genericGlyph(x, y, kind, region) {
  if (kind === 'good') return gEndGood(x, y)
  if (kind === 'bad') return gEndBad(x, y)
  if (kind === 'secret') return gEndSecret(x, y)
  if (kind === 'hub') return gHubMark(x, y)
  return (SCENE[region] || SCENE.village)(x, y)
}

// ── dispatcher + placements ────────────────────────────────────────────────
export const WORLD_GLYPH = {
  gBabaTomor, gEagle, gJutbina, gShurdhi, gVerbti, gPeri, gKatallan, gKreshnik,
  gDielli, gHena, gPrende, gBijaHene, gDiellShtepi, gPemaDielli, gErera, gDemQiell,
  gKulshedra, gBukuraDheut, gGuardianSerpent, gDeadCity, gBazaar, gShadowTrial, gShaft, gFates,
  gZana, gBolla, gRiddleElder, gLake, gEagleNest, gZanaGift, gCradleRock,
  gBaloz, gGjergj, gSister, gBukuraDetit, gShoreKulla, gGraveLahuta, gFishingCoast,
  gTraveller, gCampfire, gWolf, gBear, gFox, gWitch, gRevenant, gDhampir, gShtojzovalle,
}

export const WORLD_LANDMARKS = [
  // Mount Tomorr — placed up the ridges: summit figures high, approach low
  { id: 'maja', glyph: 'gBabaTomor', label: 'Baba Tomor', x: 800, y: -890 },
  { id: 'majaEagle', glyph: 'gEagle', label: 'Eagle of Tomorr', x: 1060, y: -770 },
  { id: 'shurdhi1', glyph: 'gShurdhi', label: 'Shurdhi', x: 540, y: -730 },
  { id: 'verbti1', glyph: 'gVerbti', label: 'i Verbti', x: 1150, y: -560 },
  { id: 'peri1', glyph: 'gPeri', label: 'Peri', x: 700, y: -560 },
  { id: 'katallan1', glyph: 'gKatallan', label: 'Katallan', x: 440, y: -400 },
  { id: 'jutbina', glyph: 'gJutbina', label: 'Jutbina', x: 1080, y: -380 },
  { id: 'mujoHak1', glyph: 'gKreshnik', label: 'Mujo', x: 820, y: -350 },
  // the sky realm — Dielli the Sun upper-left, Hëna the Moon upper-right
  { id: 'qiellDiell', glyph: 'gDielli', label: 'Dielli (the Sun)', x: 470, y: -1230 },
  { id: 'henaPaqe', glyph: 'gHena', label: 'Hëna (the Moon)', x: 1310, y: -1330 },
  { id: 'qiellDem1', glyph: 'gDemQiell', label: 'Demi (white bull)', x: 730, y: -1400 },
  { id: 'diellShtepi1', glyph: 'gDiellShtepi', label: 'Shtëpia e Diellit', x: 980, y: -1140 },
  { id: 'bijaHene1', glyph: 'gBijaHene', label: 'E Bija e Hënës e Diellit', x: 1200, y: -1130 },
  { id: 'qiellPrende', glyph: 'gPrende', label: 'Prende', x: 340, y: -1050 },
  { id: 'pemaDielli', glyph: 'gPemaDielli', label: 'Pema e Diellit', x: 660, y: -1055 },
  { id: 'qiellErera1', glyph: 'gErera', label: 'Erërat (the winds)', x: 1370, y: -1010 },
  // the world below
  { id: 'pusi', glyph: 'gShaft', label: 'the well descent', x: -20, y: 1440 },
  { id: 'sprova', glyph: 'gShadowTrial', label: 'the shadow trial', x: 200, y: 1640 },
  { id: 'gjarpri', glyph: 'gGuardianSerpent', label: 'the guardian serpent', x: 240, y: 1880 },
  { id: 'qyteti', glyph: 'gDeadCity', label: 'the dead city', x: 560, y: 1480 },
  { id: 'treg', glyph: 'gBazaar', label: 'the ghostly market', x: 560, y: 1720 },
  { id: 'humbur', glyph: 'gFates', label: 'the three Fates', x: 780, y: 1950 },
  { id: 'bukura1', glyph: 'gBukuraDheut', label: 'E Bukura e Dheut', x: 900, y: 1600 },
  { id: 'kulshedra1', glyph: 'gKulshedra', label: 'the Kulshedra', x: 1080, y: 1800 },
  // the river & the Zana
  { id: 'lumi', glyph: 'gBolla', label: 'the Bolla', x: 1200, y: 460 },
  { id: 'zana1', glyph: 'gZana', label: 'the Zana', x: 1420, y: 560 },
  { id: 'zanaProva', glyph: 'gCradleRock', label: "the Zana's trial", x: 1640, y: 620 },
  { id: 'zanaQumesht', glyph: 'gZanaGift', label: "the Zana's gifts", x: 1500, y: 790 },
  { id: 'zanaFole', glyph: 'gEagleNest', label: "the eagle's nest", x: 1250, y: 720 },
  { id: 'flocka1', glyph: 'gLake', label: 'the still lake', x: 1440, y: 900 },
  { id: 'ura', glyph: 'gRiddleElder', label: 'the bridge riddle', x: 1580, y: 1000 },
  // the sea
  { id: 'bregu', glyph: 'gFishingCoast', label: 'the shore village', x: 1660, y: 1120 },
  { id: 'balozMotra', glyph: 'gSister', label: 'the devoted sister', x: 1860, y: 1160 },
  { id: 'balozTribut', glyph: 'gShoreKulla', label: "the sister's kulla", x: 1720, y: 1330 },
  { id: 'balozLufte', glyph: 'gBaloz', label: 'the Baloz', x: 2080, y: 1300 },
  { id: 'balozKoke', glyph: 'gGjergj', label: 'Gjergj Elez Alia', x: 1940, y: 1420 },
  { id: 'balozFitore', glyph: 'gGraveLahuta', label: 'the single grave', x: 1780, y: 1560 },
  { id: 'detiThelle2', glyph: 'gBukuraDetit', label: 'E Bukura e Detit', x: 2300, y: 1500 },
  { id: 'deti1', glyph: 'gFishingCoast', label: 'the coast', x: 2260, y: 1180 },
  // the great forest
  { id: 'start', glyph: 'gTraveller', label: 'the benighted traveller', x: 150, y: 250 },
  { id: 'zjarriPyll', glyph: 'gCampfire', label: 'the fire in the forest', x: -120, y: 380 },
  { id: 'pylli1', glyph: 'gBear', label: 'the bear & the dervish', x: -330, y: 400 },
  { id: 'ujk', glyph: 'gWolf', label: 'the hungry wolf', x: -510, y: 560 },
  { id: 'dhelpra1', glyph: 'gFox', label: 'the sly fox', x: -150, y: 600 },
  { id: 'shtrigaNate', glyph: 'gWitch', label: 'the night-witch', x: -400, y: 640 },
  { id: 'shtojzovalle1', glyph: 'gShtojzovalle', label: 'the moon-dancers', x: -220, y: 820 },
  { id: 'karkanxholl1', glyph: 'gRevenant', label: 'the iron-clad revenant', x: -470, y: 850 },
  { id: 'dhampir1', glyph: 'gDhampir', label: 'the dhampir & the lugat', x: -140, y: 940 },
]
