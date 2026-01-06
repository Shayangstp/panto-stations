import { useCallback, useEffect, useRef, useState } from "react";
import { fetchStations } from "../api";
import type { FetchStatus, Station } from "../types";

export function useStations() {
  const [data, setData] = useState<Station[] | null>(null);
  const [status, setStatus] = useState<FetchStatus>("loading");
  const [error, setError] = useState<Error | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  const load = useCallback(async () => {
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    setStatus("loading");
    setError(null);

    try {
      const stations = await fetchStations(ctrl.signal);
      setData(stations);
      setStatus("success");
    } catch (e) {
      if ((e as any)?.name === "AbortError") return;
      setError(e as Error);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load();
    return () => abortRef.current?.abort();
  }, [load]);

  return {
    data,
    status,
    error,
    refetch: load,
  };
}
