import React, { useState } from 'react';
import { Player } from '../core/player';

interface SkillsProps {
  player: Player;
}

interface TooltipProps {
  xp: number;
  level: number;
  xpToNext: number;
  isVisible: boolean;
  position: { x: number; y: number };
}

const Tooltip: React.FC<TooltipProps> = ({ xp, level, xpToNext, isVisible, position }) => {
  if (!isVisible) return null;
  
  return (
    <div 
      className="absolute bg-gray-800 border border-gray-600 p-3 rounded-lg shadow-lg z-50"
      style={{ left: position.x + 'px', top: position.y + 'px' }}
    >
      <div className="text-sm">
        <p>Level: {level}</p>
        <p>XP: {xp} / {xpToNext}</p>
        <div className="w-full h-2 bg-gray-700 rounded mt-1">
          <div 
            className="h-2 bg-blue-500 rounded"
            style={{ width: `${(xp/xpToNext * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

const Skills: React.FC<SkillsProps> = ({ player }) => {
  const [tooltipState, setTooltipState] = useState({
    isVisible: false,
    position: { x: 0, y: 0 }
  });

  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipState({
      isVisible: true,
      position: { 
        x: rect.right + 10,
        y: rect.top
      }
    });
  };

  const handleMouseLeave = () => {
    setTooltipState({ ...tooltipState, isVisible: false });
  };

  return (
    <div className="pt-20 space-y-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">⚒️ Skills</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div 
            className="bg-gray-700 p-4 rounded-lg flex flex-col items-center transition hover:bg-gray-600 cursor-help"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span className="text-3xl mb-2">⛏️</span>
            <span className="font-medium">Mining</span>
            <span className="text-sm text-gray-300">Level {player.miningLevel}</span>
          </div>
        </div>

        <Tooltip 
          xp={player.miningXP}
          level={player.miningLevel}
          xpToNext={player.miningXPToNext}
          isVisible={tooltipState.isVisible}
          position={tooltipState.position}
        />
      </div>
    </div>
  );
};

export default Skills;