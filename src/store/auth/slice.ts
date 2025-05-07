import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from 'interfaces';
import { login, logout, signUp } from './thunks';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

const initialState: AuthState = {
  creating: false,
  loading: false,
  loggingIn: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<FirebaseAuthTypes.User | null>) {
      state.user = action.payload;
    },
    clearAuthState: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(signUp.pending, state => {
        state.creating = true;
      })
      .addCase(login.pending, state => {
        state.loggingIn = true;
      })
      .addMatcher(isAnyOf(signUp.fulfilled, signUp.rejected), state => {
        state.creating = false;
      })
      .addMatcher(isAnyOf(login.fulfilled, login.rejected), state => {
        state.loggingIn = false;
      })
      .addMatcher(
        isAnyOf(signUp.fulfilled, login.fulfilled),
        (state, action) => {
          state.error = null;
          state.user = action.payload;
        },
      )
      .addMatcher(isAnyOf(signUp.rejected, login.rejected), (state, action) => {
        state.error = action.error;
      })
      .addMatcher(
        isAnyOf(logout.pending, logout.fulfilled, logout.rejected),
        () => initialState,
      );
  },
});

export const { setUser, clearAuthState } = authSlice.actions;

export const authReducer = authSlice.reducer;
