import { ApolloClient, InMemoryCache } from "@apollo/client";
import links from "./links";

export const apolloClient = new ApolloClient({
  link: links,
  cache: new InMemoryCache(),
});
