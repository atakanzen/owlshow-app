import { Player } from '@/types/player';
import {
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '../store';

interface PlayerState {
  players: Player[];
}

const initialState = (): PlayerState => ({
  players: [],
});

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    resetPlayers: initialState,
    setPlayers: (
      state,
      action: PayloadAction<Player[]>
    ) => {
      state.players = action.payload;
    },
    setIsCurrent: (
      state,
      action: PayloadAction<string>
    ) => {
      state.players.map((p) => {
        if (p.name === action.payload) {
          p.isCurrent = true;
        } else {
          p.isCurrent = false;
        }
        return p;
      });
    },
    setScore: (
      state,
      action: PayloadAction<{
        playerName: string;
        score: number;
      }>
    ) => {
      const { playerName, score } = action.payload;
      state.players.map((p) => {
        if (p.name === playerName) {
          p.score = score;
        }
        return p;
      });
    },
  },
});

export const selectPlayers = (state: RootState) =>
  state.players.players;

export default playersSlice.reducer;
