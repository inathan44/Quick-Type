import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface InitialState {
  logged: boolean;
  loading: boolean;
  token: string;
  error: string;
}
interface loggedInInfoInt {
  username: string;
  password: string;
}
const initialState: InitialState = {
  logged: false,
  loading: false,
  token: '',
  error: '',
};

export const loggedIn = createAsyncThunk(
  'Check if logged',
  async ({ username, password }: loggedInInfoInt, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('http://localhost:3030/api/login', {
        username: username,
        password: password,
      });
      localStorage.setItem('login', data);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
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
      state.error = '';
    });
    builder.addCase(logInUser.fulfilled, (state, action) => {
      state.loading = false;
      state.logged = true;
      state.token = action.payload;
    });
    builder.addCase(logInUser.rejected, (state, action) => {
      state.loading = false;
      state.logged = false;
    });
  },
});

export const {} = AuthSlice.actions;

export default AuthSlice.reducer;
