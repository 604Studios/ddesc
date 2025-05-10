// player.ts
export interface Player {
  inventory: Record<string, number>;

  name: string;
  level: number;
  xp: number;
  xpToNext: number;
  hp: number;
  maxHp: number;
  baseMaxHp: number;
  damage: number;
  souls: number;
  // Mining
  miningXP: number;
  miningLevel: number;
  miningXPToNext: number;
}

export const createPlayer = (): Player => ({
  inventory: {},
  name: 'Wanderer',
  level: 1,
  xp: 0,
  xpToNext: 100,
  hp: 100,
  maxHp: 100,
  baseMaxHp: 100,
  damage: 10,
  souls: 0,
  miningXP: 0,
  miningLevel: 1,
  miningXPToNext: 50,
});

export const gainXP = (player: Player, amount: number): Player => {
  let { xp, level, xpToNext } = player;
  xp += amount;
  while (xp >= xpToNext) {
    xp -= xpToNext;
    level++;
    xpToNext = Math.floor(xpToNext * 1.25);
  }
  return { ...player, xp, level, xpToNext };
};

export const addMiningXP = (player: Player, amount: number): Player => {
  let { miningXP, miningLevel, miningXPToNext } = player;
  miningXP += amount;
  while (miningXP >= miningXPToNext) {
    miningXP -= miningXPToNext;
    miningLevel++;
    miningXPToNext = Math.floor(miningXPToNext * 1.25);
  }
  return { ...player, miningXP, miningLevel, miningXPToNext };
};

export const addToInventory = (player: Player, item: string, amount: number): Player => {
  const inventory = { ...player.inventory };
  inventory[item] = (inventory[item] || 0) + amount;
  return { ...player, inventory };
};
