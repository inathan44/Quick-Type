import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

type TestType = 'words' | 'time';
type Language = 'english' | 'html' | 'javascript';

export interface Stat {
  timeElapsed: number; //
  totalKeysPressed: number; //
  incorrectKeys: number; //
  wpm: number; //
  raw: number;
  accuracy: number; //
  testType: TestType; //
  language: Language; //
}

interface InitStatState {
  timeElapsed: number;
  timerActive: boolean;
  totalKeysPressed: number;
  incorrectKeys: number;
  previousStats: Stat[];
}

const initialState: InitStatState = {
  timeElapsed: 0,
  timerActive: false,
  totalKeysPressed: 0,
  incorrectKeys: 0,
  previousStats: [],
};

const StatSlice = createSlice({
  name: 'statSlice',
  initialState,
  reducers: {
    toggleTimerActive(state, action: PayloadAction<boolean>): void {
      state.timerActive = action.payload;
    },
    adjustTime(state, action: PayloadAction<number>): void {
      state.timeElapsed = +action.payload.toFixed(2);
    },
    incrementKeysPressed(state) {
      state.totalKeysPressed++;
    },
    resetStats(state) {
      state.totalKeysPressed = 0;
      state.timerActive = false;
      state.timeElapsed = 0;
      state.incorrectKeys = 0;
    },
    incrementIncorrectKeys(state) {
      state.incorrectKeys++;
    },
    addScore(state, action: PayloadAction<Stat>) {
      state.previousStats.push(action.payload);
    },
  },
});

export const {
  toggleTimerActive,
  adjustTime,
  incrementKeysPressed,
  resetStats,
  incrementIncorrectKeys,
  addScore,
} = StatSlice.actions;

export const selectTimeElapsed = (state: RootState) =>
  state.statSlice.timeElapsed;
export const selectTimerActive = (state: RootState) =>
  state.statSlice.timerActive;
export const selectTotalKeysPressed = (state: RootState) =>
  state.statSlice.totalKeysPressed;
export const selectIncorrectKeys = (state: RootState) =>
  state.statSlice.incorrectKeys;

export default StatSlice.reducer;
