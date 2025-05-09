import React from 'react';
import { Player } from '../core/player';
import { Enemy } from '../core/enemy';

interface ExploreProps {
  player: Player;
  enemy: Enemy;
  floor: number;
  bloodCollected: number;
  bloodRequirement: number;
  isBoss: boolean;
  onAttack: () => void;
  onBloodRite: () => void;
  onMine: () => void;
  miningMessage: string | null;
  relics: string[];
}

const Explore: React.FC<ExploreProps> = ({
  player,
  enemy,
  floor,
  bloodCollected,
  bloodRequirement,
  isBoss,
  onAttack,
  onBloodRite,
  onMine,
  miningMessage,
  relics
}) => {
  const bloodProgress = Math.min(100, (bloodCollected / bloodRequirement) * 100);

  return (
    <div className="pt-20 space-y-6">
      <div className="w-full max-w-md mx-auto">
        <p className="text-lg mb-1">Floor: {floor}</p>
        <div className="text-sm mb-1">
          {isBoss ? 'Boss Encounter!' : `Blood Collected: ${bloodCollected} / ${bloodRequirement}`}
        </div>
        {!isBoss && (
          <div className="h-2 bg-red-700 rounded">
            <div 
              className="h-2 bg-red-500 rounded" 
              style={{ width: `${bloodProgress}%` }} 
            />
          </div>
        )}
      </div>

      <div className="bg-red-900 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">
          {isBoss ? 'Boss' : 'Enemy'}:{' '}
          {enemy.trait === 'Elite' ? (
            <span className="bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 bg-clip-text text-transparent font-bold">
              {enemy.name.split(' ')[0]}
            </span>
          ) : null}{' '}
          {enemy.trait === 'Elite' ? enemy.name.split(' ').slice(1).join(' ') : enemy.name}
        </h2>
        <p>HP: {enemy.hp} / {enemy.maxHp}</p>
        {enemy.trait && <p>Trait: {enemy.trait}</p>}
      </div>

      <div className="flex gap-4 justify-center">
        <button 
          onClick={onAttack}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-lg font-semibold shadow-md"
        >
          Attack
        </button>
        <button 
          onClick={onBloodRite}
          className="bg-purple-700 hover:bg-purple-800 px-6 py-2 rounded-lg text-lg font-semibold shadow-md"
        >
          Blood Rite
        </button>
      </div>

      {relics.length > 0 && (
        <div className="bg-gray-700 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Relics</h2>
          <ul className="list-disc list-inside">
            {relics.map((relic, index) => (
              <li key={index}>{relic}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col items-center">
        <button
          onClick={onMine}
          className="bg-yellow-700 hover:bg-yellow-800 px-4 py-2 rounded-lg text-white shadow-md"
        >
          ⛏️ Mine
        </button>
        {miningMessage && (
          <p className="mt-2 text-sm text-yellow-300">{miningMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Explore;