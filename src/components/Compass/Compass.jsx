import React, { useMemo } from 'react';
import { Box } from '@mui/material';

const Compass = ({ rotation }) => {
  // Constants for the compass layout
  const COMPASS_RADIUS = 100;
  const TICK_RADIUS = 80;
  const TEXT_DISTANCE_FROM_CENTER = 50;
  const FONT_SIZE = 18;
  const LONG_TICK_LENGTH = 12;
  const SHORT_TICK_LENGTH = 10;
  const NUM_TICKS = 72;

  // Calculate the style for rotation
  const rotationStyle = {
    transformOrigin: `${COMPASS_RADIUS}px ${COMPASS_RADIUS}px`,
    transform: `rotate(${-rotation}deg)`,
  };

  // Function to calculate tick positions and lengths
  const calculateTicks = useMemo(() => {
    return Array.from({ length: NUM_TICKS }).map((_, index) => {
      const angle = (index * 5) * (Math.PI / 180);
      const x1 = COMPASS_RADIUS + TICK_RADIUS * Math.cos(angle);
      const y1 = COMPASS_RADIUS + TICK_RADIUS * Math.sin(angle);
      const isLongTick = index % 18 === 0;
      const length = isLongTick ? LONG_TICK_LENGTH : SHORT_TICK_LENGTH;
      const x2 = COMPASS_RADIUS + (TICK_RADIUS - length) * Math.cos(angle);
      const y2 = COMPASS_RADIUS + (TICK_RADIUS - length) * Math.sin(angle);

      return { x1, y1, x2, y2, isTop: index === 0, isLongTick };
    });
  }, []);

  // Function to render cardinal direction texts
  const renderDirectionText = (x, y, text) => (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize={FONT_SIZE}
      fill="white"
    >
      {text}
    </text>
  );

  return (
    <Box>
      <svg width="100%" height="100%" viewBox="0 0 200 200">
        <g style={rotationStyle}>
          {/* Draw center point */}
          <circle cx={COMPASS_RADIUS} cy={COMPASS_RADIUS} r="1" fill="white" />

          {/* Render tick marks */}
          {calculateTicks.map((tick, index) => (
            <line
              key={index}
              x1={tick.x1}
              y1={tick.y1}
              x2={tick.x2}
              y2={tick.y2}
              stroke={
                tick.isLongTick
                  ? "rgba(255,255,255,1)"
                  : index % 9 === 0
                  ? "rgba(255,255,255,0.8)"
                  : "rgba(255,255,255,0.37)"
              }
              strokeWidth={1}
            />
          ))}

          {/* Draw top red triangle */}
          {calculateTicks.find(tick => tick.isTop) && (
            <polygon points="95,5 105,5 100,15" fill="red" />
          )}

          {/* Render cardinal directions */}
          {renderDirectionText(COMPASS_RADIUS, COMPASS_RADIUS - TEXT_DISTANCE_FROM_CENTER, 'N')}
          {renderDirectionText(COMPASS_RADIUS + TEXT_DISTANCE_FROM_CENTER, COMPASS_RADIUS + 5, 'E')}
          {renderDirectionText(COMPASS_RADIUS, COMPASS_RADIUS + TEXT_DISTANCE_FROM_CENTER, 'S')}
          {renderDirectionText(COMPASS_RADIUS - TEXT_DISTANCE_FROM_CENTER, COMPASS_RADIUS + 5, 'W')}
        </g>

        {/* Draw static reference line */}
        <line
          x1="100"
          y1="15"
          x2="100"
          y2="35"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth={3}
        />
      </svg>
    </Box>
  );
};

export default Compass;
