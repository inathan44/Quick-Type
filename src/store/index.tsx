import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './slices/AuthSlice';
import TypeInputSlice from './slices/TypeInputSlice';

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    typeInput: TypeInputSlice
  },
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
