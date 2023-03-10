import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './slices/AuthSlice';
import StatSlice from './slices/StatSlice';
import TypeInputSlice from './slices/TypeInputSlice';

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    typeInput: TypeInputSlice,
    statSlice: StatSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
