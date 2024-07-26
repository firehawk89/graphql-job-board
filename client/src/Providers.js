import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./lib/apollo/client";

function Providers({ children }) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}

export default Providers;
