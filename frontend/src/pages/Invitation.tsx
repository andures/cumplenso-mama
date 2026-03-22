import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import RSVPForm from "../components/RSVPForm";
import { getAttendees } from "../storage";

/* ── Botanical SVG – dark eucalyptus + gold shimmer (left column) ─────────── */
const BotanicalLeft = () => (
  <svg
    viewBox="0 0 240 950"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%" }}
    preserveAspectRatio="xMinYMin slice"
  >
    <defs>
      <filter id="ls" x="-20%" y="-20%" width="150%" height="150%">
        <feDropShadow
          dx="2"
          dy="4"
          stdDeviation="5"
          floodColor="#050f08"
          floodOpacity="0.30"
        />
      </filter>
    </defs>

    {/* Main stem */}
    <path
      d="M 112 5 C 109 80 116 155 111 230 C 106 305 114 380 109 455 C 104 530 111 605 107 680 C 103 755 109 830 105 905"
      stroke="#2d5a3d"
      strokeWidth="2.2"
      strokeLinecap="round"
      fill="none"
    />

    {/* CLUSTER 1 – upper, right-leaning */}
    <g filter="url(#ls)">
      <g transform="translate(111,78) rotate(62)">
        <path
          d="M 0,50 C -31,36 -35,0 0,-50 C 35,0 31,36 0,50 Z"
          fill="#1a3a2a"
          opacity="0.93"
        />
        <path
          d="M 0,50 L 0,-50"
          stroke="#2d5a3d"
          strokeWidth="1.4"
          opacity="0.32"
          fill="none"
        />
        <path
          d="M 0,50 C -31,36 -35,0 0,-50 C 35,0 31,36 0,50 Z"
          stroke="#c9a84c"
          strokeWidth="1.8"
          fill="none"
          opacity="0.24"
        />
      </g>
      <g transform="translate(144,44) rotate(46)">
        <path
          d="M 0,35 C -22,25 -25,0 0,-35 C 25,0 22,25 0,35 Z"
          fill="#1c3e2c"
          opacity="0.80"
        />
        <path
          d="M 0,35 L 0,-35"
          stroke="#2d5a3d"
          strokeWidth="1.1"
          opacity="0.28"
          fill="none"
        />
      </g>
      <g transform="translate(158,16) rotate(36)">
        <path
          d="M 0,22 C -13,15 -15,0 0,-22 C 15,0 13,15 0,22 Z"
          fill="#22472e"
          opacity="0.63"
        />
      </g>
    </g>

    {/* CLUSTER 2 – left-leaning */}
    <g filter="url(#ls)">
      <g transform="translate(109,188) rotate(-70)">
        <path
          d="M 0,54 C -34,38 -38,0 0,-54 C 38,0 34,38 0,54 Z"
          fill="#1a3a2a"
          opacity="0.91"
        />
        <path
          d="M 0,54 L 0,-54"
          stroke="#2d5a3d"
          strokeWidth="1.4"
          opacity="0.32"
          fill="none"
        />
        <path
          d="M 0,54 C -34,38 -38,0 0,-54 C 38,0 34,38 0,54 Z"
          stroke="#c9a84c"
          strokeWidth="1.8"
          fill="none"
          opacity="0.21"
        />
      </g>
      <g transform="translate(75,160) rotate(-52)">
        <path
          d="M 0,38 C -23,27 -27,0 0,-38 C 27,0 23,27 0,38 Z"
          fill="#1c3e2c"
          opacity="0.77"
        />
        <path
          d="M 0,38 L 0,-38"
          stroke="#2d5a3d"
          strokeWidth="1.1"
          opacity="0.28"
          fill="none"
        />
      </g>
      <g transform="translate(56,210) rotate(-82)">
        <path
          d="M 0,26 C -16,18 -18,0 0,-26 C 18,0 16,18 0,26 Z"
          fill="#22472e"
          opacity="0.62"
        />
      </g>
    </g>

    {/* CLUSTER 3 – right, big */}
    <g filter="url(#ls)">
      <g transform="translate(111,298) rotate(74)">
        <path
          d="M 0,56 C -35,40 -39,0 0,-56 C 39,0 35,40 0,56 Z"
          fill="#1a3a2a"
          opacity="0.89"
        />
        <path
          d="M 0,56 L 0,-56"
          stroke="#2d5a3d"
          strokeWidth="1.4"
          opacity="0.30"
          fill="none"
        />
        <path
          d="M 0,56 C -35,40 -39,0 0,-56 C 39,0 35,40 0,56 Z"
          stroke="#c9a84c"
          strokeWidth="1.8"
          fill="none"
          opacity="0.20"
        />
      </g>
      <g transform="translate(150,268) rotate(54)">
        <path
          d="M 0,39 C -24,27 -27,0 0,-39 C 27,0 24,27 0,39 Z"
          fill="#1c3e2c"
          opacity="0.73"
        />
        <path
          d="M 0,39 L 0,-39"
          stroke="#2d5a3d"
          strokeWidth="1.1"
          opacity="0.26"
          fill="none"
        />
      </g>
      <g transform="translate(170,286) rotate(40)">
        <path
          d="M 0,25 C -15,17 -17,0 0,-25 C 17,0 15,17 0,25 Z"
          fill="#22472e"
          opacity="0.57"
        />
      </g>
    </g>

    {/* CLUSTER 4 – left */}
    <g filter="url(#ls)">
      <g transform="translate(107,402) rotate(-66)">
        <path
          d="M 0,52 C -32,37 -36,0 0,-52 C 36,0 32,37 0,52 Z"
          fill="#1a3a2a"
          opacity="0.86"
        />
        <path
          d="M 0,52 L 0,-52"
          stroke="#2d5a3d"
          strokeWidth="1.3"
          opacity="0.30"
          fill="none"
        />
        <path
          d="M 0,52 C -32,37 -36,0 0,-52 C 36,0 32,37 0,52 Z"
          stroke="#c9a84c"
          strokeWidth="1.5"
          fill="none"
          opacity="0.18"
        />
      </g>
      <g transform="translate(73,375) rotate(-49)">
        <path
          d="M 0,34 C -21,24 -24,0 0,-34 C 24,0 21,24 0,34 Z"
          fill="#1c3e2c"
          opacity="0.71"
        />
        <path
          d="M 0,34 L 0,-34"
          stroke="#2d5a3d"
          strokeWidth="1"
          opacity="0.25"
          fill="none"
        />
      </g>
      <g transform="translate(55,422) rotate(-76)">
        <path
          d="M 0,23 C -14,16 -16,0 0,-23 C 16,0 14,16 0,23 Z"
          fill="#22472e"
          opacity="0.56"
        />
      </g>
    </g>

    {/* CLUSTER 5 – right */}
    <g filter="url(#ls)">
      <g transform="translate(109,507) rotate(69)">
        <path
          d="M 0,46 C -29,33 -32,0 0,-46 C 32,0 29,33 0,46 Z"
          fill="#1a3a2a"
          opacity="0.84"
        />
        <path
          d="M 0,46 L 0,-46"
          stroke="#2d5a3d"
          strokeWidth="1.3"
          opacity="0.28"
          fill="none"
        />
        <path
          d="M 0,46 C -29,33 -32,0 0,-46 C 32,0 29,33 0,46 Z"
          stroke="#c9a84c"
          strokeWidth="1.5"
          fill="none"
          opacity="0.17"
        />
      </g>
      <g transform="translate(141,482) rotate(51)">
        <path
          d="M 0,31 C -19,22 -21,0 0,-31 C 21,0 19,22 0,31 Z"
          fill="#1c3e2c"
          opacity="0.66"
        />
      </g>
    </g>

    {/* CLUSTER 6 – left */}
    <g filter="url(#ls)">
      <g transform="translate(106,607) rotate(-61)">
        <path
          d="M 0,42 C -26,30 -29,0 0,-42 C 29,0 26,30 0,42 Z"
          fill="#1a3a2a"
          opacity="0.81"
        />
        <path
          d="M 0,42 L 0,-42"
          stroke="#2d5a3d"
          strokeWidth="1.2"
          opacity="0.26"
          fill="none"
        />
      </g>
      <g transform="translate(77,582) rotate(-46)">
        <path
          d="M 0,29 C -18,20 -20,0 0,-29 C 20,0 18,20 0,29 Z"
          fill="#1c3e2c"
          opacity="0.62"
        />
      </g>
    </g>

    {/* CLUSTER 7 – right */}
    <g>
      <g transform="translate(108,700) rotate(66)">
        <path
          d="M 0,38 C -23,27 -26,0 0,-38 C 26,0 23,27 0,38 Z"
          fill="#1a3a2a"
          opacity="0.76"
        />
        <path
          d="M 0,38 L 0,-38"
          stroke="#2d5a3d"
          strokeWidth="1.1"
          opacity="0.24"
          fill="none"
        />
      </g>
      <g transform="translate(132,678) rotate(49)">
        <path
          d="M 0,25 C -15,17 -17,0 0,-25 C 17,0 15,17 0,25 Z"
          fill="#1c3e2c"
          opacity="0.59"
        />
      </g>
    </g>

    {/* CLUSTER 8 – left */}
    <g>
      <g transform="translate(105,796) rotate(-59)">
        <path
          d="M 0,33 C -20,23 -22,0 0,-33 C 22,0 20,23 0,33 Z"
          fill="#1a3a2a"
          opacity="0.71"
        />
        <path
          d="M 0,33 L 0,-33"
          stroke="#2d5a3d"
          strokeWidth="1"
          opacity="0.22"
          fill="none"
        />
      </g>
      <g transform="translate(82,816) rotate(-73)">
        <path
          d="M 0,21 C -12,14 -14,0 0,-21 C 14,0 12,14 0,21 Z"
          fill="#1c3e2c"
          opacity="0.52"
        />
      </g>
    </g>

    {/* Gold line-art scattered accent leaves */}
    <g
      transform="translate(170,134) rotate(26)"
      fill="none"
      stroke="#c9a84c"
      strokeWidth="1.3"
      opacity="0.55"
    >
      <path d="M 0,27 C -16,18 -18,0 0,-27 C 18,0 16,18 0,27 Z" />
      <path d="M 0,27 L 0,-27" />
    </g>
    <g
      transform="translate(47,335) rotate(-36)"
      fill="none"
      stroke="#c9a84c"
      strokeWidth="1.2"
      opacity="0.43"
    >
      <path d="M 0,23 C -14,16 -15,0 0,-23 C 15,0 14,16 0,23 Z" />
      <path d="M 0,23 L 0,-23" />
    </g>
    <g
      transform="translate(180,440) rotate(19)"
      fill="none"
      stroke="#c9a84c"
      strokeWidth="1.1"
      opacity="0.46"
    >
      <path d="M 0,19 C -11,13 -12,0 0,-19 C 12,0 11,13 0,19 Z" />
    </g>
    <g
      transform="translate(44,538) rotate(-29)"
      fill="none"
      stroke="#c9a84c"
      strokeWidth="1"
      opacity="0.40"
    >
      <path d="M 0,16 C -10,11 -11,0 0,-16 C 11,0 10,11 0,16 Z" />
    </g>
    <g
      transform="translate(164,645) rotate(23)"
      fill="none"
      stroke="#c9a84c"
      strokeWidth="1"
      opacity="0.36"
    >
      <path d="M 0,18 C -11,13 -12,0 0,-18 C 12,0 11,13 0,18 Z" />
    </g>
    <path
      d="M 194 554 C 199 584 189 614 194 644"
      stroke="#c9a84c"
      strokeWidth="1.1"
      fill="none"
      opacity="0.36"
    />
    <path
      d="M 187 344 C 197 369 190 394 195 419"
      stroke="#c9a84c"
      strokeWidth="1.1"
      fill="none"
      opacity="0.31"
    />
  </svg>
);

