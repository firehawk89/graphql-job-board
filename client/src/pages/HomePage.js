import { useState } from "react";
import JobList from "../components/JobList";
import useJobs from "../hooks/useJobs";
import PaginationBar from "../components/PaginationBar";

const JOBS_PER_PAGE = 10;

function HomePage() {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * JOBS_PER_PAGE;

  const { jobs, totalCount, loading, isError } = useJobs({
    limit: JOBS_PER_PAGE,
    offset,
  });

  const totalPages = Math.ceil(totalCount / JOBS_PER_PAGE);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p className="has-text-danger">Oops! An error occurred ☹️</p>;
  }

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
      <PaginationBar
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}

export default HomePage;
