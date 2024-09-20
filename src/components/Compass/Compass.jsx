import React, { useMemo } from 'react';
import { Box } from '@mui/material';

const Compass = ({ rotation }) => {
  const rotationStyle = {
    transform: `rotate(${-rotation}deg)`,
    objectFit: 'contain',
    maxWidth: '100%',
  };

  // 离中心的距离
  const textDistanceFromCenter = 45;
  const fontSize = 18;

  const ticks = useMemo(() => {
    return Array.from({ length: 72 }).map((_, index) => {
      const angle = (index * 5) * (Math.PI / 180);
      const x1 = 100 + 80 * Math.cos(angle);
      const y1 = 100 + 80 * Math.sin(angle);
      const isLongTick = index % 18 === 0;

      const length = isLongTick ? 12 : 10;
      const x2 = 100 + (80 - length) * Math.cos(angle);
      const y2 = 100 + (80 - length) * Math.sin(angle);

      return { x1, y1, x2, y2, isTop: index === 0 };
    });
  }, []);

  return (
    <Box>
      <svg width="100%" height="100%" viewBox="0 0 200 200" style={rotationStyle}>
        {/* 表盘中心 */}
        <circle cx="100" cy="100" r="5" fill="black" />

        {/* 刻度线 */}
        {ticks.map((tick, index) => (
          <line 
            key={index} 
            x1={tick.x1} 
            y1={tick.y1} 
            x2={tick.x2} 
            y2={tick.y2} 
            stroke="rgba(255,255,255,0.37)" 
            strokeWidth={1} 
          />
        ))}

        {/* 指向上方的箭头 */}
        {ticks.find(tick => tick.isTop) && (
          <polygon 
            points="95,5 105,5 100,15" 
            fill="red" 
          />
        )}

        {/* 东南西北方向 */}
        <text 
          x="100" 
          y={100 - textDistanceFromCenter} 
          textAnchor="middle" 
          fontSize={fontSize}
          fill="white"
        >
          N
        </text>  {/* 北 */}
        <text 
          x={100 + textDistanceFromCenter} 
          y="105" 
          textAnchor="middle" 
          fontSize={fontSize} 
          fill="white"
        >
          E
        </text>  {/* 东 */}
        <text 
          x="100" 
          y={100 + textDistanceFromCenter} 
          textAnchor="middle" 
          fontSize={fontSize}
          fill="white"
        >
          S
        </text>  {/* 南 */}
        <text 
          x={100 - textDistanceFromCenter} 
          y="105" 
          textAnchor="middle" 
          fontSize={fontSize} 
          fill="white"
        >
          W
        </text>  {/* 西 */}
      </svg>
    </Box>
  );
};

export default Compass;
