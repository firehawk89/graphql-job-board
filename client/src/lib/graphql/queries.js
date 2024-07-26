import { gql } from "@apollo/client";
import { JobDetailFragment } from "./fragments";

export const JobsQuery = gql`
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
