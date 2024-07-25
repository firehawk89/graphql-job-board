import { GraphQLClient } from "graphql-request";
import { getAccessToken } from "../auth";

const gqlClient = new GraphQLClient("http://localhost:9000/graphql", {
  headers: () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      return {};
    }
    return {
      Authorization: `Bearer ${accessToken}`,
    };
  },
});

export default gqlClient;
