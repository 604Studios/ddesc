import React from 'react';
import { Player } from '../core/player';

interface CharacterProps {
  player: Player;
  onUpgrade: (type: 'damage' | 'maxHp' | 'heal') => void;
}

const Character: React.FC<CharacterProps> = ({ player, onUpgrade }) => {
  return (
    <div className="pt-20 space-y-6">
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Character Stats</h2>
        <div className="space-y-2">
          <p>Name: {player.name}</p>
          <p>Level: {player.level}</p>
          <p>XP: {player.xp} / {player.xpToNext}</p>
          <div className="h-2 bg-purple-700 rounded">
            <div 
              className="h-2 bg-purple-500 rounded" 
              style={{ width: `${(player.xp/player.xpToNext)*100}%` }} 
            />
          </div>
          <p>HP: {player.hp} / {player.maxHp}</p>
          <div className="h-2 bg-green-700 rounded">
            <div 
              className="h-2 bg-green-500 rounded" 
              style={{ width: `${(player.hp/player.maxHp)*100}%` }} 
            />
          </div>
          <p>Damage: {player.damage}</p>
          <p>Souls: {player.souls}</p>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Upgrades</h2>
        <div className="flex flex-col gap-2">
          <button 
            onClick={() => onUpgrade('damage')} 
            className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded text-white"
          >
            +5 Damage (Cost: 50 Souls)
          </button>
          <button 
            onClick={() => onUpgrade('maxHp')} 
            className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded text-white"
          >
            +20 Max HP (Cost: 50 Souls)
          </button>
          <button 
            onClick={() => onUpgrade('heal')} 
            className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded text-white"
          >
            Heal 30% HP (Cost: 50 Souls)
          </button>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Inventory</h2>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(player.inventory).map(([item, count]) => (
            <div
              key={item}
              className="bg-gray-700 p-2 rounded-lg flex flex-col items-center justify-center group hover:bg-gray-600 transition"
              title={`Tier 1 resource: ${item}`}
            >
              <span className="text-2xl">
                {item.includes('Shard') ? '🔮' : item.includes('Coal') ? '🪵' : '🪨'}
              </span>
              <span className="text-sm text-white font-medium">{item}</span>
              <span className="text-sm text-gray-300">x{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Character;