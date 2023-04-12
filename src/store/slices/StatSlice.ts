import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import axios from 'axios';
import { Action } from '@remix-run/router';
import { Root } from 'react-dom/client';
import { Mode } from '../../components/OptionsMenu';

type TestType = 'words' | 'time';
type Language = 'English' | 'HTML' | 'JavaScript';

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
  startingTime: number;
  countdownTimer: number;
  useCountdown: boolean;
  language: Language;
  lastTest?: Stat;
  wpm: number;
  accuracy: number;
  skippedCharacters: number;
  raw: number;
  score: ScoreTracker[];
}

export interface ScoreTracker {
  errors: number;
  wpm: number;
  raw: number;
  time: number;
}

const initialState: InitStatState = {
  timeElapsed: 0,
  timerActive: false,
  totalKeysPressed: 0,
  incorrectKeys: 0,
  countdownTimer: 15,
  startingTime: 15,
  useCountdown: true,
  language: 'English',
  wpm: 0,
  accuracy: 0,
  skippedCharacters: 0,
  raw: 0,
  score: [{ errors: 0, wpm: 0, raw: 0, time: 0 }],
  lastTest: {
    accuracy: 0,
    wpm: 0,
    raw: 0,
    testType: 'time',
    language: 'English',
    timeElapsed: 0,
    totalKeysPressed: 0,
    incorrectKeys: 0,
  },
};

export const addNewScore = createAsyncThunk(
  'stat/addOne',
  async (body: Stat, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `https://quick-type-1tb5.onrender.com/api/score`,
        body
      );
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
      state.skippedCharacters = 0;
      state.countdownTimer = state.startingTime;
      state.lastTest = undefined;
      state.wpm = 0;
      state.score = [{ errors: 0, wpm: 0, raw: 0, time: 0 }];
    },
    incrementIncorrectKeys(state, action: PayloadAction<number>) {
      state.incorrectKeys += action.payload;
    },
    incrementSkippedCharacters(state, action: PayloadAction<number>) {
      state.skippedCharacters += action.payload;
    },
    setTestTime(state, action: PayloadAction<number>) {
      state.countdownTimer = action.payload;
      state.startingTime = action.payload;
    },
    changeTestLangauge(state, action: PayloadAction<Language>) {
      state.language = action.payload;
    },
    changeMode(state, action: PayloadAction<Mode>) {
      // Switch between typing # of words and typing until time runs out
      if (action.payload === 'Time') {
        state.useCountdown = true;
      } else if (action.payload === 'Words') {
        state.useCountdown = false;
      }
    },
    adjustWpm(state, action: PayloadAction<number>) {
      state.wpm = action.payload;
    },
    adjustAccuracy(state, action: PayloadAction<number>) {
      state.accuracy = action.payload;
    },
    adjustRaw(state: InitStatState, action: PayloadAction<number>) {
      state.raw = action.payload;
    },
    pushScore(state: InitStatState, action: PayloadAction<ScoreTracker>) {
      state.score.push(action.payload);
    },
    setLastTast(state: InitStatState, action: PayloadAction<Stat>) {
      state.lastTest = action.payload;
    },
    setIncorrectKeys(state: InitStatState, action: PayloadAction<number>) {
      state.incorrectKeys = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewScore.fulfilled, (state, action) => {
        state.lastTest = action.payload;
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
  adjustCountdown,
  changeMode,
  setTestTime,
  changeTestLangauge,
  adjustWpm,
  adjustAccuracy,
  adjustRaw,
  pushScore,
  setLastTast,
  setIncorrectKeys,
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
export const selectLanguage = (state: RootState) => state.statSlice.language;
export const selectWpm = (state: RootState) => state.statSlice.wpm;
export const selectAccuracy = (state: RootState) => state.statSlice.accuracy;
export const selectLastTest = (state: RootState) => state.statSlice.lastTest;
export const selectCurrentScores = (state: RootState) => state.statSlice.score;
export default StatSlice.reducer;
