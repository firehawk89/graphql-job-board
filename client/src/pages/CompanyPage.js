import { useParams } from "react-router";
import { getCompany } from "../lib/graphql/queries";
import { useEffect, useState } from "react";

function CompanyPage() {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    getCompany(companyId).then(setCompany);
  }, [companyId]);

  if (!company) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="title">{company?.name}</h1>
      <div className="box">{company?.description}</div>
    </div>
  );
}

export default CompanyPage;
