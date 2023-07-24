import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApiRequest<T>(
  requestFn: () => Promise<AxiosResponse<T>>
): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response: AxiosResponse<T> = await requestFn();
        setData(response.data);
      } catch (error) {
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [requestFn]);

  return { data, loading, error };
}
