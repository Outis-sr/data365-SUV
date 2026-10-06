// Hero cumulus cloud banks (back / mid / front), desktop + phone, RGBA webp in public/images.
// Usage: node scripts/generate-clouds.mjs   (from the project root). Deterministic (seeded). Only needs `sharp`.
//
// Each bank follows a TRACED top contour (the reference silhouette: high left crest that dips into a
// valley toward the centre, a lower start on the mid-right that rises into a tall wall at the right
// edge). The contour is filled with overlapping "billows" (soft spheres, lit from the upper left),
// small bumps on the billow crowns give the cauliflower look, and fractal noise feathers the edges.
// Coordinates are DESIGN px of the hero stage: 1440-wide viewport on desktop, 430-wide on phones.
// The CSS places every image at the same box (BOX below) relative to the hero visual.

import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public', 'images');

const clamp = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (e0, e1, x) => {
  const t = clamp((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
};

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

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
    const ux = fx * fx * (3 - 2 * fx);
    const uy = fy * fy * (3 - 2 * fy);
    const a = hash(ix, iy);
    const b = hash(ix + 1, iy);
    const c = hash(ix, iy + 1);
    const d = hash(ix + 1, iy + 1);
    return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
  };
}

function makeFbm(seed, oct) {
  const n = makeNoise(seed);
  return (x, y) => {
    let sum = 0, amp = 1, norm = 0, f = 1;
    for (let o = 0; o < oct; o++) {
      sum += amp * n(x * f + o * 31.7, y * f + o * 17.1);
      norm += amp;
      amp *= 0.5;
      f *= 2.1;
    }
    return sum / norm;
  };
}

// smooth curve through the traced points (cosine interpolation, flat outside the ends)
function contour(pts) {
  return (x) => {
    if (x <= pts[0][0]) return pts[0][1];
    for (let i = 1; i < pts.length; i++) {
      const [x1, y1] = pts[i];
      if (x <= x1) {
        const [x0, y0] = pts[i - 1];
        const t = (1 - Math.cos(((x - x0) / (x1 - x0)) * Math.PI)) / 2;
        return lerp(y0, y1, t);
      }
    }
    return pts[pts.length - 1][1];
  };
}

// separable box blur (3 passes ≈ gaussian)
function boxBlur(src, W, H, rad) {
  let a = Float32Array.from(src);
  let b = new Float32Array(src.length);
  const pass = (from, to, horiz) => {
    const len = horiz ? W : H;
    const lines = horiz ? H : W;
    const win = rad * 2 + 1;
    for (let l = 0; l < lines; l++) {
      const idx = (k) => (horiz ? l * W + k : k * W + l);
      let acc = 0;
      for (let k = -rad; k <= rad; k++) acc += from[idx(Math.min(len - 1, Math.max(0, k)))];
      for (let k = 0; k < len; k++) {
        to[idx(k)] = acc / win;
        acc += from[idx(Math.min(len - 1, k + rad + 1))] - from[idx(Math.max(0, k - rad))];
      }
    }
  };
  for (let it = 0; it < 3; it++) {
    pass(a, b, true);
    pass(b, a, false);
  }
  return a;
}

// light from the upper left, slightly towards the viewer
const L = (() => {
  const v = [-0.32, -0.8, 0.5];
  const m = Math.hypot(...v);
  return v.map((c) => c / m);
})();

function billows(top, box, rMin, rMax, r) {
  const list = [];
  const x0 = box.x - rMax;
  const x1 = box.x + box.w + rMax;
  // crest row: billow tops trace the contour
  for (let x = x0; x < x1; ) {
    const rad = lerp(rMin, rMax, Math.pow(r(), 0.7));
    const cy = top(x) + rad * (0.9 + r() * 0.2);
    const z = cy + r() * 25;
    list.push({ cx: x, cy, r: rad, z });
    // cauliflower bumps on the upper arc of the billow
    const nb = 2 + Math.floor(r() * 3);
    for (let k = 0; k < nb; k++) {
      const ang = -Math.PI * (0.18 + 0.64 * r());
      const rr = rad * (0.3 + 0.22 * r());
      const d = rad * (0.74 + 0.1 * r());
      list.push({ cx: x + Math.cos(ang) * d, cy: cy + Math.sin(ang) * d, r: rr, z: z + 2 + r() * 4 });
    }
    x += rad * (0.7 + r() * 0.35);
  }
  // body rows: lower billows sit in front, so the interior reads as stacked, softly shaded mounds
  const bottom = box.y + box.h + rMax;
  for (let row = 1; row < 12; row++) {
    let any = false;
    for (let x = x0 + r() * rMax; x < x1; ) {
      const rad = lerp(rMin * 0.9, rMax * 1.05, r());
      const cy = top(x) + rMax * 0.55 + row * rMax * 0.95 + (r() - 0.5) * rMax * 0.4;
      if (cy - rad < bottom) {
        any = true;
        list.push({ cx: x, cy, r: rad, z: cy + r() * 25 });
      }
      x += rad * (0.8 + r() * 0.5);
    }
    if (!any) break;
  }
  return list;
}

