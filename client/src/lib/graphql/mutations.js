import { gql } from "@apollo/client";
import { apolloClient } from "../apollo/client";
import { JobQuery } from "./queries";
import { JobDetailFragment } from "./fragments";

export const createJob = async ({ title, description }) => {
  const mutation = gql`
    mutation CreateJob($input: CreateJobInput!) {
      job: createJob(input: $input) {
        ...JobDetail
      }
    }
    ${JobDetailFragment}
  `;
  const { data } = await apolloClient.mutate({
    mutation,
    variables: { input: { title, description } },
    update: (cache, { data }) => {
      cache.writeQuery({
        query: JobQuery,
        variables: { id: data.job.id },
        data,
      });
    },
  });
  return data.job;
};
