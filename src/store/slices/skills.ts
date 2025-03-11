import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SkillService, Skill } from '@services/skills';

interface SkillsState {
  skills: Skill[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SkillsState = {
  skills: [],
  status: 'idle',
  error: null,
};

export const fetchSkills = createAsyncThunk('skills/fetchSkills', async () => {
  return await SkillService.getSkills();
});

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.skills = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load skills';
      });
  },
});

export default skillsSlice.reducer;
