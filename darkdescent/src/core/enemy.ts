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
  
  if (floor % 5 === 0) {
    return {
      name: "Floor Guardian",
      hp: baseHp * 2,
      maxHp: baseHp * 2
    };
  }
  
  return {
    name: names[Math.floor(Math.random() * names.length)],
    hp: baseHp,
    maxHp: baseHp
  };
};