async function render(cfg) {
  const { name, seed, pts, box, scale: S, rMin, rMax, shadow, strength, opacity, blur, fadeTop, fadeBottom, solidBottom, edge } = cfg;
  const W = Math.round(box.w * S);
  const H = Math.round(box.h * S);
  const r = rng(seed);
  const top = contour(pts);
  const list = billows(top, box, rMin, rMax, r);

  // bucket billows by column for speed
  const CB = 32;
  const cols = Math.ceil(box.w / CB) + 1;
  const buckets = Array.from({ length: cols }, () => []);
  for (const b of list) {
    const c0 = Math.max(0, Math.floor((b.cx - b.r - edge * 3 - rMax * 0.3 - box.x) / CB));
    const c1 = Math.min(cols - 1, Math.floor((b.cx + b.r + edge * 3 + rMax * 0.3 - box.x) / CB));
    for (let c = c0; c <= c1; c++) buckets[c].push(b);
  }

  const edgeN = makeFbm(seed + 7, 5);
  const warpN = makeFbm(seed + 3, 3);
  const texN = makeFbm(seed + 13, 5);
  const N = W * H;
  const Ea = new Float32Array(N); // signed distance into the billow union (design px)
  const Hf = new Float32Array(N); // soft-union "bulge" height field (design px), drives the lighting
  const K = 16; // smooth-union softness: creases between billows blend instead of cutting
  for (let py = 0; py < H; py++) {
    const y = box.y + py / S;
    for (let px = 0; px < W; px++) {
      const x = box.x + px / S;
      // domain warp so neither the edge nor the lumps look like circles
      const wx = x + (warpN(x / 150, y / 150) - 0.5) * rMax * 0.22;
      const wy = y + (warpN(x / 150 + 7, y / 150) - 0.5) * rMax * 0.14;
      const bk = buckets[Math.min(cols - 1, Math.max(0, Math.floor((x - box.x) / CB)))];
      let E = -1e9, sum = 0;
      for (const b of bk) {
        const dx = wx - b.cx, dy = wy - b.cy;
        const d2 = dx * dx + dy * dy;
        const e = b.r - Math.sqrt(d2);
        if (e > E) E = e;
        if (e > 0) {
          // sphere bulge towards the viewer; lower (front) billows stand further out
          const h = Math.sqrt(b.r * b.r - d2) + (b.z - top(b.cx)) * 0.35;
          sum += Math.exp(h / K);
        }
      }
      const i = py * W + px;
      Ea[i] = E;
      let h = sum > 0 ? K * Math.log(sum) : 0;
      // multi-scale surface lumps
      h += (texN(x / 55, y / 55) - 0.5) * rMax * 0.14 + (texN(x / 16 + 40, y / 16) - 0.5) * rMax * 0.03;
      Hf[i] = h * smooth(-2, 12, E);
    }
  }
  const Hs = boxBlur(Hf, W, H, Math.max(1, Math.round(3 * S)));
  const Hb = boxBlur(Hf, W, H, Math.round(rMax * 0.35 * S));

  const buf = Buffer.alloc(N * 4);
  for (let py = 0; py < H; py++) {
    const y = box.y + py / S;
    for (let px = 0; px < W; px++) {
      const x = box.x + px / S;
      const i = py * W + px;
      // fluffy, feathered edge
      const n = edgeN(x / 30, y / 30) - 0.5;
      const nf = edgeN(x / 7 + 50, y / 7) - 0.5;
      const Ee = Ea[i] + n * edge * 1.5 + nf * edge * 0.6;
      let a = smooth(-edge * 1.2, edge * 1.1, Ee);
      a = Math.max(a, 0.18 * smooth(-edge * 3.5, -edge * 0.5, Ee)); // thin wispy fringe

      // lighting from the height-field normal + crease occlusion
      const xl = Math.max(0, px - 1), xr = Math.min(W - 1, px + 1);
      const yu = Math.max(0, py - 1), yd = Math.min(H - 1, py + 1);
      const gx = (Hs[py * W + xr] - Hs[py * W + xl]) * S / (xr - xl || 1);
      const gy = (Hs[yd * W + px] - Hs[yu * W + px]) * S / (yd - yu || 1);
      const m = Math.hypot(gx, gy, 1);
      const lam = clamp((-gx * L[0] - gy * L[1] + L[2]) / m);
      let shade = clamp(0.5 + 0.7 * lam);
      const occl = clamp((Hb[i] - Hs[i]) / (rMax * 0.45));
      shade *= 1 - 0.3 * occl;
      // deep inside the bank everything is flatter and whiter (no busy interior)
      const depth = y - top(x);
      const amt = strength * lerp(1, 0.65, smooth(0, rMax * 3, depth));
      shade = clamp(lerp(1, shade, amt));
      // silhouette rims catch the light
      shade = lerp(shade, 1, 1 - a);

      const c = [0, 0, 0];
      for (let ch = 0; ch < 3; ch++) c[ch] = lerp(shadow[ch], 255, shade);

      const yi = (y - box.y) / box.h;
      if (fadeTop) a *= smooth(0, fadeTop, yi);
      if (fadeBottom) a *= 1 - smooth(1 - fadeBottom, 1, yi);
      if (solidBottom) {
        const w = smooth(1 - solidBottom, 1, yi);
        for (let ch = 0; ch < 3; ch++) c[ch] = lerp(c[ch], 255, w);
        a = lerp(a, 1, w);
      }
      a *= opacity;
      const o = (py * W + px) * 4;
      buf[o] = c[0]; buf[o + 1] = c[1]; buf[o + 2] = c[2]; buf[o + 3] = Math.round(clamp(a) * 255);
    }
  }
  await sharp(buf, { raw: { width: W, height: H, channels: 4 } })
    .blur(blur * S)
    .webp({ quality: 88, alphaQuality: 100, effort: 6 })
    .toFile(path.join(OUT, `${name}.webp`));
  console.log('wrote', name, W + 'x' + H, list.length + ' billows');
}

