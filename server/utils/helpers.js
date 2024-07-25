import { GraphQLError } from "graphql";

export const formatISODate = (isoDate) => isoDate.split("T")[0];

export const throwNotFound = (message) => {
  throw new GraphQLError(message, {
    extensions: { code: "NOT_FOUND" },
  });
};

export const throwUnauthorizedError = (message) => {
	throw new GraphQLError(message, {
	  extensions: { code: "UNAUTHORIZED" },
	});
  };
