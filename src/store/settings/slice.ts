import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { SettingsStateType } from 'interfaces';
import { getAllSettings, initializeSettings, updateSettings } from './thunks';

const initialState: SettingsStateType = {
  loading: false,
  updating: false,
  data: null,
  error: null,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    clearSettingsState: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(updateSettings.pending, state => {
        state.updating = true;
      })
      .addMatcher(
        isAnyOf(updateSettings.fulfilled, updateSettings.rejected),
        state => {
          state.updating = false;
        },
      )
      .addMatcher(
        isAnyOf(getAllSettings.pending, initializeSettings.pending),
        state => {
          state.loading = true;
        },
      )
      .addMatcher(
        isAnyOf(
          getAllSettings.fulfilled,
          getAllSettings.rejected,
          initializeSettings.fulfilled,
          initializeSettings.rejected,
        ),
        state => {
          state.loading = false;
        },
      )
      .addMatcher(
        isAnyOf(
          initializeSettings.fulfilled,
          getAllSettings.fulfilled,
          updateSettings.fulfilled,
        ),
        (state, action) => {
          state.error = null;
          state.data = action.payload;
        },
      )
      .addMatcher(
        isAnyOf(
          initializeSettings.rejected,
          getAllSettings.rejected,
          updateSettings.rejected,
        ),
        (state, action) => {
          state.error = action.error;
        },
      );
  },
});

export const { clearSettingsState } = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;
