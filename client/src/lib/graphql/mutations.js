import { gql } from "@apollo/client";
import { apolloClient } from "../apollo/client";

export const createJob = async ({ title, description }) => {
  const mutation = gql`
    mutation CreateJob($input: CreateJobInput!) {
      job: createJob(input: $input) {
        id
      }
    }
  `;
  const { data } = await apolloClient.mutate({
    mutation,
    variables: { input: { title, description } },
  });
  return data.job;
};
