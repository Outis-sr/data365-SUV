"use client";

import { useScroll, useTransform, type MotionValue } from "framer-motion";

/**
 * Hero scroll behaviour, measured on the reference (lunera.framer.ai, 1440×900):
 * - the hero is NOT pinned; it scrolls with the page (headline, cards, sky and clouds included);
 * - only the central product drifts up an extra 0.2 px per px scrolled (translateY = -0.2·scrollY),
 *   rising out of the faded bottom edge of the hero container;
 * - no fades, no scale. The next section simply follows in normal flow.
 * Our product group (monitor + two bottles) takes the phone's role; the bottles get a hair of
 * depth parallax (rear slower, front faster) but stay in sync with the monitor.
 * Clouds do the hand-off to the white section: each bank rises at its own rate (back slower than
 * the product, mid and front faster), so the front bank climbs over the product and its solid white
 * body fills the stage. Linear in scrollY, so it is fully reversible and stops when scrolling stops.
 */
const RANGE = [0, 2000];

export type HeroLayers = {
  monitor: MotionValue<number>;
  leftBottle: MotionValue<number>;
  rightBottle: MotionValue<number>;
  cloudBack: MotionValue<number>;
  cloudMid: MotionValue<number>;
  cloudFront: MotionValue<number>;
};

export function useHeroLayers(): HeroLayers {
  const { scrollY } = useScroll();
  return {
    monitor: useTransform(scrollY, RANGE, [0, -400]),
    leftBottle: useTransform(scrollY, RANGE, [0, -360]),
    rightBottle: useTransform(scrollY, RANGE, [0, -440]),
    cloudBack: useTransform(scrollY, RANGE, [0, -200]),
    cloudMid: useTransform(scrollY, RANGE, [0, -700]),
    cloudFront: useTransform(scrollY, RANGE, [0, -1200]),
  };
}
