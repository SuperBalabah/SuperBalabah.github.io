import React, { useEffect, useState } from 'react';

export const MouseSpotlight: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: -1000,
    y: -1000,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden lg:block"
      style={{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(20, 184, 166, 0.08), transparent 80%)`,
      }}
    />
  );
};
