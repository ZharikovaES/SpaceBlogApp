import { configureStore } from '@reduxjs/toolkit';
import apodReducer from './apodSlice';
import { createWrapper } from 'next-redux-wrapper';

export const makeDateStore = () => {
  return configureStore({
    reducer: {
      apod: apodReducer
    }
  });
}

export const wrapper = createWrapper<AppStore>(makeDateStore);

export type AppStore = ReturnType<typeof makeDateStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']