import { useParams } from "react-router";
import { getCompany } from "../lib/graphql/queries";
import { useEffect, useState } from "react";
import JobList from "../components/JobList";

function CompanyPage() {
  const { companyId } = useParams();
  const [companyState, setCompanyState] = useState({
    company: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    (async () => {
      try {
        const company = await getCompany(companyId);
        setCompanyState({ company, loading: false, error: null });
      } catch (error) {
        setCompanyState({
          company: null,
          loading: false,
          error,
        });
      }
    })();
  }, [companyId]);

  const { company, loading, error } = companyState;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="has-text-danger">Oops! An error occurred ☹️</p>;
  }

  return (
    <div>
      <h1 className="title">{company?.name}</h1>
      <div className="box">{company?.description}</div>
      <h2 className="title is-5">Jobs at {company?.name}:</h2>
      <JobList jobs={company?.jobs} />
    </div>
  );
}

export default CompanyPage;
