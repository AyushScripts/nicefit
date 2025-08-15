export type Challenge = {
  id: string;
  text: string;
  emoji: string;
};

const CHALLENGES: Challenge[] = [
  { id: "1", text: "Do 20 jumping jacks and a 30s plank!", emoji: "💪" },
  { id: "2", text: "Take a brisk 10-minute walk and stretch calves.", emoji: "🚶‍♂️" },
  { id: "3", text: "10 squats, 10 push-ups, 10 lunges each side.", emoji: "🏋️" },
  { id: "4", text: "Breathe deeply for 2 minutes and drink water.", emoji: "💧" },
  { id: "5", text: "30s wall sit and 15-second side planks.", emoji: "🧱" },
];

export function getChallenge(): Challenge {
  const index = Math.floor(Math.random() * CHALLENGES.length);
  return CHALLENGES[index];
}


