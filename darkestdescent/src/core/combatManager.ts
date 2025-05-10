import { Player } from './player';
import { Enemy } from './enemy';

export const attackEnemy = (player: Player, enemy: Enemy): { enemy: Enemy; defeated: boolean } => {
  const newHp = enemy.hp - player.damage;
  return {
    enemy: { ...enemy, hp: newHp },
    defeated: newHp <= 0
  };
};

export const handleEnemyDefeat = (player: Player, enemy: Enemy): void => {
  // Additional defeat logic can be added here
  console.log(`${enemy.name} has been defeated!`);
};