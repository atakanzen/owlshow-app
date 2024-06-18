import { Player } from '@/types/player';

export const generatePlayers = (
  numberOfPlayers: number
): Player[] => {
  return Array.from(new Array(numberOfPlayers)).map(
    (_, i) => ({
      isCurrent: false,
      name: `Player ${i + 1}`,
      score: 0,
    })
  );
};
