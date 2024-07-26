import { useQuery } from "@apollo/client";
import { JobsQuery } from "../lib/graphql/queries";

const useJobs = () => {
  const { loading, error, data } = useQuery(JobsQuery, {
    fetchPolicy: "network-only",
  });
  return { jobs: data?.jobs, loading, isError: !!error, error };
};

export default useJobs;
