"use client";

import { useEffect } from "react";

export function HeroParticles() {
  useEffect(() => {
    const container = document.getElementById("particles");
    if (!container) return;
    container.innerHTML = "";
    const colors = [
      "#FF6B35",
      "#FFD600",
      "#7C4DFF",
      "#00C853",
      "#FF4081",
      "#00B0FF",
    ];
    for (let i = 0; i < 15; i++) {
      const pt = document.createElement("div");
      pt.className = "particle";
      const size = Math.random() * 8 + 4;
      pt.style.cssText = `
      width:${size}px;height:${size}px;
      left:${Math.random() * 100}%;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration:${Math.random() * 10 + 8}s;
      animation-delay:${Math.random() * 10}s;
      opacity:0.4;
    `;
      container.appendChild(pt);
    }
  }, []);

  return <div className="hero-particles" id="particles" />;
}
