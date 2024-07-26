import { useQuery } from "@apollo/client";
import { CompanyQuery } from "../lib/graphql/queries";

const useCompany = (companyId) => {
  const { loading, error, data } = useQuery(CompanyQuery, {
    variables: { id: companyId },
  });
  return { company: data?.company, loading, isError: !!error };
};

export default useCompany;
