import { gql } from "graphql-request";
import gqlClient from "./client";

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
  const { jobs } = await gqlClient.request(query);
  return jobs;
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
  const { job } = await gqlClient.request(query, variables);
  return job;
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
  const { company } = await gqlClient.request(query, variables);
  return company;
};
