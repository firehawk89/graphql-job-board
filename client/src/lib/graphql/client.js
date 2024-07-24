import { GraphQLClient } from "graphql-request";

const gqlClient = new GraphQLClient("http://localhost:9000/graphql");

export default gqlClient;
