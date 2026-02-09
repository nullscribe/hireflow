import { jobsApi } from "@/lib/apiService";
import type { CountryGroup } from "@hireflow/types";
import { useEffect, useState } from "react";

export default function useCountries() {
  const [data, setData] = useState<CountryGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function run() {
      setLoading(true);
      setError(null);

      try {
        const res = await jobsApi.getCountries();

        setData(res.data.countries);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    run();
  }, []);

  return {
    data,
    loading,
    error,
  };
}
