import { useMutation } from "@apollo/client";
import { CreateJobMutation } from "../lib/graphql/mutations";
import { JobQuery } from "../lib/graphql/queries";

const useCreateJob = () => {
  const [mutate, { loading, error }] = useMutation(CreateJobMutation);

  const createJob = async ({ title, description }) => {
    const { data } = await mutate({
      variables: {
        input: { title, description },
      },
      update: (cache, { data }) => {
        cache.writeQuery({
          query: JobQuery,
          variables: { id: data.job.id },
          data,
        });
      },
    });
    return data?.job;
  };

  return { createJob, loading, isError: !!error, error };
};

export default useCreateJob;
