import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import axios from 'axios';
import { Action } from '@remix-run/router';
import { Root } from 'react-dom/client';

type TestType = 'words' | 'time';
type Language = 'english' | 'html' | 'javascript';

export interface Stat {
  timeElapsed: number;
  totalKeysPressed: number;
  incorrectKeys: number;
  wpm: number;
  raw: number;
  accuracy: number;
  testType: TestType;
  language: Language;
  userId?: number;
}

interface InitStatState {
  timeElapsed: number;
  timerActive: boolean;
  totalKeysPressed: number;
  incorrectKeys: number;
  previousStats: Stat[];
  startingTime: number;
  countdownTimer: number;
  useCountdown: boolean;
}

const initialState: InitStatState = {
  timeElapsed: 0,
  timerActive: false,
  totalKeysPressed: 0,
  incorrectKeys: 0,
  previousStats: [],
  countdownTimer: 5,
  startingTime: 15,
  useCountdown: false,
};

export const addNewScore = createAsyncThunk(
  'stat/addOne',
  async (body: Stat, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        'http://localhost:3030/api/score',
        body
      );
      // console.log('axios post score data', data);
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

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
    adjustCountdown(state, action: PayloadAction<number>): void {
      state.countdownTimer = +action.payload.toFixed(2);
    },
    incrementKeysPressed(state) {
      state.totalKeysPressed++;
    },
    resetStats(state) {
      state.totalKeysPressed = 0;
      state.timerActive = false;
      state.timeElapsed = 0;
      state.incorrectKeys = 0;
      state.countdownTimer = state.startingTime;
    },
    incrementIncorrectKeys(state) {
      state.incorrectKeys++;
    },
    addScore(state, action: PayloadAction<Stat>) {
      state.previousStats.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewScore.fulfilled, (state, action) => {
        state.previousStats.push(action.payload);
      })
      .addCase(addNewScore.rejected, (state, action) => {
        console.log(action.error.message);
      });
  },
});

export const {
  toggleTimerActive,
  adjustTime,
  incrementKeysPressed,
  resetStats,
  incrementIncorrectKeys,
  addScore,
  adjustCountdown,
} = StatSlice.actions;

export const selectTimeElapsed = (state: RootState) =>
  state.statSlice.timeElapsed;
export const selectTimerActive = (state: RootState) =>
  state.statSlice.timerActive;
export const selectTotalKeysPressed = (state: RootState) =>
  state.statSlice.totalKeysPressed;
export const selectIncorrectKeys = (state: RootState) =>
  state.statSlice.incorrectKeys;
export const selectCountdownTimer = (state: RootState) =>
  state.statSlice.countdownTimer;
export const selectUseCountdown = (state: RootState) =>
  state.statSlice.useCountdown;
export const selectStartingTime = (state: RootState) =>
  state.statSlice.startingTime;

export default StatSlice.reducer;
