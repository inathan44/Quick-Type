import { configureStore } from '@reduxjs/toolkit';
import TypeInputSlice from './slices/TypeInputSlice';

const store = configureStore({
  reducer: { typeInput: TypeInputSlice },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
