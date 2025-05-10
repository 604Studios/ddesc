export interface Enemy {
  name: string;
  hp: number;
  maxHp: number;
  trait?: string;
}

export const createEnemy = (floor: number): Enemy => {
  const baseHp = 50 + floor * 20;
  const names = [
    "Skeletal Warrior",
    "Dark Cultist",
    "Shadow Beast",
    "Cursed Knight",
    "Blood Wraith"
  ];
  
  // Elite chance increases with floor level
  const eliteChance = Math.min(0.15 + floor * 0.01, 0.3);
  const isElite = Math.random() < eliteChance;
  
  if (floor % 5 === 0) {
    return {
      name: "Floor Guardian",
      hp: baseHp * 2,
      maxHp: baseHp * 2,
      trait: "Boss"
    };
  }
  
  const name = names[Math.floor(Math.random() * names.length)];
  const enemy: Enemy = {
    name,
    hp: isElite ? baseHp * 1.5 : baseHp,
    maxHp: isElite ? baseHp * 1.5 : baseHp
  };
  
  if (isElite) {
    enemy.trait = "Elite";
  }
  
  return enemy;
};