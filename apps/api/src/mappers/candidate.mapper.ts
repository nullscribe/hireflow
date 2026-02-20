import type {
  CandidateEducationDTO,
  CandidateExperienceDTO,
  CandidateProfileResponse,
  CandidateSkillDTO,
} from "@hireflow/types";
import type {
  SelectCandidate,
  SelectCandidateEducation,
  SelectCandidateExperience,
  SelectCandidateSkill,
} from "../db/schema/candidate.entity.js";

export interface SelectCandidateWithRest extends SelectCandidate {
  skills: SelectCandidateSkill[];
  educations: SelectCandidateEducation[];
  experiences: SelectCandidateExperience[];
}

export function toProfileResponse(
  data: SelectCandidateWithRest,
  missing: string[],
): CandidateProfileResponse {
  return {
    id: data.id,
    name: data.name,
    title: data.title,
    bio: data.bio,
    location: data.location,
    country: data.country,
    linkedInUrl: data.linkedInUrl,
    portfolioUrl: data.portfolioUrl,
    profileCompletionScore: data.profileCompletionScore,
    dateOfBirth: data.dateOfBirth,
    gender: data.gender,
    email: data.email,
    phone: data.phone,
    avatarUrl: data.avatarUrl,
    resumeUrl: data.resumeUrl,
    createdAt: data.createdAt,
    skills: data.skills.map(toCandidateSkillDTO),
    experiences: data.experiences.map(toCandidateExperienceDTO),
    educations: data.educations.map(toCandidateEducationDTO),
    missing,
  };
}

export function toCandidateSkillDTO(data: SelectCandidateSkill): CandidateSkillDTO {
  return {
    id: data.id,
    name: data.name,
    proficiencyLevel: data.proficiencyLevel,
  };
}

export function toCandidateExperienceDTO(data: SelectCandidateExperience): CandidateExperienceDTO {
  return {
    id: data.id,
    companyName: data.companyName,
    jobTitle: data.jobTitle,
    location: data.location,
    description: data.description,
    startDate: data.startDate,
    endDate: data.endDate,
    isCurrent: data.isCurrent,
  };
}

export function toCandidateEducationDTO(data: SelectCandidateEducation): CandidateEducationDTO {
  return {
    id: data.id,
    institution: data.institution,
    degree: data.degree,
    fieldOfStudy: data.fieldOfStudy,
    endDate: data.endDate,
    startDate: data.startDate,
    isCurrent: data.isCurrent,
  };
}
