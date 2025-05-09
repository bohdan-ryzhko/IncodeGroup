import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { ExpensesStateType } from 'interfaces';
import {
  createExpenses,
  deleteExpenses,
  getExpenses,
  updateExpenses,
} from './thunks';

const initialState: ExpensesStateType = {
  fetching: false,
  updating: false,
  creating: false,
  deleting: false,
  data: [],
  error: null,
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    clearExpensesState: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(createExpenses.pending, state => {
        state.creating = true;
      })
      .addCase(getExpenses.pending, state => {
        state.fetching = true;
      })
      .addCase(updateExpenses.pending, state => {
        state.updating = true;
      })
      .addCase(deleteExpenses.pending, state => {
        state.deleting = true;
      })
      .addCase(createExpenses.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(getExpenses.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(updateExpenses.fulfilled, (state, action) => {
        const updatedIndex = state.data.findIndex(
          ({ id }) => id === action.payload.id,
        );

        if (updatedIndex >= 0) {
          state.data.splice(updatedIndex, 1, action.payload);
        }
      })
      .addCase(deleteExpenses.fulfilled, (state, action) => {
        state.data = state.data.filter(({ id }) => id !== action.payload);
      })
      .addMatcher(
        isAnyOf(
          createExpenses.fulfilled,
          getExpenses.fulfilled,
          updateExpenses.fulfilled,
          deleteExpenses.fulfilled,
        ),
        state => {
          state.error = null;
        },
      )
      .addMatcher(
        isAnyOf(
          createExpenses.rejected,
          getExpenses.rejected,
          updateExpenses.rejected,
          deleteExpenses.rejected,
        ),
        (state, action) => {
          state.error = action.error;
        },
      )
      .addMatcher(
        isAnyOf(createExpenses.fulfilled, createExpenses.rejected),
        state => {
          state.creating = false;
        },
      )
      .addMatcher(
        isAnyOf(getExpenses.fulfilled, getExpenses.rejected),
        state => {
          state.fetching = false;
        },
      )
      .addMatcher(
        isAnyOf(updateExpenses.fulfilled, updateExpenses.rejected),
        state => {
          state.updating = false;
        },
      )
      .addMatcher(
        isAnyOf(deleteExpenses.fulfilled, deleteExpenses.rejected),
        state => {
          state.deleting = false;
        },
      );
  },
});

export const { clearExpensesState } = expensesSlice.actions;

export const expensesReducer = expensesSlice.reducer;
