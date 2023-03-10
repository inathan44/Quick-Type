import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { Root } from 'react-dom/client';
import { RootState } from '..';

interface KeyLogic {
  currentWordNumber: number;
  userInputWordLength: number;
  quoteWordLength: number;
  quoteWord: string;
  userTypedWord: string;
  reassignWord: string;
  splitQuote: string[];
}

interface InitTypeInputState {
  duplicateQuoteToType: string;
  quoteToType: string;
  userTextInput: string;
  excessQuoteToType: string;
  testComplete: boolean;
  lettersAvailable: string;
}

const initialState: InitTypeInputState = {
  // Quote to be typed that won't changed, used to compare to typed quote
  duplicateQuoteToType: '<p>Hello world</p> <h1>I am the best</h1>',
  // Shows the quote and fills in excess letters and colors based on user input
  quoteToType: '<p>Hello world</p> <h1>I am the best</h1>',
  // Users input, what was typed
  userTextInput: '',
  // Used for finding excess letters and dealing with rogue spaces
  excessQuoteToType: '',

  testComplete: false,
  // The letters available to be typed, only these will show up on screen
  lettersAvailable:
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ .,<>/123456789',
};

const typeInputSlice = createSlice({
  name: 'typeInput',
  initialState,
  reducers: {
    setTestComplete(state: InitTypeInputState, action: PayloadAction<boolean>) {
      state.testComplete = action.payload;
    },
    setQuoteToType(state: InitTypeInputState, action: PayloadAction<string>) {
      state.quoteToType = action.payload;
    },
    setExcessQuoteToType(
      state: InitTypeInputState,
      action: PayloadAction<string>
    ) {
      state.excessQuoteToType = action.payload;
    },
    setDuplicateQuoteToType(
      state: InitTypeInputState,
      action: PayloadAction<string>
    ) {
      state.duplicateQuoteToType = action.payload;
    },
    setUserTextInput(state: InitTypeInputState, action: PayloadAction<string>) {
      state.userTextInput = action.payload;
    },
  },
});

export const {
  setTestComplete,
  setQuoteToType,
  setExcessQuoteToType,
  setDuplicateQuoteToType,
  setUserTextInput,
} = typeInputSlice.actions;

export const selectTestComplete = (state: RootState) =>
  state.typeInput.testComplete;
export const selectQuoteToType = (state: RootState) =>
  state.typeInput.quoteToType;
export const selectLettersAvailable = (state: RootState) =>
  state.typeInput.lettersAvailable;
export const selectExcessQuoteToType = (state: RootState) =>
  state.typeInput.excessQuoteToType;
export const selectUserTextInput = (state: RootState) =>
  state.typeInput.userTextInput;
export const selectDuplicateQuoteToType = (state: RootState) =>
  state.typeInput.duplicateQuoteToType;

export default typeInputSlice.reducer;
