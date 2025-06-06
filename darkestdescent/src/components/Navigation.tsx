import React from 'react';

interface NavigationProps {
  currentPage: string;
  onNavigate?: (page: string) => void;
  playerName: string;
  playerLevel: number;
  hpPercent: number;
  manaPercent: number;
  xpPercent: number;
  currentFloor: number;
}

const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onNavigate = () => {},
  playerName,
  playerLevel,
  hpPercent,
  manaPercent,
  xpPercent,
  currentFloor
}) => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-95 border-b border-gray-700 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-y-1">
        {/* Branding and Player Info */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-6 w-full md:w-auto">
          <span className="text-white text-lg font-bold whitespace-nowrap">Dark Descent</span>
          <span className="text-white text-sm font-medium whitespace-nowrap">{playerName} — Lvl {playerLevel}</span>
          <span className="text-white text-sm whitespace-nowrap">Floor {currentFloor}</span>
        </div>

        {/* Status Orbs (unified across all sizes) */}
        <div className="flex items-center space-x-2 mt-2 md:mt-0">
          <div className="w-5 h-5 rounded-full border border-gray-600 overflow-hidden relative" title={`HP: ${Math.floor(hpPercent)}%`}>
            <div 
              className="absolute inset-0 bg-green-500 transition-all duration-200" 
              style={{ transform: `translateY(${100 - hpPercent}%)` }}
            />
          </div>
          <div className="w-5 h-5 rounded-full border border-gray-600 overflow-hidden relative" title={`MP: ${Math.floor(manaPercent)}%`}>
            <div 
              className="absolute inset-0 bg-purple-500 transition-all duration-200" 
              style={{ transform: `translateY(${100 - manaPercent}%)` }}
            />
          </div>
          <div className="w-5 h-5 rounded-full border border-gray-600 overflow-hidden relative" title={`XP: ${Math.floor(xpPercent)}%`}>
            <div 
              className="absolute inset-0 bg-purple-900 transition-all duration-200" 
              style={{ transform: `translateY(${100 - xpPercent}%)` }}
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center space-x-2 mt-2 md:mt-0">
          {['Character', 'Explore', 'Skills', 'Codex'].map(page => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className={`px-3 py-1 rounded text-sm font-medium transition whitespace-nowrap ${
                currentPage === page ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
