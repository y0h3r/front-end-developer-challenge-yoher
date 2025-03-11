import { configureStore } from '@reduxjs/toolkit';
import skillsReducer from '@store/slices/skills';

export const store = configureStore({
  reducer: {
    skills: skillsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
