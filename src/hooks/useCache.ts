import { useEffect, useState } from "react";

type UseCacheResult<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

export function useCache<T>(
  key: string,
  fetchFunc: () => Promise<T>,
  validFor = 3600000 // 1 hour by default
): UseCacheResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const cachedData = localStorage.getItem(key);
      const now = Date.now();

      if (cachedData) {
        try {
          const parsed = JSON.parse(cachedData);
          const { timestamp, data: cached } = parsed;

          if (now - timestamp < validFor) {
            setData(cached);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.warn("Cache parsing failed:", e);
        }
      }

      try {
        const newData = await fetchFunc();
        setData(newData);
        localStorage.setItem(
          key,
          JSON.stringify({ timestamp: now, data: newData })
        );
      } catch (err) {
        setError(err as Error);
      }

      setLoading(false);
    };

    loadData();
  }, [key, fetchFunc, validFor]);

  return { data, loading, error };
}
