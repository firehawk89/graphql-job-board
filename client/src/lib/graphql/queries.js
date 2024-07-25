import { gql } from "@apollo/client";
import { apolloClient } from "../apollo/client";

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
  const { data } = await apolloClient.query({ query });
  return data.jobs;
};

export const getJob = async (jobId) => {
  const query = gql`
    query Job($id: ID!) {
      job(id: $id) {
        id
        title
        description
        date
        company {
          id
          name
        }
      }
    }
  `;
  const variables = { id: jobId };
  const { data } = await apolloClient.query({ query, variables });
  return data.job;
};

export const getCompany = async (companyId) => {
  const query = gql`
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
  const variables = { id: companyId };
  const { data } = await apolloClient.query({ query, variables });
  return data.company;
};
