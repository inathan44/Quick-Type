import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { Root } from 'react-dom/client';
import axios from 'axios';
import { RootState } from '..';
import { allWordsList, generateTest } from '../../helperFunctions';

export interface QuoteFormat {
  text: string;
  author: string;
}

interface KeyLogic {
  currentWordNumber: number;
  userInputWordLength: number;
  quoteWordLength: number;
  quoteWord: string;
  userTypedWord: string;
  reassignWord: string;
  splitQuote: string[];
}

export interface InitTypeInputState {
  duplicateQuoteToType: string;
  quoteToType: string;
  userTextInput: string;
  excessQuoteToType: string;
  testComplete: boolean;
  lettersAvailable: string;
  allQuotes: QuoteFormat[];
  loading: boolean;
  error: string;
  wordList: string[];
  numOfWordsToType: number;
}

const initialState: InitTypeInputState = {
  // Quote to be typed that won't changed, used to compare to typed quote
  duplicateQuoteToType: '',
  // Shows the quote and fills in excess letters and colors based on user input
  quoteToType: '',
  // Users input, what was typed
  userTextInput: '',
  // Used for finding excess letters and dealing with rogue spaces
  excessQuoteToType: '',

  testComplete: false,
  // The letters available to be typed, only these will show up on screen
  lettersAvailable:
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ .,<>/123456789-_';:?!=`{}()[]",
  // Array of objects that hold quotes
  allQuotes: [],
  loading: false,
  error: '',
  wordList: allWordsList,
  numOfWordsToType: 20,
};

export const fetchAllQuotes = createAsyncThunk(
  'typeInput/fetchAllQuotes',
  async (x, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('https://type.fit/api/quotes');
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

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
    resetUserInput(state: InitTypeInputState) {
      state.userTextInput = '';
      state.excessQuoteToType = '';
      state.quoteToType = state.duplicateQuoteToType;
    },
    setTestWords(state, action: PayloadAction<number>) {
      state.numOfWordsToType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllQuotes.fulfilled, (state, action) => {
        state.allQuotes = action.payload;
        state.loading = false;
        state.error = '';
      })
      .addCase(fetchAllQuotes.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllQuotes.rejected, (state, action) => {
        state.error = action.error.message || 'Error when fetching quotes';
        state.loading = false;
      });
  },
});

export const {
  setTestComplete,
  setQuoteToType,
  setExcessQuoteToType,
  setDuplicateQuoteToType,
  setUserTextInput,
  resetUserInput,
  setTestWords,
} = typeInputSlice.actions;

export const selectNumOfWordsToType = (state: RootState) =>
  state.typeInput.numOfWordsToType;
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
export const selectAllQuotes = (state: RootState) => state.typeInput.allQuotes;
export const selectRandomWords = (state: RootState) => {
  return generateTest(state);
};

export default typeInputSlice.reducer;
