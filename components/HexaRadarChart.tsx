import React from 'react';
import { AgentEvaluation } from '../types';

interface HexaRadarChartProps {
  agents: AgentEvaluation[];
}

const HexaRadarChart: React.FC<HexaRadarChartProps> = ({ agents }) => {
  const size = 300;
  const center = size / 2;
  const radius = 100;
  const numPoints = 6;
  
  // Calculate vertices for the background hexagon
  const getPolygonPoints = (r: number) => {
    let points = "";
    for (let i = 0; i < numPoints; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 2; // Start from top
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      points += `${x},${y} `;
    }
    return points;
  };

  // Calculate points for the data score polygon
  const getDataPoints = () => {
    let points = "";
    agents.forEach((agent, i) => {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      // Normalize score 0-100 to radius
      const r = (agent.score / 100) * radius; 
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      points += `${x},${y} `;
    });
    return points;
  };

  // Agent label positions
  const getLabelPosition = (i: number) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    const labelRadius = radius + 35;
    const x = center + labelRadius * Math.cos(angle);
    const y = center + labelRadius * Math.sin(angle);
    return { x, y };
  };

  // Short labels for visualization
  const labels = ["Architect", "QA", "Docs", "Product", "Legal", "AI/Tech"];

  return (
    <div className="flex justify-center items-center py-4">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background Grids */}
        {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
          <polygon
            key={i}
            points={getPolygonPoints(radius * scale)}
            fill="none"
            stroke="#1e293b"
            strokeWidth="1"
          />
        ))}

        {/* Axes */}
        {labels.map((_, i) => {
           const angle = (Math.PI / 3) * i - Math.PI / 2;
           const x = center + radius * Math.cos(angle);
           const y = center + radius * Math.sin(angle);
           return (
             <line
               key={i}
               x1={center}
               y1={center}
               x2={x}
               y2={y}
               stroke="#1e293b"
               strokeWidth="1"
             />
           );
        })}

        {/* Data Polygon */}
        <polygon
          points={getDataPoints()}
          fill="rgba(6, 182, 212, 0.2)"
          stroke="#22d3ee"
          strokeWidth="2"
          className="drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
        />

        {/* Data Points */}
        {agents.map((agent, i) => {
           const angle = (Math.PI / 3) * i - Math.PI / 2;
           const r = (agent.score / 100) * radius; 
           const x = center + r * Math.cos(angle);
           const y = center + r * Math.sin(angle);
           return (
             <circle
               key={i}
               cx={x}
               cy={y}
               r="4"
               fill="#06b6d4"
               stroke="#fff"
               strokeWidth="1"
               className="hover:scale-125 transition-transform origin-center cursor-pointer"
             >
               <title>{agent.role}: {agent.score}</title>
             </circle>
           );
        })}

        {/* Labels */}
        {labels.map((label, i) => {
          const { x, y } = getLabelPosition(i);
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#94a3b8"
              fontSize="10"
              fontWeight="bold"
              className="uppercase tracking-wider"
            >
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export default HexaRadarChart;