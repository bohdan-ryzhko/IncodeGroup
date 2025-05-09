import { useCallback, useState } from 'react';

type UseMutationParams<T, A> = {
  mutationFn: (args: A) => Promise<T>;
  onSuccess?: (data: T) => Promise<void>;
  onError?: (error: unknown) => void;
};

export const useMutation = <T, A = void>({
  mutationFn,
  onSuccess,
  onError,
}: UseMutationParams<T, A>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);

  const mutation = useCallback(
    async (args: A) => {
      setIsLoading(true);

      try {
        const response = await mutationFn(args);
        setError(null);
        setData(response);
        onSuccess?.(response);
      } catch (err) {
        setError(err);
        onError?.(err);
      } finally {
        setIsLoading(false);
      }
    },
    [mutationFn, onError, onSuccess],
  );

  return { isLoading, data, error, mutation };
};
