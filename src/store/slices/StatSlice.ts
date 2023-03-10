import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

interface InitStatState {
  timeElapsed: number;
  timerActive: boolean;
  totalKeysPressed: number;
}

const initialState: InitStatState = {
  timeElapsed: 0,
  timerActive: false,
  totalKeysPressed: 0,
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
    },
  },
});

export const { toggleTimerActive, adjustTime, incrementKeysPressed } =
  StatSlice.actions;

export const selectTimeElapsed = (state: RootState) =>
  state.statSlice.timeElapsed;
export const selectTimerActive = (state: RootState) =>
  state.statSlice.timerActive;
export const selectTotalKeysPressed = (state: RootState) =>
  state.statSlice.totalKeysPressed;

export default StatSlice.reducer;
