import React from "react";

const bubbles = Array.from({ length: 15 }); // number of bubbles

function FloatingBubbles() {
  return (
    <div className="0g7974sz absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((_, index) => {
        const size = Math.random() * 40 + 10; // bubble size 10-50px
        const left = Math.random() * 100; // left position %
        const delay = Math.random() * 10; // animation delay
        const duration = Math.random() * 20 + 10; // animation duration 10-30s
        const opacity = Math.random() * 0.5 + 0.3;

        return (
          <div
            key={index}
            className="073txyue absolute rounded-full bg-white opacity-50 animate-float"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              bottom: `-50px`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              opacity: opacity,
            }}
          />
        );
      })}
    </div>
  );
}

export default FloatingBubbles;
