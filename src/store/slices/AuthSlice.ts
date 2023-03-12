import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface InitialState {
  logged: boolean;
  loading: boolean;
  token: string | undefined;
  data: object;
  error: unknown | string;
}
interface loggedInInfoInt {
  username: string;
  password: string;
}
const initialState: InitialState = {
  logged: false,
  loading: false,
  token: '',
  data: {},
  error: '',
};

export const logInUser = createAsyncThunk(
  'LoginUser',
  async ({ username, password }: loggedInInfoInt, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('http://localhost:3030/api/login', {
        username: username,
        password: password,
      });
      localStorage.setItem('token', data);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const authorizeToken = createAsyncThunk(
  'AuthorizeToeken',
  async (x, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return {};
      const { data } = await axios.get('http://localhost:3030/api/auth', {
        headers: {
          token: token,
        },
      });
      return { data, token };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
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
    builder.addCase(logInUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.logged = true;
      state.token = payload;
    });
    builder.addCase(logInUser.rejected, (state, action) => {
      state.loading = false;
      state.logged = false;
      state.token = '';
      state.error = action.error.message;
    });
    builder.addCase(authorizeToken.pending, (state, { payload }) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(authorizeToken.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload.data;
      state.token = '';
      state.error = '';
    });
    builder.addCase(authorizeToken.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const {} = AuthSlice.actions;

export default AuthSlice.reducer;
