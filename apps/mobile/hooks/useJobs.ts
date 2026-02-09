import { jobsApi } from "@/lib/apiService";
import type { JobFilters, JobResponse } from "@hireflow/types";
import { useEffect, useState } from "react";

export default function useJobs(filters: JobFilters) {
  const [data, setData] = useState<JobResponse[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function run() {
      setLoading(true);
      setError(null);

      try {
        const res = await jobsApi.getAll(filters);

        setData(res.data.jobs);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    run();
  }, [JSON.stringify(filters)]);

  return { data, loading, error };
}
