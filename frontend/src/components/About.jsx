import React, { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
} from "framer-motion";
import { assets } from "../assets/assets";

/* ------------------------------------------------------------------ */
/* Tokens                                                              */
/* ------------------------------------------------------------------ */
const PINK = "#FF4FA3";
const BLACK = "#111111";
const WHITE = "#FFFFFF";
const BLUSH = "#FFF0F7";
const EASE = [0.22, 1, 0.36, 1];
const HEAD_FONT = '"Helvetica Neue", "Arial Black", system-ui, sans-serif';

const cardStyle = {
  boxShadow: "0 24px 48px -24px rgba(17,17,17,0.35)",
  outline: "1px solid rgba(17,17,17,0.06)",
};
const photoFilter = { filter: "saturate(1.02) contrast(1.02)" };

const headStyle = (min, vw, max) => ({
  fontFamily: HEAD_FONT,
  fontSize: `clamp(${min}rem, ${vw}vw, ${max}rem)`,
  lineHeight: 0.9,
  letterSpacing: "-0.03em",
  color: BLACK,
  margin: 0,
});

/* ------------------------------------------------------------------ */
/* Story-matched images                                                */
/* Each image is chosen to say what its moment is saying.              */
/* ------------------------------------------------------------------ */
const DUMMY = {
  // A: Early struggles — working alone, planning, and starting with limited resources
  a: assets.j1||"https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=85",

  // D: Home-based business — creating products and managing work from home
  d: assets.j2||"https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1000&q=85",

  // F: Growth — moving toward an established business environment
  f: assets.j3||"https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85",
};

/* ------------------------------------------------------------------ */
/* Variants                                                            */
/* ------------------------------------------------------------------ */
const rise = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay: d },
  }),
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: (d = 0) => ({
    opacity: 1,
    transition: { duration: 0.8, ease: EASE, delay: d },
  }),
};
const lineUp = {
  hidden: { y: "110%" },
  visible: (d = 0) => ({
    y: "0%",
    transition: { duration: 0.9, ease: EASE, delay: d },
  }),
};
const maskIn = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  visible: (d = 0) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.2, ease: EASE, delay: d },
  }),
};
const settle = {
  hidden: { scale: 1.06 },
  visible: (d = 0) => ({
    scale: 1,
    transition: { duration: 1.4, ease: EASE, delay: d },
  }),
};

/* ------------------------------------------------------------------ */
/* Shared pieces                                                       */
/* ------------------------------------------------------------------ */
const Line = ({ d = 0, children }) => (
  <span
    className="block overflow-hidden"
    style={{ paddingBottom: "0.1em", marginBottom: "-0.1em" }}
  >
    <motion.span variants={lineUp} custom={d} className="block">
      {children}
    </motion.span>
  </span>
);

const Kicker = ({ d = 0, center = false, children }) => (
  <motion.p
    variants={rise}
    custom={d}
    className={`mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] sm:mb-6 sm:text-xs sm:tracking-[0.42em] ${
      center ? "justify-center" : ""
    }`}
    style={{ color: BLACK }}
  >
    <span
      aria-hidden
      className="inline-block h-px w-4 shrink-0 sm:w-7"
      style={{ backgroundColor: PINK }}
    />
    <span>{children}</span>
  </motion.p>
);

