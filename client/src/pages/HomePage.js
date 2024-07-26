import JobList from "../components/JobList";
import useJobs from "../hooks/useJobs";

function HomePage() {
  const { jobs, loading, isError } = useJobs();

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
    </div>
  );
}

export default HomePage;
