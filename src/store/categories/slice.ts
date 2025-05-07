import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { CategoriesStateType } from 'interfaces';
import { getCategories } from './thunks';

const initialState: CategoriesStateType = {
  loading: false,
  data: null,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearCategoriesState: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(getCategories.pending, state => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.error = null;
        state.data = action.payload;
      })
      .addMatcher(
        isAnyOf(getCategories.fulfilled, getCategories.rejected),
        state => {
          state.loading = false;
        },
      );
  },
});

export const { clearCategoriesState } = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;
