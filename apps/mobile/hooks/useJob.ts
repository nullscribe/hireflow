import { jobsApi } from "@/lib/apiService";
import type { JobResponse } from "@hireflow/types";
import { useEffect, useState } from "react";

export default function useJob(id: number) {
  const [data, setData] = useState<JobResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function run() {
      setLoading(true);
      setError(null);

      try {
        const res = await jobsApi.getById(id);

        setData(res.data.job);
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
