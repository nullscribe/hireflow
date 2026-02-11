import { jobsApi } from "@/lib/apiService";
import type { CategoryGroup } from "@hireflow/types";
import { useEffect, useState } from "react";

export default function useCategories() {
  const [data, setData] = useState<CategoryGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function run() {
      setLoading(true);
      setError(null);

      try {
        const res = await jobsApi.getCategories();

        setData(res.data.categories);
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
