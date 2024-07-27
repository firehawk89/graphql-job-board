import { useQuery } from "@apollo/client";
import { JobsQuery } from "../lib/graphql/queries";

const useJobs = ({ limit, offset }) => {
  const { loading, error, data } = useQuery(JobsQuery, {
    variables: { limit, offset },
    fetchPolicy: "network-only",
  });
  return {
    jobs: data?.jobs?.items,
    totalCount: data?.jobs?.totalCount,
    loading,
    isError: !!error,
    error,
  };
};

export default useJobs;
