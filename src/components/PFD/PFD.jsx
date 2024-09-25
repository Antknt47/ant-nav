import React from 'react';

const PFD = ({ heading = 0, pitch = 0, roll = 0 }) => {
  const rotationStyle = {
    transformOrigin: `${100}px ${100}px`,
    transform: `rotate(${-roll}deg)`, // 控制翻滚
  };

  return (
    <svg height="100%" width="100%" viewBox="0 0 200 200">
      <rect x="0" y="0" height="200" width="200" fill="rgb(77, 171, 255)" />
      
      <g style={rotationStyle}>
        <rect 
          x="-50" 
          y={pitch}  // 控制地面随俯仰移动
          height="200" 
          width="300" 
          fill="rgb(255, 169, 77)" 
        />
      </g>

      <text x="100" y="190" fill="white" fontSize="20" textAnchor="middle">
        {(heading??0).toFixed(2)}°
      </text>
    </svg>
  );
};

export default PFD;
