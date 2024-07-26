import { ApolloLink, concat, createHttpLink } from "@apollo/client";
import { API_URL } from "../../utils/constants";
import { getAccessToken } from "../auth";

export const httpLink = createHttpLink({ uri: API_URL });

export const authLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken();
  if (!!accessToken) {
    operation.setContext({
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }
  return forward(operation);
});

const links = concat(authLink, httpLink);

export default links;
