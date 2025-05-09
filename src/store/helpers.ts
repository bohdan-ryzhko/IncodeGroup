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

type Options = {
  showNotification?: boolean;
};

export const ThunkWrapper = <T, U = void>(
  typePrefix: string,
  callback: (arg: U, thunkAPI: GetThunkAPI<AsyncThunkConfig>) => Promise<T>,
  options?: Options,
) => {
  return createAsyncThunk<T, U>(typePrefix, async (arg, thunkAPI) => {
    const { showNotification = true } = options || {};
    try {
      const response = await callback(arg, thunkAPI);

      return response;
    } catch (error: any) {
      console.log(error);
      if (showNotification) {
        Alert.alert(
          error.nativeErrorMessage || error.messages || 'Something went wrong',
        );
      }
      return thunkAPI.rejectWithValue(error);
    }
  });
};