/* ------------------------------------------------------------------ */
/* Premium logo mark — larger, ringed, with soft shadow               */
/* ------------------------------------------------------------------ */
const LogoMark = ({
  size = "h-24 w-24 sm:h-28 sm:w-28",
  img = "h-[58%] w-[58%]",
}) => {
  if (!assets.logo) {
    return (
      <span
        className={`inline-flex ${size} items-center justify-center rounded-full bg-white text-[10px] font-bold uppercase`}
        style={{
          letterSpacing: "0.32em",
          boxShadow:
            "0 24px 44px -22px rgba(255,79,163,0.55), 0 0 0 1px rgba(255,79,163,0.18)",
        }}
      >
        BM
      </span>
    );
  }
  return (
    <span
      className={`relative inline-flex ${size} items-center justify-center rounded-full bg-white`}
      style={{
        boxShadow:
          "0 28px 52px -24px rgba(255,79,163,0.55), 0 12px 28px -18px rgba(17,17,17,0.25), 0 0 0 1px rgba(255,79,163,0.18)",
      }}
    >
      {/* Inner pink hairline ring */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[6px] rounded-full"
        style={{ border: `1px solid ${PINK}`, opacity: 0.45 }}
      />
      <img
        src={assets.logo}
        alt="Binisha Miscellany logo"
        className={`${img} object-contain`}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    </span>
  );
};

const Photo = ({ src, className = "" }) => (
  <img
    src={src}
    alt=""
    loading="lazy"
    decoding="async"
    className={`h-full w-full object-cover ${className}`}
    style={photoFilter}
    onError={(e) => {
      e.currentTarget.style.visibility = "hidden";
    }}
  />
);

/* ------------------------------------------------------------------ */
/* MOMENT 1 — the woman, clean frame, identity statement               */
/* ------------------------------------------------------------------ */
function MomentOne({ view }) {
  return (
    <motion.div
      {...view}
      className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-20"
    >
      {/* Portrait — clean frame, no orbit cards */}
      <div className="relative mx-auto w-full max-w-[240px] sm:max-w-[280px] md:col-span-5 md:max-w-none">
        {/* Soft blush aura behind — round, no rectangle */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[145%] w-[145%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,79,163,0.16) 0%, rgba(255,79,163,0.04) 45%, rgba(255,79,163,0) 70%)",
          }}
        />

        <motion.div
          variants={maskIn}
          custom={0}
          className="relative z-10 aspect-square w-full overflow-hidden rounded-full bg-neutral-100"
          style={{
            boxShadow:
              "0 30px 60px -25px rgba(17,17,17,0.35), 0 20px 50px -25px rgba(255,79,163,0.35)",
            outline: `3px solid ${WHITE}`,
            outlineOffset: "4px",
          }}
        >
          <motion.img
            variants={settle}
            custom={0}
            src={assets.photo}
            alt="Binisha Adhikari, founder of Binisha Miscellany"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
            style={photoFilter}
            onError={(e) => {
              e.currentTarget.style.visibility = "hidden";
            }}
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/3"
            style={{
              background:
                "linear-gradient(to top, rgba(17,17,17,0.55), rgba(17,17,17,0))",
            }}
          />
          <div className="absolute inset-x-0 bottom-5 text-center">
            <p
              className="text-[11px] font-bold uppercase"
              style={{ letterSpacing: "0.32em", color: WHITE }}
            >
              Binisha Adhikari
            </p>
            <p
              className="mt-1 text-[10px] font-semibold uppercase"
              style={{ letterSpacing: "0.3em", color: PINK }}
            >
              Founder
            </p>
          </div>
        </motion.div>
      </div>

      {/* Words */}
      <div className="relative z-20 md:col-span-7">
        <Kicker d={0.3}>The Woman Behind the Brand</Kicker>

        <h2 className="font-extrabold uppercase" style={headStyle(2, 4.4, 3.9)}>
          <Line d={0.6}>More Than One Role.</Line>
          <Line d={0.75}>
            <span style={{ color: PINK }}>One Dream of Her Own.</span>
          </Line>
        </h2>

        <div className="mt-6 max-w-xl sm:mt-8">
          <p
            className="text-lg font-semibold leading-snug sm:text-xl md:text-2xl"
            style={{ letterSpacing: "-0.01em" }}
          >
            An eye for style. A will of her own.
          </p>
          <motion.p
            variants={rise}
            custom={1.2}
            className="mt-3 text-sm leading-relaxed sm:text-base md:text-lg"
            style={{ opacity: 0.7 }}
          >
            She started with little more than a vision — and built a brand
            around it, one idea at a time.
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* MOMENT 2 — rising: two story images (start → growth) + ascent       */
/* ------------------------------------------------------------------ */
function RisingCard({ p, range, fromX, left, bottom, w, rotate, z, src }) {
  const x = useTransform(p, range, [fromX, "0%"]);
  const y = useTransform(p, range, ["30%", "0%"]);
  const scale = useTransform(p, range, [0.88, 1]);
  const opacity = useTransform(p, [range[0], range[0] + 0.12], [0, 1]);
  return (
    <motion.div
      aria-hidden
      className="absolute aspect-[3/4] overflow-hidden rounded-md bg-neutral-100"
      style={{
        left,
        bottom,
        width: w,
        zIndex: z,
        x,
        y,
        scale,
        opacity,
        rotate,
        ...cardStyle,
      }}
    >
      <Photo src={src} />
    </motion.div>
  );
}

function AscentPath({ p }) {
  const pathLength = useTransform(p, [0.1, 0.95], [0, 1]);
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 100 80"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    >
      <motion.path
        d="M 10 72 Q 34 56 50 46 T 88 16"
        fill="none"
        stroke={PINK}
        strokeWidth="0.6"
        strokeLinecap="round"
        style={{ pathLength, opacity: 0.55 }}
      />
    </motion.svg>
  );
}

