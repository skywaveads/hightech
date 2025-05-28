'use client';

export default function PatternStyles() {
  return (
    <style jsx global>{`
      .bg-pattern-dots {
        background-image: radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px);
        background-size: 30px 30px;
      }
    `}</style>
  );
} 