import { gql, GraphQLClient } from "graphql-request";

const client = new GraphQLClient("http://localhost:9000/graphql");

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
  const { jobs } = await client.request(query);
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
  const { job } = await client.request(query, variables);
  return job;
};
