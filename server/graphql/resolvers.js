import { getCompany } from "../db/companies.js";
import { getJobs } from "../db/jobs.js";
import { formatISODate } from "../utils/helpers.js";

export const resolvers = {
  Query: {
    jobs: () => getJobs(),
  },
  Job: {
    company: (job) => getCompany(job.companyId),
    date: (job) => formatISODate(job.createdAt),
  },
};
