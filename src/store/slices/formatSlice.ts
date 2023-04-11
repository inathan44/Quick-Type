import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface formatInitState {
  translate: number;
}

const initialState: formatInitState = {
  translate: 0,
};

const formatSlice = createSlice({
  name: 'format',
  initialState,
  reducers: {
    resetFormatState(state: formatInitState) {
      state.translate = 0;
    },
    adjustTranslate(state: formatInitState, action: PayloadAction<number>) {
      state.translate = action.payload;
    },
  },
});

export const { resetFormatState, adjustTranslate } = formatSlice.actions;

export default formatSlice.reducer;