// ---------- desktop: design viewport 1440 wide; image box spans x -80..1520, stage y 380..980 ----------
const DBOX = { x: -80, y: 380, w: 1600, h: 600 };
const DS = 1.3;

await render({
  name: 'cloud-back', seed: 11, box: DBOX, scale: DS, rMin: 60, rMax: 150, edge: 7,
  // the reference silhouette: high crest on the left edge, valley under the product, tall right wall
  pts: [[-80, 500], [-20, 482], [40, 472], [100, 480], [160, 505], [215, 550], [260, 622], [330, 668], [420, 708], [520, 742], [620, 768], [720, 780], [820, 772], [920, 752], [1010, 724], [1080, 688], [1140, 638], [1190, 586], [1240, 534], [1290, 488], [1340, 456], [1390, 438], [1440, 440], [1520, 452]],
  shadow: [190, 205, 222], strength: 1, opacity: 1, blur: 1.1, fadeBottom: 0.12,
});
await render({
  name: 'cloud-mid', seed: 29, box: DBOX, scale: DS, rMin: 62, rMax: 150, edge: 7,
  pts: [[-80, 640], [10, 628], [90, 640], [170, 672], [260, 712], [370, 742], [490, 762], [610, 772], [720, 774], [830, 770], [950, 758], [1060, 738], [1150, 708], [1240, 668], [1320, 640], [1410, 626], [1520, 624]],
  shadow: [198, 211, 227], strength: 0.95, opacity: 1, blur: 1, fadeBottom: 0.1,
});
await render({
  name: 'cloud-front', seed: 47, box: DBOX, scale: DS, rMin: 70, rMax: 160, edge: 7,
  pts: [[-80, 752], [30, 742], [140, 758], [260, 790], [390, 820], [520, 830], [650, 836], [770, 838], [890, 832], [1010, 818], [1130, 798], [1240, 770], [1340, 752], [1440, 744], [1520, 744]],
  shadow: [205, 217, 231], strength: 0.9, opacity: 1, blur: 1, solidBottom: 0.4,
});

// ---------- phone: design viewport 430 wide; image box spans x -45..475, stage y 500..900 ----------
const MBOX = { x: -45, y: 500, w: 520, h: 400 };
const MS = 3;

await render({
  name: 'cloud-back-m', seed: 61, box: MBOX, scale: MS, rMin: 26, rMax: 60, edge: 3.5,
  pts: [[-45, 592], [0, 578], [35, 574], [75, 588], [115, 618], [160, 652], [215, 674], [270, 668], [315, 644], [355, 604], [390, 566], [425, 542], [475, 536]],
  shadow: [190, 205, 222], strength: 1, opacity: 1, blur: 0.8, fadeBottom: 0.12,
});
await render({
  name: 'cloud-mid-m', seed: 73, box: MBOX, scale: MS, rMin: 28, rMax: 62, edge: 3.5,
  pts: [[-45, 650], [20, 642], [80, 660], [150, 690], [220, 704], [295, 696], [360, 672], [420, 650], [475, 642]],
  shadow: [198, 211, 227], strength: 0.95, opacity: 1, blur: 0.8, fadeBottom: 0.1,
});
await render({
  name: 'cloud-front-m', seed: 89, box: MBOX, scale: MS, rMin: 30, rMax: 66, edge: 3.5,
  pts: [[-45, 712], [40, 704], [120, 722], [200, 740], [280, 738], [360, 722], [430, 708], [475, 704]],
  shadow: [205, 217, 231], strength: 0.9, opacity: 1, blur: 0.8, solidBottom: 0.4,
});