function GrowthComposition({ reduceMotion }) {
  const ref = useRef(null);
  const one = useMotionValue(1);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "center 50%"],
  });
  const p = reduceMotion ? one : scrollYProgress;

  const lineScale = useTransform(p, [0.15, 0.9], [0, 1]);
  const logoOpacity = useTransform(p, [0.85, 1], [0, 1]);

  return (
    <div ref={ref} className="relative aspect-[5/4] w-full">
      <AscentPath p={p} />

      <RisingCard
        p={p}
        range={[0, 0.35]}
        fromX="-70%"
        left="2%"
        bottom="3rem"
        w="27%"
        rotate={-5}
        z={2}
        src={DUMMY.a}
      />
      <RisingCard
        p={p}
        range={[0.22, 0.58]}
        fromX="-110%"
        left="30%"
        bottom="calc(3rem + 8%)"
        w="32%"
        rotate={2}
        z={3}
        src={DUMMY.d}
      />
      <RisingCard
        p={p}
        range={[0.45, 0.82]}
        fromX="-150%"
        left="60%"
        bottom="calc(3rem + 16%)"
        w="37%"
        rotate={-3}
        z={4}
        src={DUMMY.f}
      />

      {/* Avatar → ascending line → brand mark */}
      <div className="absolute inset-x-0 bottom-0 flex h-10 items-center gap-3">
        <div
          className="h-10 w-10 shrink-0 overflow-hidden rounded-full"
          style={{ outline: `2px solid ${PINK}`, outlineOffset: 2 }}
        >
          <img
            src={assets.photo}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top"
            style={photoFilter}
            onError={(e) => {
              e.currentTarget.style.visibility = "hidden";
            }}
          />
        </div>
        <motion.span
          aria-hidden
          className="h-px flex-1 origin-left"
          style={{ backgroundColor: PINK, scaleX: lineScale }}
        />
        <motion.div
          style={{ opacity: logoOpacity }}
          className="flex h-10 w-10 shrink-0 items-center overflow-hidden  justify-center rounded-full bg-white"
          title="Binisha Miscellany"
        >
          <img
            src={assets.logo}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top"
            style={photoFilter}
            onError={(e) => {
              e.currentTarget.style.visibility = "hidden";
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
function MomentTwo({ view, reduceMotion }) {
  return (
    <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16">
      <motion.div {...view} className="md:col-span-5">
        <Kicker d={0.1}>Making Room for the Dream</Kicker>
        <h2 className="font-extrabold uppercase" style={headStyle(2, 4.2, 3.6)}>
          <Line d={0.2}>Small Steps.</Line>
          <Line d={0.35}>
            <span style={{ color: PINK }}>A Dream That Keeps Growing.</span>
          </Line>
        </h2>
        <motion.p
          variants={rise}
          custom={0.9}
          className="mt-6 max-w-md text-sm leading-relaxed sm:mt-8 sm:text-base md:text-lg"
          style={{ opacity: 0.7 }}
        >
          Built on a simple belief: every woman deserves comfort, care, and a
          little something made just for her.
        </motion.p>
      </motion.div>

      <div className="md:col-span-7">
        <GrowthComposition reduceMotion={reduceMotion} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MOMENT 3 — summit: one editorial image + big premium logo signature */
/* ------------------------------------------------------------------ */
function MomentThree({ view, reduceMotion }) {
  const ref = useRef(null);
  const one = useMotionValue(1);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "center 60%"],
  });
  const p = reduceMotion ? one : scrollYProgress;
  return (
    <div className="text-center">
      <motion.div {...view} className="mx-auto mb-10 max-w-3xl sm:mb-12">
        <Kicker d={0.1} center>
          A Small Beginning With Room to Grow
        </Kicker>
        <h2
          className="font-extrabold uppercase"
          style={headStyle(2.25, 5.2, 4.5)}
        >
          <Line d={0.2}>Rooted in Home.</Line>
          <Line d={0.35}>
            <span style={{ color: PINK }}>Growing Beyond It.</span>
          </Line>
        </h2>
        <motion.p
          variants={rise}
          custom={0.9}
          className="mx-auto mt-6 max-w-xl text-sm leading-relaxed sm:mt-8 sm:text-base md:text-lg"
          style={{ opacity: 0.7 }}
        >
          Binisha Miscellany is a personal beginning, shaped by care, guided by
          ambition, and growing one step at a time.
        </motion.p>
      </motion.div>

      {/* Signature — bigger, premium logo */}
      <motion.div {...view} className="flex flex-col items-center">
        <motion.div variants={fadeIn} custom={0} className="mb-8 sm:mb-10">
          <LogoMark
            size="h-40 w-40 sm:h-32 sm:w-48 md:h-48 md:w-54"
            img="h-[58%] w-[58%]"
          />
        </motion.div>
        <h3 className="font-extrabold uppercase" style={headStyle(2, 6, 5)}>
          <Line d={0.2}>Her dream.</Line>
          <Line d={0.35}>Her dedication.</Line>
          <Line d={0.5}>
            <span style={{ color: PINK }}>A brand of her own.</span>
          </Line>
        </h3>
        <motion.span
          aria-hidden
          variants={rise}
          custom={1.2}
          className="mt-8 block h-8 w-px origin-top sm:mt-10 sm:h-10"
          style={{ backgroundColor: PINK }}
        />
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */
const About = () => {
  const reduceMotion = useReducedMotion();

  const view = reduceMotion
    ? { initial: false, animate: "visible" }
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-60px" },
      };

  return (
    <section
      id="about"
      className="relative overflow-x-clip"
      style={{ backgroundColor: BLUSH, color: BLACK }}
    >
      {/* Top seam — soft radial bloom, no rectangle */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 sm:h-40 md:h-52"
        style={{
          background:
            "radial-gradient(ellipse 120% 100% at 50% 0%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.5) 35%, rgba(255,255,255,0) 70%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="pt-16 sm:pt-20 md:pt-28">
          <MomentOne view={view} reduceMotion={reduceMotion} />
        </div>
        <div className="mt-16 sm:mt-20 md:mt-32">
          <MomentTwo view={view} reduceMotion={reduceMotion} />
        </div>
        <div className="mt-16 pb-20 sm:mt-20 sm:pb-24 md:mt-32 md:pb-32">
          <MomentThree view={view} reduceMotion={reduceMotion} />
        </div>
      </div>

      {/* Hand-off */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 sm:h-24"
        style={{ background: `linear-gradient(to bottom, ${BLUSH}, ${WHITE})` }}
      />
    </section>
  );
};

export default About;
