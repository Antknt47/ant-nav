import React from 'react';
import * as d3 from 'd3';
import './Speedometer.css';

const Speedometer = ({ speed, tickInterval = 50 }) => {
  const width = 200;
  const height = 200;
  const radius = Math.min(width, height) / 2 - 5;
  const yMove = -80;
  const textDistanceFromCenter = radius - 25;
  React.useEffect(() => {
    const svg = d3.select('#speedometer')
      .attr('width', "100%")
      .attr('height', "100%")
      .attr('viewBox', "0 0 200 200");

    svg.selectAll('*').remove();
    const tickAngle = d3.scalePow()
      .exponent(0.7).domain([0, 400]).range([-Math.PI / 6, 7 * Math.PI / 6]);
    const ticks = d3.range(0, 600, 10);

    ticks.forEach(tick => {
      if (tick > 400) return;

      const angle = tickAngle(tick);
      const x1 = -Math.cos(angle) * (radius - 10);
      const y1 = -Math.sin(angle) * (radius - 10);
      const x2 = -Math.cos(angle) * radius;
      const y2 = -Math.sin(angle) * radius;

      svg.append('line')
        .attr('x1', width / 2 + x1)
        .attr('y1', height + y1 + yMove)
        .attr('x2', width / 2 + x2)
        .attr('y2', height + y2 + yMove)
        .attr('class', 'tick');

      if (tick % tickInterval === 0) {
        const textX = width / 2 - Math.cos(angle) * textDistanceFromCenter;
        const textY = height - Math.sin(angle) * textDistanceFromCenter + yMove;
        svg.append('text')
          .attr('x', textX)
          .attr('y', textY)
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'middle')
          .attr('class', 'tick-label')
          .style('fill', 'white')
          .text(tick);
      }
    });

    const pointerAngle = tickAngle(speed);
    const pointerX = -Math.cos(pointerAngle) * radius;
    const pointerY = -Math.sin(pointerAngle) * radius;

    svg.append('line')
      .attr('x1', width / 2)
      .attr('y1', height + yMove)
      .attr('x2', width / 2 + pointerX)
      .attr('y2', height + pointerY + yMove)
      .attr('class', 'pointer')
      .style('stroke', 'red')
      .style('stroke-width', 2);
  }, [speed, tickInterval]);

  return <svg id="speedometer" />;
};

export default Speedometer;
