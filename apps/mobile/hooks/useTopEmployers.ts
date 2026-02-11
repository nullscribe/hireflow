import { employersApi } from "@/lib/apiService";
import type { EmployerJobCount } from "@hireflow/types";
import { useEffect, useState } from "react";

export default function useTopEmployers() {
  const [data, setData] = useState<EmployerJobCount[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function run() {
      setLoading(true);
      setError(null);

      try {
        const res = await employersApi.getTop();

        setData(res.data.employers);
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
