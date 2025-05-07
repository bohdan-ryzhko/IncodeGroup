import { createAsyncThunk, GetThunkAPI } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import { RootState } from './store';

type AsyncThunkConfig = {
  getState: () => RootState;
  extra: unknown;
  requestId: string;
  signal: AbortSignal;
  abort: (reason?: string) => void;
  rejectWithValue: (value: unknown) => unknown;
  fulfillWithValue: <FulfilledValue>(value: FulfilledValue) => FulfilledValue;
};

export const ThunkWrapper = <T, U = void>(
  typePrefix: string,
  callback: (arg: U, thunkAPI: GetThunkAPI<AsyncThunkConfig>) => Promise<T>,
) => {
  return createAsyncThunk<T, U>(typePrefix, async (arg, thunkAPI) => {
    try {
      const response = await callback(arg, thunkAPI);

      return response;
    } catch (error: any) {
      Alert.alert(
        error.nativeErrorMessage || error.messages || 'Something went wrong',
      );
      return thunkAPI.rejectWithValue(error);
    }
  });
};
