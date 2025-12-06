"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface StatCounterProps {
  value: number | string;
  label: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export function StatCounter({ 
  value, 
  label, 
  suffix = "", 
  prefix = "",
  duration = 2000 
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  // If value is a string (like "201-500"), just display it
  const isNumeric = typeof value === "number";
  const targetValue = isNumeric ? value : 0;

  useEffect(() => {
    if (!isInView || !isNumeric) return;

    let startTime: number;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * targetValue));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, targetValue, duration, isNumeric]);

  const displayValue = isNumeric ? count : value;

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
        {prefix}
        {displayValue}
        {suffix}
      </div>
      <div className="text-sm md:text-base text-gray-600 font-medium">
        {label}
      </div>
    </div>
  );
}
