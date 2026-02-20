import { candidateApi } from "@/lib/apiService";
import type { CandidateProfileResponse } from "@hireflow/types";
import { useEffect, useState } from "react";

export default function useProfile() {
  const [data, setData] = useState<CandidateProfileResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function run() {
      setLoading(true);
      setError(null);

      try {
        const res = await candidateApi.getProfile();

        setData(res.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    run();
  }, []);

  return { data, loading, error };
}
