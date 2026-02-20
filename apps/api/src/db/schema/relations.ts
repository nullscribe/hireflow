import { relations } from "drizzle-orm";

import { jobs } from "./job.entity.js";
import { applications } from "./application.entity.js";
import {
  candidateDeviceTokens,
  candidateEducations,
  candidateExperiences,
  candidates,
  candidateSkills,
} from "./candidate.entity.js";
import { employerFollows, savedJobs } from "./association.js";
import { employerDeviceTokens, employers } from "./employer.entity.js";

export const applicationsRelations = relations(applications, ({ one }) => ({
  job: one(jobs, {
    fields: [applications.jobId],
    references: [jobs.id],
  }),
  candidate: one(candidates, {
    fields: [applications.candidateId],
    references: [candidates.id],
  }),
}));

export const savedJobsRelations = relations(savedJobs, ({ one }) => ({
  candidate: one(candidates, {
    fields: [savedJobs.candidateId],
    references: [candidates.id],
  }),
  job: one(jobs, {
    fields: [savedJobs.jobId],
    references: [jobs.id],
  }),
}));

export const employerFollowsRelations = relations(employerFollows, ({ one }) => ({
  candidate: one(candidates, {
    fields: [employerFollows.candidateId],
    references: [candidates.id],
  }),
  employer: one(employers, {
    fields: [employerFollows.employerId],
    references: [employers.id],
  }),
}));

export const candidatesRelations = relations(candidates, ({ many }) => ({
  applications: many(applications),
  savedJobs: many(savedJobs),
  followedEmployers: many(employerFollows),
  skills: many(candidateSkills),
  experiences: many(candidateExperiences),
  educations: many(candidateEducations),
  deviceTokens: many(candidateDeviceTokens),
}));

export const candidateSkillsRelations = relations(candidateSkills, ({ one }) => ({
  candidate: one(candidates, {
    fields: [candidateSkills.candidateId],
    references: [candidates.id],
  }),
}));

export const candidateEducationsRelations = relations(candidateEducations, ({ one }) => ({
  candidate: one(candidates, {
    fields: [candidateEducations.candidateId],
    references: [candidates.id],
  }),
}));

export const candidateExperiencesRelations = relations(candidateExperiences, ({ one }) => ({
  candidate: one(candidates, {
    fields: [candidateExperiences.candidateId],
    references: [candidates.id],
  }),
}));

export const candidateDeviceTokensRelations = relations(candidateDeviceTokens, ({ one }) => ({
  candidate: one(candidates, {
    fields: [candidateDeviceTokens.candidateId],
    references: [candidates.id],
  }),
}));

export const employersRelations = relations(employers, ({ many }) => ({
  jobs: many(jobs),
  followers: many(employerFollows),
  deviceTokens: many(employerDeviceTokens),
}));

export const employerDeviceTokensRelations = relations(employerDeviceTokens, ({ one }) => ({
  employer: one(employers, {
    fields: [employerDeviceTokens.employerId],
    references: [employers.id],
  }),
}));

export const jobsRelations = relations(jobs, ({ one, many }) => ({
  employer: one(employers, {
    fields: [jobs.employerId],
    references: [employers.id],
  }),
  applications: many(applications),
  savedJobs: many(savedJobs),
}));
