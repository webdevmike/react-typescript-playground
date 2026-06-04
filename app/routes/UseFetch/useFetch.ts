import { useState, useEffect, useCallback } from "react";

type UseFetchReturn<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export default function useFetch<T>(
  url: string,
  signal?: AbortSignal,
): UseFetchReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch(url, { signal });

      if (!response.ok) {
        throw new Error("Response not ok");
      }

      // In a real app, validate the response shape against T at runtime
      const result: T = await response.json();

      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
}
