import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Character from './pages/Character';
import Explore from './pages/Explore';
import Codex from './pages/Codex';
import {
  createPlayer,
  gainXP,
  addMiningXP,
  addToInventory,
  Player
} from './core/player';
import { createEnemy, Enemy } from './core/enemy';
import { attackEnemy, handleEnemyDefeat } from './core/combatManager';

// Theme data
const relicPool = [
  'Bloodstone Talisman',
  'Ashen Grimoire',
  'Cursed Medallion',
  'Whispering Skull',
  'Dagger of Night',
  'Obsidian Idol'
];

const getRandomRelic = () => relicPool[Math.floor(Math.random() * relicPool.length)];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('Character');
  const [player, setPlayer] = useState<Player>(createPlayer());
  const [floor, setFloor] = useState(1);
  const [enemy, setEnemy] = useState<Enemy>(createEnemy(1));
  const [relics, setRelics] = useState<string[]>([]);
  const [bloodCollected, setBloodCollected] = useState(0);
  const [isBoss, setIsBoss] = useState(false);
  const [miningMessage, setMiningMessage] = useState<string|null>(null);
  const [codexRelics, setCodexRelics] = useState<string[]>([]);
  const [codexNPCs, setCodexNPCs] = useState<string[]>([]);
  const [codexEnemies, setCodexEnemies] = useState<string[]>([]);

  // Load saved state
  useEffect(() => {
    const savedState = localStorage.getItem('save');
    if (savedState) {
      const { player: savedPlayer, floor: savedFloor, enemy: savedEnemy, relics: savedRelics, bloodCollected: savedBlood, isBoss: savedIsBoss } = JSON.parse(savedState);
      setPlayer(savedPlayer);
      setFloor(savedFloor);
      setEnemy(savedEnemy);
      setRelics(savedRelics);
      setBloodCollected(savedBlood);
      setIsBoss(savedIsBoss);
    }
  }, []);

  // Save state
  useEffect(() => {
    localStorage.setItem('save', JSON.stringify({
      player,
      floor,
      enemy,
      relics,
      bloodCollected,
      isBoss,
    }));
  }, [player, floor, enemy, relics, bloodCollected, isBoss]);

  const handleAttack = () => {
    if (player.hp <= 0) return;

    const { enemy: updatedEnemy, defeated } = attackEnemy(player, { ...enemy });
    setEnemy(updatedEnemy);

    const newHp = player.hp - (isBoss ? 15 : 5);
    const updatedPlayer = { ...player, hp: Math.max(newHp, 0) };

    if (updatedPlayer.hp <= 0) {
      setPlayer({ ...updatedPlayer, hp: updatedPlayer.maxHp, souls: Math.floor(updatedPlayer.souls * 0.9) });
      setFloor(1);
      setBloodCollected(0);
      setIsBoss(false);
      setEnemy(createEnemy(1));
      return;
    }

    if (defeated) {
      const xpGain = isBoss ? 100 : 25;
      const soulsGain = isBoss ? 100 : 20;
      const bloodGain = isBoss ? 0 : 25;
      
      const updatedPlayerWithRewards = gainXP({ ...updatedPlayer, souls: updatedPlayer.souls + soulsGain }, xpGain);
      setPlayer(updatedPlayerWithRewards);
      
      const newBloodTotal = bloodCollected + bloodGain;
      const requirement = Math.floor(100 + floor * 10);

      if (isBoss) {
        const nextFloor = floor + 1;
        setFloor(nextFloor);
        setBloodCollected(0);
        setIsBoss(false);
        setEnemy(createEnemy(nextFloor));
      } else if (newBloodTotal >= requirement) {
        setIsBoss(true);
        setEnemy(createEnemy(floor + 0.5));
      } else {
        setBloodCollected(newBloodTotal);
        setEnemy(createEnemy(floor));
      }
    }
  };

  const handleBloodRite = () => {
    const tradePercent = 0.05;
    const maxTradePercent = 0.25;
    const alreadyTraded = player.baseMaxHp - player.maxHp;
    const maxLoss = player.baseMaxHp * maxTradePercent;

    if (alreadyTraded < maxLoss) {
      const loss = Math.min(player.baseMaxHp * tradePercent, maxLoss - alreadyTraded);
      const newRelic = getRandomRelic();
      setPlayer({
        ...player,
        maxHp: player.maxHp - loss,
        hp: Math.min(player.hp, player.maxHp - loss),
      });
      setRelics([...relics, newRelic]);
    }
  };

  const handleUpgrade = (type: 'damage' | 'maxHp' | 'heal') => {
    const cost = 50;
    if (player.souls < cost) return;
    const updatedPlayer = { ...player, souls: player.souls - cost };
    
    if (type === 'damage') updatedPlayer.damage += 5;
    if (type === 'maxHp') {
      updatedPlayer.maxHp += 20;
      updatedPlayer.baseMaxHp += 20;
      updatedPlayer.hp += 20;
    }
    if (type === 'heal') {
      const healAmount = Math.floor(updatedPlayer.maxHp * 0.3);
      updatedPlayer.hp = Math.min(updatedPlayer.hp + healAmount, updatedPlayer.maxHp);
    }
    
    setPlayer(updatedPlayer);
  };

  const handleMine = () => {
    const ores = ['Iron Ore', 'Coal', 'Soul Shard'];
    const found = ores[Math.floor(Math.random() * ores.length)];
    const xpGain = 10;
    
    const updatedPlayer = addToInventory(addMiningXP(player, xpGain), found, 1);
    setPlayer(updatedPlayer);
    setMiningMessage(`You mined ${found} and gained ${xpGain} mining XP!`);
    setTimeout(() => setMiningMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <div className="container mx-auto px-4 pb-8">
        {currentPage === 'Character' && (
          <Character player={player} onUpgrade={handleUpgrade} />
        )}
        
        {currentPage === 'Explore' && (
          <Explore
            player={player}
            enemy={enemy}
            floor={floor}
            bloodCollected={bloodCollected}
            bloodRequirement={Math.floor(100 + floor * 10)}
            isBoss={isBoss}
            onAttack={handleAttack}
            onBloodRite={handleBloodRite}
            onMine={handleMine}
            miningMessage={miningMessage}
            relics={relics}
          />
        )}
        
        {currentPage === 'Codex' && (
          <Codex
            relics={codexRelics}
            npcs={codexNPCs}
            enemies={codexEnemies}
          />
        )}
      </div>
    </div>
  );
};

export default App;
