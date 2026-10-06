// Procedural sky-with-clouds hero background generator.
// Usage: node scripts/generate-sky.mjs   (from the project root)
// Writes public/images/sky-hero.jpg (2400x1600) and public/images/sky-hero-mobile.jpg (1000x2200).
// Only depends on `sharp` + Node built-ins. Fully deterministic (seeded).

import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, 'public', 'images');

const RENDER_SCALE = 0.6; // render below final res, upscale + blur afterwards (soft clouds, fast)

// ---------- small math helpers ----------
const clamp = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
const lerp = (a, b, t) => a + (b - a) * t;
const smoothstep = (e0, e1, x) => {
  const t = clamp((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
};
const hex = (h) => [(h >> 16) & 255, (h >> 8) & 255, h & 255].map((v) => v / 255);
const mix3 = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];

// ---------- seeded value noise + fBm (rotated octaves to hide the grid) ----------
function makeNoise(seed) {
  const hash = (ix, iy) => {
    let h = (Math.imul(ix, 374761393) + Math.imul(iy, 668265263) + Math.imul(seed, 1442695041)) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
  return (x, y) => {
    const ix = Math.floor(x);
    const iy = Math.floor(y);
    const fx = x - ix;
    const fy = y - iy;
    const ux = fx * fx * fx * (fx * (fx * 6 - 15) + 10);
    const uy = fy * fy * fy * (fy * (fy * 6 - 15) + 10);
    const a = hash(ix, iy);
    const b = hash(ix + 1, iy);
    const c = hash(ix, iy + 1);
    const d = hash(ix + 1, iy + 1);
    return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
  };
}

function makeFbm(seed) {
  const noise = makeNoise(seed);
  const MAXO = 8;
  const rot = [];
  for (let i = 0; i < MAXO; i++) {
    const ang = 0.55 + i * 0.83;
    rot.push({ c: Math.cos(ang), s: Math.sin(ang), ox: i * 17.3 + 3.1, oy: i * 9.7 + 5.9 });
  }
  return (x, y, octaves = 6, gain = 0.5, billow = 0) => {
    let sum = 0;
    let amp = 1;
    let norm = 0;
    let f = 1;
    for (let o = 0; o < octaves; o++) {
      const r = rot[o];
      const rx = (x * r.c - y * r.s) * f + r.ox;
      const ry = (x * r.s + y * r.c) * f + r.oy;
      let nv = noise(rx, ry);
      if (billow > 0) nv = lerp(nv, 1 - Math.abs(2 * nv - 1), billow); // rounded mounds, creased valleys
      sum += amp * nv;
      norm += amp;
      amp *= gain;
      f *= 2.02;
    }
    return sum / norm; // ~[0.15 .. 0.85], mean 0.5
  };
}

// ---------- palette ----------
const SKY_TOP = hex(0xa9c8e8);
const SKY_MID = hex(0xcfe6f7);
const SKY_LOW = hex(0xe3f1fb);
const WHITE = [1, 1, 1];
const CLOUD_LIT = [1.0, 1.0, 0.998];
const CLOUD_SHADE = hex(0xdbe6f2);
const CLOUD_DEEP = hex(0xc4d4e7);
const HAZE = hex(0xf1f8fd);

function skyGradient(ny) {
  // 0 -> #a9c8e8, 0.55 -> #cfe6f7, 0.88 -> #e3f1fb, 1.0 -> #ffffff (eased)
  let c;
  if (ny < 0.55) c = mix3(SKY_TOP, SKY_MID, smoothstep(0, 0.55, ny) * 0.6 + (ny / 0.55) * 0.4);
  else c = mix3(SKY_MID, SKY_LOW, smoothstep(0.55, 0.9, ny));
  return mix3(c, WHITE, smoothstep(0.86, 1.0, ny));
}

// ---------- scene builder ----------
function buildScene(cfg) {
  const { W, H, unit, seed, maskX, maskY, threshold, soft, K = 1.1, MID = 0.55, TH = 1.0, WARP = 0.35, FREQ = 2.6, BILLOW = 0.55, FIELD_STD = 0.2 } = cfg;
  const sat = (x) => 1 - Math.exp(-Math.max(0, x) * 1.5); // soft saturation: no flat, hard-edged shadow patches
  const finish = (c, ny) => mix3(c, WHITE, smoothstep(0.87, 1.0, ny));
  const warpFbm = makeFbm(seed + 101);
  const warpFbm2 = makeFbm(seed + 202);
  const bodyFbm = makeFbm(seed + 303);
  const wispFbm = makeFbm(seed + 404);
  const hazeFbm = makeFbm(seed + 505);

  // cloud height field: warped fBm with a billow component (rounded cauliflower lobes),
  // standardised to mean 0.5 / std FIELD_STD so thresholds behave the same for every seed.
  const rawField = (px, py, oct = 6) => {
    const wx = warpFbm(px * 1.3 + 11.3, py * 1.3 + 4.1, 3) - 0.5;
    const wy = warpFbm2(px * 1.3 - 7.7, py * 1.3 + 19.2, 3) - 0.5;
    const qx = px + wx * WARP;
    const qy = py + wy * WARP;
    return bodyFbm(qx * FREQ, qy * FREQ * 1.1, oct, 0.5, BILLOW);
  };
  let mean = 0;
  let sd = 1;
  {
    let s1 = 0;
    let s2 = 0;
    let cnt = 0;
    for (let j = 0; j < 80; j++) {
      for (let i = 0; i < 120; i++) {
        const v = rawField((i / 120) * (W / unit), (j / 80) * (H / unit));
        s1 += v;
        s2 += v * v;
        cnt++;
      }
    }
    mean = s1 / cnt;
    sd = Math.sqrt(Math.max(1e-6, s2 / cnt - mean * mean));
  }
  const field = (px, py) => 0.5 + ((rawField(px, py) - mean) / sd) * FIELD_STD;
  const lowField = (px, py) => ((rawField(px, py, 3)) / sd) * FIELD_STD; // coarse relief for big soft shadows

  const LX = -0.56; // light direction (up-left), y-down coordinates
  const LY = -0.83;

  return function shadePixel(nx, ny) {
    const px = (nx * W) / unit;
    const py = (ny * H) / unit;

    // --- sky base ---
    let col = skyGradient(ny);

    // gentle low-frequency haze variation + centre glow (behind text / phone)
    const hz = hazeFbm(px * 0.8, py * 0.8, 3) - 0.5;
    col = mix3(col, HAZE, clamp(0.1 + hz * 0.35, 0, 0.3) * smoothstep(0.2, 0.7, ny) * (1 - smoothstep(0.86, 1, ny)));
    const cx = (nx - 0.5) / 0.26;
    const glow = Math.exp(-cx * cx) * smoothstep(0.3, 0.75, ny) * 0.28;
    col = mix3(col, HAZE, glow);

    // --- faint wisps higher up, mostly towards the sides ---
    const wispMaskY = smoothstep(0.1, 0.22, ny) * (1 - smoothstep(0.38, 0.5, ny));
    const wispMaskX = 0.15 + 0.85 * clamp(maskX(nx, 0.6) * 1.4);
    if (wispMaskY * wispMaskX > 0.01) {
      const w = wispFbm(px * 1.9 + py * 0.25, py * 9.0, 5, 0.5);
      const wa = smoothstep(0.56, 0.78, w * (0.6 + 0.8 * wispMaskX)) * wispMaskY * wispMaskX * 0.32;
      col = mix3(col, [1, 1, 1], wa);
    }

    // --- main cumulus ---
    // height field h = noise + additive side/vertical mask shift. The noise carves the silhouette,
    // the mask only decides how far clouds reach inwards (so edges stay irregular, not mask-shaped).
    const m = maskX(nx, ny) * maskY(ny);
    if (m < 0.015) return finish(col, ny);
    const shift = K * (m - MID);
    const h0 = field(px, py) + shift;
    const dens = smoothstep(threshold, threshold + soft, h0);
    if (dens <= 0.001) return finish(col, ny);

    const T = (h) => clamp((h - threshold) / TH);
    const T0 = T(h0);

    // light-offset shading: surface height toward the light (up-left) vs here
    const o1 = 0.012;
    const o2 = 0.032;
    const Tl1 = T(field(px + LX * o1, py + LY * o1) + shift);
    const Tl2 = T(field(px + LX * o2, py + LY * o2) + shift);
    const lowDelta = lowField(px + LX * 0.07, py + LY * 0.07) - lowField(px, py);
    const self = sat(((Tl1 + Tl2) * 0.5 - T0) * 3 + (Tl2 - T0) * 1.1 + lowDelta * 3.2 * clamp(T0 * 3));

    // underside: more cloud above than below -> grey-blue bases
    const uo = 0.04;
    const under = sat((T(field(px, py - uo) + shift) - T(field(px, py + uo) + shift)) * 2.4);

    let shade = sat(self * 0.9 + under * 0.85);
    let cloud = mix3(CLOUD_LIT, CLOUD_SHADE, clamp(shade * 1.15));
    cloud = mix3(cloud, CLOUD_DEEP, clamp(T0 * under * 0.55 + self * T0 * 0.3));

    // brighter lit tops where the surface faces the light
    const lit = clamp((T0 - (Tl1 + Tl2) * 0.5) * 3) * (1 - shade);
    cloud = mix3(cloud, WHITE, lit * 0.7);

    return finish(mix3(col, cloud, clamp(dens)), ny);
  };
}

async function renderImage({ W, H, file, cfg }) {
  const rw = Math.round(W * RENDER_SCALE);
  const rh = Math.round(H * RENDER_SCALE);
  const shadePixel = buildScene({ W, H, ...cfg });
  const px = Buffer.alloc(rw * rh * 3);
  for (let y = 0; y < rh; y++) {
    const ny = (y + 0.5) / rh;
    for (let x = 0; x < rw; x++) {
      const nx = (x + 0.5) / rw;
      const c = shadePixel(nx, ny);
      const i = (y * rw + x) * 3;
      px[i] = clamp(Math.round(c[0] * 255), 0, 255);
      px[i + 1] = clamp(Math.round(c[1] * 255), 0, 255);
      px[i + 2] = clamp(Math.round(c[2] * 255), 0, 255);
    }
  }

  // upscale + soften
  const up = await sharp(px, { raw: { width: rw, height: rh, channels: 3 } })
    .resize(W, H, { kernel: 'lanczos3' })
    .blur(1.2)
    .raw()
    .toBuffer();

  // triangular dither to avoid gradient banding in the smooth sky
  let s = 0x9e3779b9 | 0;
  const rnd = () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return (s >>> 0) / 4294967296;
  };
  for (let i = 0; i < up.length; i++) {
    const d = (rnd() + rnd() - 1) * 1.1;
    const v = up[i] + d;
    up[i] = v < 0 ? 0 : v > 255 ? 255 : Math.round(v);
  }

  const outPath = path.join(OUT_DIR, file);
  await sharp(up, { raw: { width: W, height: H, channels: 3 } })
    .jpeg({ quality: 85, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(outPath);
  const kb = Math.round(fs.statSync(outPath).size / 1024);
  console.log(`wrote ${path.relative(ROOT, outPath)} (${W}x${H}, ${kb} KB)`);
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const t0 = Date.now();

  // Landscape: clouds hug the left and right edges, centre column clear.
  await renderImage({
    W: 2400,
    H: 1600,
    file: 'sky-hero.jpg',
    cfg: {
      seed: 7,
      unit: 1600,
      threshold: 0.5,
      soft: 0.2,
      maskX: (nx, ny) => {
        const reach = 0.25 + 0.1 * smoothstep(0.45, 0.9, ny); // banks spread wider towards the bottom
        return smoothstep(reach + 0.06, 0.04, nx) + smoothstep(0.94 - reach, 0.96, nx);
      },
      maskY: (ny) => smoothstep(0.28, 0.62, ny) * (1 - smoothstep(0.9, 1.0, ny) * 0.4),
    },
  });

  // Portrait: clouds along both side edges in the lower part.
  await renderImage({
    W: 1000,
    H: 2200,
    file: 'sky-hero-mobile.jpg',
    cfg: {
      seed: 23,
      unit: 1300,
      threshold: 0.5,
      soft: 0.2,
      maskX: (nx, ny) => {
        const reach = 0.25 + 0.1 * smoothstep(0.45, 0.9, ny);
        return smoothstep(reach + 0.08, 0.02, nx) + smoothstep(0.92 - reach, 0.98, nx);
      },
      maskY: (ny) => smoothstep(0.3, 0.64, ny) * (1 - smoothstep(0.9, 1.0, ny) * 0.4),
    },
  });

  console.log(`done in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
