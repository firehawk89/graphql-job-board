import { getCompany } from "../db/companies.js";
import {
  createJob,
  deleteJob,
  getCompanyJobs,
  getJob,
  getJobs,
  updateJob,
} from "../db/jobs.js";
import {
  formatISODate,
  throwNotFound,
  throwUnauthorizedError,
} from "../utils/helpers.js";

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
    createJob: async (_root, { input }, context) => {
      const { user } = context;
      if (!user) {
        throwUnauthorizedError("You must be logged in to create a job");
      }
      const { title, description } = input;
      return createJob({
        companyId: user.companyId,
        title,
        description,
      });
    },
    updateJob: async (_root, { input }, context) => {
      const { user } = context;
      if (!user) {
        throwUnauthorizedError("You must be logged in to update a job");
      }
      try {
        const job = await updateJob({ ...input, companyId: user.companyId });
        return job;
      } catch (error) {
        throwUnauthorizedError(error.message);
      }
    },
    deleteJob: async (_root, { id }, context) => {
      const { user } = context;
      if (!user) {
        throwUnauthorizedError("You must be logged in to delete a job");
      }
      try {
        const job = await deleteJob(id, user.companyId);
        return job;
      } catch (error) {
        throwUnauthorizedError(error.message);
      }
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
