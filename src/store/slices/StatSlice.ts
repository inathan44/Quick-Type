import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

interface InitStatState {
  timeElapsed: number;
  timerActive: boolean;
}

const initialState: InitStatState = {
  timeElapsed: 0,
  timerActive: false,
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
  },
});

export const { toggleTimerActive, adjustTime } = StatSlice.actions;

export const selectTimeElapsed = (state: RootState) =>
  state.statSlice.timeElapsed;
export const selectTimerActive = (state: RootState) =>
  state.statSlice.timerActive;

export default StatSlice.reducer;
