import { useQuery } from "@apollo/client";
import { JobQuery } from "../lib/graphql/queries";

const useJob = (jobId) => {
  const { loading, error, data } = useQuery(JobQuery, {
    variables: { id: jobId },
  });
  return { job: data?.job, loading, isError: !!error, error };
};

export default useJob;
