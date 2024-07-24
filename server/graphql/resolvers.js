import { getCompany } from "../db/companies.js";
import { createJob, getCompanyJobs, getJob, getJobs } from "../db/jobs.js";
import { formatISODate, throwNotFound } from "../utils/helpers.js";

export const resolvers = {
  Query: {
    job: async (_root, { id }) => {
      const job = await getJob(id);
      if (!job) {
        throwNotFound(`Job with ID ${id} not found`);
      }
      return job;
    },
    jobs: () => getJobs(),
    company: async (_root, { id }) => {
      const company = await getCompany(id);
      if (!company) {
        throwNotFound(`Company with ID ${id} not found`);
      }
      return company;
    },
  },
  Mutation: {
    createJob: async (_root, { input }) => {
      // FIXME: hardcoded value, should base on the user
      const companyId = "FjcJCHJALA4i";
      const { title, description } = input;
      return createJob({ companyId, title, description });
    },
  },
  Job: {
    company: async (job) => {
      const company = await getCompany(job.companyId);
      if (!company) {
        throwNotFound(`Company with ID ${id} not found`);
      }
      return company;
    },
    date: (job) => formatISODate(job.createdAt),
  },
  Company: {
    jobs: (company) => getCompanyJobs(company.id),
  },
};
