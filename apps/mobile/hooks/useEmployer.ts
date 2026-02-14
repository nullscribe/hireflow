import { employersApi } from "@/lib/apiService";
import type { EmployerDetailResponse } from "@hireflow/types";
import { useEffect, useState } from "react";

export default function useEmployer(id: number) {
  const [data, setData] = useState<EmployerDetailResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function run() {
      setLoading(true);
      setError(null);

      try {
        const res = await employersApi.getById(id);

        setData(res.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    run();
  }, [id]);

  return { data, loading, error };
}
