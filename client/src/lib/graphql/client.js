import { GraphQLClient } from "graphql-request";
import { getAccessToken } from "../auth";
import { API_URL } from "../../utils/constants";

const gqlClient = new GraphQLClient(API_URL, {
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
