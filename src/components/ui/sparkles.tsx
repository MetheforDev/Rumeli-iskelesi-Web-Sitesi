"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  velocityX: number;
  velocityY: number;
  color: string;
}

export const SparklesCore = ({
  background = "transparent",
  minSize = 0.4,
  maxSize = 1,
  speed = 1,
  particleColor = "#d9892a",
  className,
  particleDensity = 100,
}: {
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  className?: string;
  particleDensity?: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    particlesRef.current = Array.from({ length: particleDensity }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * (maxSize - minSize) + minSize,
      opacity: Math.random(),
      velocityX: (Math.random() - 0.5) * speed * 0.5,
      velocityY: -Math.random() * speed * 0.3 - 0.1,
      color: particleColor,
    }));
  }, [maxSize, minSize, particleColor, particleDensity, speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (background !== "transparent") {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      particlesRef.current.forEach((p) => {
        p.x += p.velocityX;
        p.y += p.velocityY;
        p.opacity -= 0.003;

        if (p.opacity <= 0 || p.y < 0) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height;
          p.opacity = Math.random();
          p.velocityX = (Math.random() - 0.5) * speed * 0.5;
          p.velocityY = -Math.random() * speed * 0.3 - 0.1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animationRef.current);
      ro.disconnect();
    };
  }, [background, initParticles, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("h-full w-full", className)}
    />
  );
};
