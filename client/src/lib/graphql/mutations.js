import { gql } from "@apollo/client";
import { JobDetailFragment } from "./fragments";

export const CreateJobMutation = gql`
  mutation CreateJob($input: CreateJobInput!) {
    job: createJob(input: $input) {
      ...JobDetail
    }
  }
  ${JobDetailFragment}
`;
