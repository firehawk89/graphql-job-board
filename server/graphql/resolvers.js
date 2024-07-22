import { getCompany } from "../db/companies.js";
import { getCompanyJobs, getJob, getJobs } from "../db/jobs.js";
import { formatISODate } from "../utils/helpers.js";

export const resolvers = {
  Query: {
    job: (_root, { id }) => getJob(id),
    jobs: () => getJobs(),
    company: (_root, { id }) => getCompany(id),
  },
  Job: {
    company: (job) => getCompany(job.companyId),
    date: (job) => formatISODate(job.createdAt),
  },
  Company: {
    jobs: (company) => getCompanyJobs(company.id),
  },
};