/* ── CodePen-style spiral-bloom CSS rose ─────────────────────────────────── */
const CSSRoseBloom = ({
  delay,
  size = 50,
  c1,
  c2,
  c3,
  swayDelay,
}: {
  delay: number;
  size?: number;
  c1: string;
  c2: string;
  c3: string;
  swayDelay: number;
}) => {
  const [bloomed, setBloomed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setBloomed(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  const N = 30;
  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        marginLeft: -(size / 2),
        marginTop: -(size / 2),
        animation: bloomed
          ? `roseSway 4.5s ease-in-out ${swayDelay}ms infinite`
          : "none",
        transformOrigin: "50% 100%",
      }}
    >
      {Array.from({ length: N }, (_, i) => {
        const n = i + 1;
        const sv = bloomed ? n * 0.06 : n * 0.02;
        const rv = bloomed ? n * 83 : n * 80;
        return (
          <div
            key={n}
            style={{
              position: "absolute",
              left: "50%",
              marginLeft: "-50%",
              marginTop: "-50%",
              transformOrigin: "bottom center",
              height: "100%",
              width: "100%",
              zIndex: N - n,
              transition: `transform 1.1s cubic-bezier(0.22, 0, 0.36, 1) ${((n - 1) * 0.018).toFixed(3)}s`,
              transform: `scale(${sv.toFixed(3)},${sv.toFixed(3)}) rotate(${rv}deg)`,
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundImage: `radial-gradient(ellipse at bottom left, ${c1} 0%, ${c2} 70%, ${c3} 95%)`,
                borderTopLeftRadius: "50% 35%",
                borderBottomRightRadius: "35% 50%",
                borderTopRightRadius: "45%",
                borderBottomLeftRadius: "10%",
                transform: "rotate(-45deg)",
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

/* ── Roses overlay – rendered at full opacity over the botanical ──────────── */
const RosesOverlay = () => (
  <Box
    sx={{
      position: "relative",
      width: "100%",
      height: "100%",
      pointerEvents: "none",
    }}
  >
    {/* Rose – left side mid */}
    <Box sx={{ position: "absolute", left: "28%", top: "27%" }}>
      <CSSRoseBloom
        delay={2800}
        size={30}
        c1="#982838"
        c2="#bf4555"
        c3="#ecaab0"
        swayDelay={4000}
      />
    </Box>
  </Box>
);

/* ── Right-side gold line-art accent ─────────────────────────────────────── */
const GoldRight = () => (
  <svg
    viewBox="0 0 120 500"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%" }}
    fill="none"
  >
    <path
      d="M 60 10 C 58 62 64 114 60 166 C 56 218 62 270 58 322 C 54 374 60 426 56 470"
      stroke="#c9a84c"
      strokeWidth="1.3"
      opacity="0.52"
      strokeLinecap="round"
    />
    <g
      transform="translate(60,68) rotate(52)"
      fill="none"
      stroke="#c9a84c"
      strokeWidth="1.3"
      opacity="0.56"
    >
      <path d="M 0,26 C -15,18 -17,0 0,-26 C 17,0 15,18 0,26 Z" />
      <path d="M0,26 L0,-26" />
    </g>
    <g
      transform="translate(59,152) rotate(-44)"
      fill="none"
      stroke="#c9a84c"
      strokeWidth="1.2"
      opacity="0.47"
    >
      <path d="M 0,22 C -13,15 -14,0 0,-22 C 14,0 13,15 0,22 Z" />
      <path d="M0,22 L0,-22" />
    </g>
    <g
      transform="translate(60,238) rotate(57)"
      fill="none"
      stroke="#c9a84c"
      strokeWidth="1.1"
      opacity="0.50"
    >
      <path d="M 0,20 C -12,14 -13,0 0,-20 C 13,0 12,14 0,20 Z" />
    </g>
    <g
      transform="translate(58,328) rotate(-40)"
      fill="none"
      stroke="#c9a84c"
      strokeWidth="1"
      opacity="0.43"
    >
      <path d="M 0,17 C -10,12 -11,0 0,-17 C 11,0 10,12 0,17 Z" />
    </g>
    <g
      transform="translate(59,418) rotate(46)"
      fill="none"
      stroke="#c9a84c"
      strokeWidth="0.9"
      opacity="0.36"
    >
      <path d="M 0,14 C -8,10 -9,0 0,-14 C 9,0 8,10 0,14 Z" />
    </g>
  </svg>
);

/* ── Animated rose ornament – blooms petal by petal on load ────────────── */
const AnimatedRose = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 44 44"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      overflow: "visible",
      display: "inline-block",
      verticalAlign: "middle",
    }}
  >
    {/* Outer petals (5) — bloom first */}
    <g className="rose-outer">
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse
          key={a}
          cx="22"
          cy="9"
          rx="5"
          ry="9"
          fill="#e9dbb0"
          stroke="#c9a84c"
          strokeWidth="0.5"
          strokeOpacity="0.4"
          transform={`rotate(${a}, 22, 22)`}
        />
      ))}
    </g>
    {/* Middle petals (5, offset 36°) — bloom second */}
    <g className="rose-mid">
      {[36, 108, 180, 252, 324].map((a) => (
        <ellipse
          key={a}
          cx="22"
          cy="12"
          rx="4"
          ry="7"
          fill="#d9b870"
          stroke="#c9a84c"
          strokeWidth="0.4"
          strokeOpacity="0.3"
          transform={`rotate(${a}, 22, 22)`}
        />
      ))}
    </g>
    {/* Inner petals (5) — bloom third */}
    <g className="rose-inner">
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse
          key={a}
          cx="22"
          cy="16"
          rx="3"
          ry="5"
          fill="#c9a84c"
          transform={`rotate(${a}, 22, 22)`}
        />
      ))}
    </g>
    {/* Center stamen */}
    <circle className="rose-center" cx="22" cy="22" r="3.5" fill="#a07830" />
  </svg>
);

