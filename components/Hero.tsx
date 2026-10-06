"use client";

import { FileText, Truck } from "lucide-react";
import { HeroProducts } from "./HeroProducts";
import { useHeroLayers } from "./heroTimeline";
import { Reveal } from "./Reveal";

export function Hero() {
  const layers = useHeroLayers();

  return (
    <header className="hero" id="top">
      <div className="hero__stage">
      <div className="hero__sky" aria-hidden="true" />


      <div className="hero__inner">
        <div className="hero__top">
          <div className="hero__copy">
          <Reveal variant="fade" className="hero__heading">
            <h1 className="t-h1">
              Suv biznesini
              <br />
              bir joydan boshqaring.
            </h1>
            <p className="hero__sub">
              Buyurtma, mijoz, ombor, yetkazib berish va to‘lovlar — barchasi bitta tizimda.
            </p>
          </Reveal>
          </div>

          <div className="hero__visual">
            <HeroProducts layers={layers} />
            <div className="floats">

            <Reveal variant="scale-lg" delay={150} className="float float--sales">
              <div className="stat-card stat-card--sales">
                <p className="t-body">Bugungi buyurtmalar</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <p className="stat-card__amount">128</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span className="chip">+18%</span>
                    <span className="t-body" style={{ lineHeight: "21px" }}>kechagidan</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal variant="scale-lg" delay={250} className="float float--secure">
              <span className="pill-dark">
                <FileText size={14} strokeWidth={1.6} aria-hidden="true" />
                Avtomatik buyurtma
              </span>
            </Reveal>
            </div>

            <div className="floats">
            <Reveal variant="scale-lg" delay={350} className="float float--ent">
              <div className="stat-card stat-card--ent">
                <span
                  style={{
                    display: "grid",
                    placeItems: "center",
                    width: 46,
                    height: 46,
                    borderRadius: 100,
                    background: "#f4f4f4",
                  }}
                >
                  <Truck size={20} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <p className="stat-card__amount">37</p>
                    <span className="chip">+23%</span>
                  </div>
                  <p className="t-body">Yetkazib berilmoqda</p>
                </div>
              </div>
            </Reveal>

            <Reveal variant="scale-lg" delay={450} className="float float--track">
              <span className="pill-dark">
                <Truck size={14} strokeWidth={1.6} aria-hidden="true" />
                Yetkazib berishni kuzatish
              </span>
            </Reveal>
            </div>
          </div>
        </div>
      </div>
      </div>
    </header>
  );
}
