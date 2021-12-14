import { useCallback, useEffect, useState } from "react";

type DefaultFetcher<Data extends any> = () => Promise<Data>;
export default function useFetchData<
  Data = any,
  Fetcher extends DefaultFetcher<Data> = DefaultFetcher<Data>
>(fetcher: Fetcher, shouldFetchImmediately: boolean = true) {
  const [data, setData] = useState<Data>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const fetchData = useCallback(() => {
    setLoading(true);
    setData(undefined);
    setError(undefined);

    return fetcher()
      .then((res) => {
        // TODO: isMounted
        setData(res);
        setLoading(false);
      })
      .catch((error: Error) => {
        setError(error);
        setLoading(false);
      });
  }, [fetcher, setError, setLoading]);

  useEffect(() => {
    if (!shouldFetchImmediately) return;
    fetchData();
  }, [fetchData, shouldFetchImmediately]);

  return {
    data,
    loading,
    error,
    fetchData,
  };
}
