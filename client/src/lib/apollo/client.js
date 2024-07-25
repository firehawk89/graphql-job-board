import { ApolloClient, InMemoryCache } from "@apollo/client";
import { API_URL } from "../../utils/constants";

export const apolloClient = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});