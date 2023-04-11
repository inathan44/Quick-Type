import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './slices/AuthSlice';
import StatSlice from './slices/StatSlice';
import TypeInputSlice from './slices/TypeInputSlice';
import formatSlice from './slices/formatSlice';

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    typeInput: TypeInputSlice,
    statSlice: StatSlice,
    format: formatSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
