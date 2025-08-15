export type Challenge = {
  id: string;
  text: string;
  emoji: string;
};

export const CHALLENGES: Challenge[] = [
  { id: "1", text: "Do 20 jumping jacks and a 30s plank!", emoji: "💪" },
  { id: "2", text: "Take a brisk 10-minute walk and stretch calves.", emoji: "🚶‍♂️" },
  { id: "3", text: "10 squats, 10 push-ups, 10 lunges each side.", emoji: "🏋️" },
  { id: "4", text: "Breathe deeply for 2 minutes and drink water.", emoji: "💧" },
  { id: "5", text: "30s wall sit and 15-second side planks.", emoji: "🧱" },
];

export const CHALLENGE_COUNT = CHALLENGES.length;

export function getRandomChallenge(excludeIds?: Set<string>): Challenge {
  const pool = excludeIds
    ? CHALLENGES.filter((c) => !excludeIds.has(c.id))
    : CHALLENGES;
  const workingPool = pool.length > 0 ? pool : CHALLENGES;
  const index = Math.floor(Math.random() * workingPool.length);
  return workingPool[index];
}

// Backwards-compatible simple random getter (no uniqueness guarantees)
export function getChallenge(): Challenge {
  return getRandomChallenge();
}


