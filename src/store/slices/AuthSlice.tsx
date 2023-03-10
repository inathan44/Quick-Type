import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  logged: boolean;
  loading: boolean;
};
const initialState: InitialState = {
  logged: false,
  loading: false,
};

export const loggedIn = createAsyncThunk(
  'Checked if logged in',
  (x, { rejectWithValue }) => {}
);

export const logInUser = createAsyncThunk(
  'Login User',
  (x, { rejectWithValue }) => {}
);

const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logInUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(logInUser.fulfilled, (state, action) => {
      state.loading = false;
      state.logged = true;
    });
    builder.addCase(logInUser.rejected, (state, action) => {
      state.loading = false;
      state.logged = false;
    });
  },
});

export const {} = AuthSlice.actions;

export default AuthSlice.reducer;
