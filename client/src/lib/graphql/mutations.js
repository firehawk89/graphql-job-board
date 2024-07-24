import { gql } from "graphql-request";
import gqlClient from "./client";

export const createJob = async ({ title, description }) => {
  const mutation = gql`
    mutation CreateJob($input: CreateJobInput!) {
      job: createJob(input: $input) {
        id
      }
    }
  `;
  const { job } = await gqlClient.request(mutation, {
    input: { title, description },
  });
  return job;
};
