import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

interface InitStatState {
  timeElapsed: number;
  timerActive: boolean;
  totalKeysPressed: number;
  incorrectKeys: number;
}

const initialState: InitStatState = {
  timeElapsed: 0,
  timerActive: false,
  totalKeysPressed: 0,
  incorrectKeys: 0,
};

const StatSlice = createSlice({
  name: 'statSlice',
  initialState,
  reducers: {
    toggleTimerActive(state, action: PayloadAction<boolean>): void {
      state.timerActive = action.payload;
    },
    adjustTime(state, action: PayloadAction<number>): void {
      state.timeElapsed = action.payload;
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
  },
});

export const {
  toggleTimerActive,
  adjustTime,
  incrementKeysPressed,
  resetStats,
  incrementIncorrectKeys,
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
