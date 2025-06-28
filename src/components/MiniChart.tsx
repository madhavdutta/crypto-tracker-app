import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface MiniChartProps {
  data: number[];
  color: string;
  width?: number;
  height?: number;
}

export const MiniChart: React.FC<MiniChartProps> = ({ 
  data, 
  color, 
  width = 100, 
  height = 40 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 2, right: 2, bottom: 2, left: 2 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain(d3.extent(data) as [number, number])
      .range([innerHeight, 0]);

    const line = d3.line<number>()
      .x((_, i) => xScale(i))
      .y(d => yScale(d))
      .curve(d3.curveMonotoneX);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add gradient
    const gradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', `gradient-${Math.random()}`)
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0).attr('y1', 0)
      .attr('x2', 0).attr('y2', innerHeight);

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', color)
      .attr('stop-opacity', 0.8);

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', color)
      .attr('stop-opacity', 0.1);

    // Add area
    const area = d3.area<number>()
      .x((_, i) => xScale(i))
      .y0(innerHeight)
      .y1(d => yScale(d))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(data)
      .attr('fill', `url(#gradient-${Math.random()})`)
      .attr('d', area);

    // Add line
    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 1.5)
      .attr('d', line);

  }, [data, color, width, height]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className="overflow-visible"
    />
  );
};
