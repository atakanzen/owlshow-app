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
    setNotCurrent: (
      state,
      action: PayloadAction<string>
    ) => {
      state.players.map((p) => {
        if (p.name === action.payload) {
          p.isCurrent = false;
        }
        return p;
      });
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

export const {
  resetPlayers,
  setIsCurrent,
  setPlayers,
  setScore,
  setNotCurrent,
} = playersSlice.actions;

export const selectPlayers = (state: RootState) =>
  state.players.players;

export const selectCurrentPlayer = (state: RootState) =>
  state.players.players.find((p) => p.isCurrent);

export default playersSlice.reducer;
