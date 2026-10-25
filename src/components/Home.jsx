import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { assets } from "../assets/assets";
import { Link } from "react-scroll";
import { ArrowUpRight } from "lucide-react";

/* Palette */
const PINK = "#FF4FA3";
const BLACK = "#111111";
const WHITE = "#FFFFFF";

/* Images */
const HERO_IMAGES = [
  { src: assets.c1, w: 420, h: 560, label: "Look 01" },
  { src: assets.c2, w: 360, h: 500, label: "Look 02" },
  { src: assets.c5, w: 440, h: 580, label: "Look 05" },
  { src: assets.c6, w: 380, h: 520, label: "Look 06" },
  { src: assets.c3, w: 460, h: 600, label: "Look 03" },
  { src: assets.c4, w: 400, h: 540, label: "Look 04" },
];

/*
 * Arc config per breakpoint.
 * - count: how many unique images appear in the loop
 * - scale: multiplier applied to each card's rendered width/height
 */
const ARC = {
  desktop: {
    radiusX: 640,
    radiusY: 480,
    rotation: -14,
    duration: 38,
    count: 6,
    scale: 1,
  },
  mobile: {
    radiusX: 220,
    radiusY: 340,
    rotation: -10,
    duration: 32,
    count: 4,
    scale: 0.62,
  },
};

function arcPoint(phase, radiusX, radiusY) {
  const angle = phase * Math.PI * 2;
  const x = Math.cos(angle) * radiusX;
  const y = Math.sin(angle) * radiusY;
  const depth = (Math.sin(angle) + 1) / 2;
  const scale = 0.86 + depth * 0.22;
  const opacity = 0.92 + depth * 0.08;
  const z = Math.round(depth * 100);
  return { x, y, scale, opacity, z };
}

function ArcImage({ item, phase, radiusX, radiusY, sizeScale }) {
  const { x, y, scale, opacity, z } = arcPoint(phase, radiusX, radiusY);
  const w = Math.round(item.w * sizeScale);
  const h = Math.round(item.h * sizeScale);

  return (
    <div
      className="absolute top-1/2 left-1/2 will-change-transform"
      style={{
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`,
        opacity,
        zIndex: z,
        transition: "none",
      }}
    >
      <div
        className="overflow-hidden rounded-md bg-neutral-100"
        style={{
          width: w,
          height: h,
          boxShadow: "0 24px 48px -24px rgba(17,17,17,0.35)",
          outline: "1px solid rgba(17,17,17,0.06)",
        }}
      >
        <img
          src={item.src}
          alt={item.label}
          loading="eager"
          decoding="async"
          width={w}
          height={h}
          className="h-full w-full object-cover"
          style={{ filter: "saturate(1.02) contrast(1.02)" }}
          onError={(e) => {
            e.currentTarget.style.visibility = "hidden";
          }}
        />
      </div>
    </div>
  );
}

export default function Home() {
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const path = isMobile ? ARC.mobile : ARC.desktop;
  const duration = reduceMotion ? 0 : path.duration * 1000;

  const baseItems = useMemo(
    () => HERO_IMAGES.slice(0, path.count),
    [path.count],
  );
  const loopItems = useMemo(() => [...baseItems, ...baseItems], [baseItems]);

  const pathRef = React.useRef(null);

  React.useEffect(() => {
    if (reduceMotion) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = ((now - start) / duration) % 1;
      const root = pathRef.current;
      if (root) {
        const children = root.children;
        const N = children.length / 2;
        for (let i = 0; i < children.length; i++) {
          const phase = (t + (i % N) / N) % 1;
          const { x, y, scale, opacity, z } = arcPoint(
            phase,
            path.radiusX,
            path.radiusY,
          );
          children[i].style.transform =
            `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
          children[i].style.opacity = opacity;
          children[i].style.zIndex = z;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, path, reduceMotion, baseItems]);

  return (
    <section
      id="home"
      className="relative w-full overflow-x-clip"
      style={{
        backgroundColor: "#FFF0F7",
        color: BLACK,
        height: "100svh",
        minHeight: "100svh",
      }}
    >
      {/* Curved image composition — full-screen arc */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10">
        <div
          ref={pathRef}
          className="absolute"
          style={{
            left: "50%",
            top: "50%",
            width: 0,
            height: 0,
            transform: `rotate(${path.rotation}deg)`,
          }}
        >
          {loopItems.map((item, i) => (
            <ArcImage
              key={`${item.label}-${i}`}
              item={item}
              phase={(i % baseItems.length) / baseItems.length}
              radiusX={path.radiusX}
              radiusY={path.radiusY}
              sizeScale={path.scale}
            />
          ))}
        </div>
      </div>

      {/* Centered text block */}
      <div className="relative z-20 flex h-[100svh] w-full items-center justify-center px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center"
        >
          {/* Brand name — label-sized so the headline stays dominant */}
          <p
            className="mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.32em] sm:text-xs sm:tracking-[0.42em]"
            style={{ color: BLACK }}
          >
            <span
              aria-hidden
              className="inline-block h-px w-5 sm:w-7"
              style={{ backgroundColor: PINK }}
            />
            Binisha Miscellany
            <span
              aria-hidden
              className="inline-block h-px w-5 sm:w-7"
              style={{ backgroundColor: PINK }}
            />
          </p>

          <h1
            className="text-center font-extrabold uppercase"
            style={{
              color: BLACK,
              fontFamily:
                '"Helvetica Neue", "Arial Black", system-ui, sans-serif',
              fontSize: "clamp(3.25rem, 11vw, 9rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
              margin: 0,
              textShadow: "0 0 28px rgba(255,255,255,0.6)",
            }}
          >
            Wear It
            <br />
            <span style={{ color: PINK }}>Your Way.</span>
          </h1>

          <Link
            to="collection"
            smooth
            duration={700}
            offset={-24}
            className="group mt-9 inline-flex items-center gap-2 whitespace-nowrap rounded-full px-7 py-4 text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] sm:px-8 sm:text-xs sm:tracking-[0.22em]"
            style={{
              backgroundColor: PINK,
              color: WHITE,
              boxShadow: "0 14px 30px -12px rgba(255,79,163,0.55)",
            }}
          >
            Explore the Collection
            <ArrowUpRight
              size={16}
              strokeWidth={2.5}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
