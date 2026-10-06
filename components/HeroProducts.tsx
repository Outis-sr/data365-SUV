"use client";

import { motion, type MotionValue } from "framer-motion";
import type { HeroLayers } from "./heroTimeline";

/** One cloud bank: phone and desktop images share a layer (art-directed, see generate-clouds). */
function CloudBank({ name, y, body }: { name: "back" | "mid" | "front"; y: MotionValue<number>; body?: boolean }) {
  return (
    <motion.div className={`layer layer--cloud-${name}`} style={{ y }}>
      <div className="cloud">
        <picture>
          <source media="(max-width: 809px)" srcSet={`/images/cloud-${name}-m.webp`} width={1560} height={1200} />
          <img src={`/images/cloud-${name}.webp`} alt="" width={2080} height={780} decoding="async" />
        </picture>
        {body && <div className="cloud__body" />}
      </div>
    </motion.div>
  );
}

/**
 * Hero product scene. Stack (back → front): back cloud, small bottle, monitor, middle cloud,
 * large bottle, FRONT cloud. Every layer is its own motion wrapper driven by scrollY
 * (see heroTimeline); the inner elements keep their load-in / hover animations.
 */
export function HeroProducts({ layers }: { layers: HeroLayers }) {
  return (
    <div className="products" aria-hidden="true">
      <CloudBank name="back" y={layers.cloudBack} />

      <motion.div
        className="layer layer--bottle-l"
        style={{ y: layers.leftBottle }}
      >
        <div className="prod prod--bottle-l">
          <img className="prod__img" src="/images/hero-bottle.webp" alt="" width={1024} height={1536} decoding="async" />
        </div>
      </motion.div>

      <motion.div
        className="layer layer--monitor"
        style={{ y: layers.monitor }}
      >
        <div className="prod prod--monitor">
          <img className="prod__img" src="/images/hero-monitor.webp" alt="" width={1448} height={1086} decoding="async" fetchPriority="high" />
        </div>
      </motion.div>

      <CloudBank name="mid" y={layers.cloudMid} />

      <motion.div
        className="layer layer--bottle-r"
        style={{ y: layers.rightBottle }}
      >
        <div className="prod prod--bottle-r">
          <img className="prod__img" src="/images/hero-bottle.webp" alt="" width={1024} height={1536} decoding="async" />
        </div>
      </motion.div>

      <CloudBank name="front" y={layers.cloudFront} body />
    </div>
  );
}