export default function Invitation() {
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const confirmedCount = getAttendees().reduce(
    (sum, a) => sum + 1 + (a.companions ?? 0),
    0,
  );

  const [cardScale, setCardScale] = useState(1);
  useEffect(() => {
    const DESIGN_W = 468;
    const update = () =>
      setCardScale(Math.min(1, window.innerWidth / DESIGN_W));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <>
      <Box
        sx={{
          bgcolor: "#f8f3ec",
          minHeight: "100dvh",
          backgroundImage:
            "linear-gradient(135deg,rgba(26,58,42,0.022) 25%,transparent 25%)," +
            "linear-gradient(225deg,rgba(26,58,42,0.022) 25%,transparent 25%)," +
            "linear-gradient(315deg,rgba(26,58,42,0.022) 25%,transparent 25%)," +
            "linear-gradient(45deg, rgba(26,58,42,0.022) 25%,transparent 25%)",
          backgroundSize: "5px 5px",
          pt: 0,
          pb: 0,
          position: "relative",
        }}
      >
        {/* Invitation card – full width on mobile, capped on desktop */}
        <Box
          sx={{
            position: "relative",
            width: 468,
            maxWidth: "100%",
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 8px 48px rgba(26,58,42,0.08)",
            zoom: cardScale,
          }}
        >
          {/* Left botanical — decorative watermark, does NOT push content */}
          <Box
            sx={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "42%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 0,
              minHeight: 750,
              opacity: 0.38,
            }}
          >
            <BotanicalLeft />
          </Box>

          {/* Roses overlay – same position as botanical but full opacity, zIndex 1 */}
          <Box
            sx={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "42%",
              height: "100%",
              pointerEvents: "none",
              minHeight: 750,
              zIndex: 1,
            }}
          >
            <RosesOverlay />
          </Box>

          {/* Right gold accent */}
          <Box
            sx={{
              position: "absolute",
              right: 8,
              top: 40,
              width: 80,
              height: 500,
              pointerEvents: "none",
              zIndex: 0,
              opacity: 0.88,
            }}
          >
            <GoldRight />
          </Box>

          {/* ── Text content — FULL WIDTH, symmetric padding ── */}
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              textAlign: "center",
              pt: 6,
              pb: 4,
              px: 5,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* ─── TOP BLOCK ─── */}
            <Box>
              {/* ── "90" — centered ── */}
              <Typography
                component="span"
                sx={{
                  display: "block",
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  fontSize: "8rem",
                  color: "#c9a84c",
                  lineHeight: 0.88,
                  animation:
                    "numberBloom 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both",
                }}
              >
                90
              </Typography>

              {/* ── "Años" script ── */}
              <Typography
                component="span"
                sx={{
                  display: "block",
                  fontFamily: '"Great Vibes", cursive',
                  fontSize: "3.8rem",
                  color: "#1a3a2a",
                  lineHeight: 1,
                  mt: "-0.2rem",
                  animation: "fadeUp 0.8s ease both",
                  animationDelay: "0.2s",
                }}
              >
                Años
              </Typography>

              {/* ── YEARS LOVED equivalent ── */}
              <Box
                sx={{
                  mt: 1.5,
                  mb: 1.5,
                  animation: "fadeUp 0.8s ease both",
                  animationDelay: "0.35s",
                }}
              >
                <Box
                  sx={{
                    width: 110,
                    height: "1.5px",
                    bgcolor: "#1a3a2a",
                    mx: "auto",
                    mt: "6px",
                  }}
                />
              </Box>

              {/* ── JOIN US ── */}
              <Box
                sx={{
                  mb: 1.5,
                  animation: "fadeUp 0.8s ease both",
                  animationDelay: "0.5s",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    color: "#000000",
                    textTransform: "uppercase",
                    lineHeight: 1.8,
                  }}
                >
                  Ven a celebrar
                  <br />
                  el cumpleaños de nuestra Madre
                </Typography>
              </Box>

              {/* ── Honoree name ── */}
              <Typography
                component="span"
                sx={{
                  display: "block",
                  fontFamily: '"Great Vibes", cursive',
                  fontSize: "4rem",
                  lineHeight: 1.15,
                  mb: 2,
                  color: "#1a3a2a",
                  background:
                    "linear-gradient(90deg,#a07830 0%,#c9a84c 25%,#e8cc7e 50%,#c9a84c 75%,#a07830 100%)",
                  backgroundSize: "200% auto",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "shimmer 4s linear infinite",
                }}
              >
                Leticia de Colindres
              </Typography>

              {/* ── Gold ornament divider ── */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 2,
                  mx: "auto",
                  width: 180,
                  animation: "fadeUp 0.8s ease both",
                  animationDelay: "0.65s",
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    height: "1px",
                    bgcolor: "#c9a84c",
                    opacity: 0.75,
                  }}
                />
                <AnimatedRose />
                <Box
                  sx={{
                    flex: 1,
                    height: "1px",
                    bgcolor: "#c9a84c",
                    opacity: 0.75,
                  }}
                />
              </Box>
            </Box>
            {/* ─── BOTTOM BLOCK ─── */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
                pt: 1,
              }}
            >
              {/* ── Date & program ── */}
              <Box
                sx={{
                  animation: "fadeUp 0.8s ease both",
                  animationDelay: "0.8s",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontWeight: 600,
                    fontSize: "1.2rem",
                    letterSpacing: "0.2em",
                    color: "#1a3a2a",
                    textTransform: "uppercase",
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                >
                  Sábado, 18 Abril 2026
                </Typography>

                {/* Event blocks wrapper — left-aligned, max-width centered */}
                <Box
                  sx={{
                    maxWidth: 340,
                    mx: "auto",
                    textAlign: "left",
                  }}
                >
                  {/* Event 1 – Misa */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1.5,
                      mb: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.5rem",
                        lineHeight: 1,
                        mt: "3px",
                        minWidth: 28,
                      }}
                    >
                      ⛪
                    </Typography>
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: '"Cormorant Garamond", serif',
                          fontWeight: 600,
                          fontSize: "1.1rem",
                          letterSpacing: "0.13em",
                          color: "#1a3a2a",
                          textTransform: "uppercase",
                        }}
                      >
                        11:00 AM — Misa
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: '"Cormorant Garamond", serif',
                          fontSize: "1rem",
                          letterSpacing: "0.08em",
                          color: "#4a6a56",
                          textTransform: "uppercase",
                          lineHeight: 2,
                        }}
                      >
                        Capilla San Judas Tadeo
                        <br />
                        Basílica de Suyapa
                      </Typography>
                    </Box>
                  </Box>

                  {/* Connecting line */}
                  <Box sx={{ pl: "40px", mb: 1.8 }}>
                    <Box
                      sx={{
                        width: "1px",
                        height: 20,
                        bgcolor: "#c9a84c",
                        opacity: 0.6,
                      }}
                    />
                  </Box>

                  {/* Event 2 – Almuerzo */}
                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.7rem",
                        lineHeight: 1,
                        mt: "3px",
                        minWidth: 28,
                      }}
                    >
                      🥂
                    </Typography>
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: '"Cormorant Garamond", serif',
                          fontWeight: 600,
                          fontSize: "1.1rem",
                          letterSpacing: "0.13em",
                          color: "#1a3a2a",
                          textTransform: "uppercase",
                        }}
                      >
                        1:00 PM — Club BCIE
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: '"Cormorant Garamond", serif',
                          fontSize: "1rem",
                          letterSpacing: "0.08em",
                          color: "#4a6a56",
                          textTransform: "uppercase",
                          lineHeight: 2,
                        }}
                      >
                        Salón Principal
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* ── RSVP button ── */}
              <Button
                variant="outlined"
                onClick={() => setRsvpOpen(true)}
                fullWidth
                sx={{
                  borderColor: "#1a3a2a",
                  color: "#1a3a2a",
                  borderWidth: "1.5px",
                  borderRadius: 0,
                  py: 1.6,
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: "1.05rem",
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  transition: "all 0.3s ease",
                  maxWidth: 340,
                  mx: "auto",
                  animation: "fadeUp 0.8s ease both",
                  animationDelay: "0.95s",
                  "&:hover": {
                    background: "#1a3a2a",
                    color: "#f8f3ec",
                    borderColor: "#1a3a2a",
                  },
                  "&:active": {
                    background: "#0f2418",
                    transform: "scale(0.98)",
                  },
                }}
              >
                Confirmar Asistencia
              </Button>

              {/* deadline + counter column */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 0.8,
                  mt: 1.5,
                  animation: "fadeUp 0.8s ease both",
                  animationDelay: "1.1s",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: "0.97rem",
                    color: "#3d6050",
                    letterSpacing: "0.06em",
                  }}
                >
                  Confirmar antes del 11 de Abril
                </Typography>

                {confirmedCount > 0 && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                    <Box
                      component="span"
                      sx={{
                        color: "#c9a84c",
                        fontSize: "1.1rem",
                        lineHeight: 1,
                      }}
                    >
                      ♥
                    </Box>
                    <Typography
                      component="span"
                      sx={{
                        fontFamily: '"Cormorant Garamond", serif',
                        fontSize: "1.08rem",
                        color: "#c9a84c",
                        letterSpacing: "0.05em",
                        fontStyle: "italic",
                      }}
                    >
                      {confirmedCount}{" "}
                      {confirmedCount === 1
                        ? "persona confirmada"
                        : "personas confirmadas"}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>

          {/* ── Photo – top-right corner, responsive ── */}
          <Box
            sx={{
              display: "block",
              position: "absolute",
              left: "60%",
              top: "44px",
              zIndex: 0,
              opacity: 1,
              animation: "swingIn 1.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both",
            }}
          >
            <Box
              component="img"
              src="/img/leticia_img.png"
              alt="Leticia"
              sx={{
                width: 130,
                height: 215,
                objectFit: "contain",
                objectPosition: "top center",
                display: "block",
                transform: "rotate(4deg)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 55%, transparent 100%)",
                maskImage:
                  "linear-gradient(to bottom, black 55%, transparent 100%)",
              }}
            />
          </Box>
        </Box>
      </Box>

      <RSVPForm open={rsvpOpen} onClose={() => setRsvpOpen(false)} />
    </>
  );
}
