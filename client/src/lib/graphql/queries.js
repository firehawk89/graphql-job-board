import { gql } from "@apollo/client";
import { apolloClient } from "../apollo/client";
import { JobDetailFragment } from "./fragments";

export const JobQuery = gql`
  query Job($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
  ${JobDetailFragment}
`;

export const CompanyQuery = gql`
  query Company($id: ID!) {
    company(id: $id) {
      id
      name
      description
      jobs {
        id
        title
        date
      }
    }
  }
`;

export const getJobs = async () => {
  const query = gql`
    query Jobs {
      jobs {
        id
        title
        date
        company {
          id
          name
        }
      }
    }
  `;
  const { data } = await apolloClient.query({
    query,
    fetchPolicy: "network-only",
  });
  return data.jobs;
};

export const getJob = async (jobId) => {
  const variables = { id: jobId };
  const { data } = await apolloClient.query({ query: JobQuery, variables });
  return data.job;
};
