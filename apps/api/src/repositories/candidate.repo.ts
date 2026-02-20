import type { CandidateProfileResponse, UpdateCandidateProfileDTO } from "@hireflow/types";
import { singleton } from "tsyringe";
import db from "../db/index.js";
import { eq } from "drizzle-orm";
import { candidates } from "../db/schema/index.js";
import { toProfileResponse, type SelectCandidateWithRest } from "../mappers/candidate.mapper.js";

@singleton()
export default class CandidateRepository {
  async getProfile(userId: number): Promise<CandidateProfileResponse | undefined> {
    const profile: SelectCandidateWithRest | undefined = await db.query.candidates.findFirst({
      where: eq(candidates.id, userId),
      with: {
        skills: true,
        educations: true,
        experiences: true,
      },
    });
    if (!profile) {
      throw new Error("Candidate not found");
    }

    const { missing } = this.calculateCompletionScore(profile);
    return toProfileResponse(profile, missing);
  }

  async updateProfile(
    userId: number,
    dto: UpdateCandidateProfileDTO,
  ): Promise<CandidateProfileResponse> {
    const [updated] = await db
      .update(candidates)
      .set(dto)
      .where(eq(candidates.id, userId))
      .returning();

    if (!updated) {
      throw new Error("Candidate not found");
    }

    const profile = await db.query.candidates.findFirst({
      where: eq(candidates.id, userId),
      with: {
        skills: true,
        educations: true,
        experiences: true,
      },
    });

    if (!profile) {
      throw new Error("Candidate not found");
    }

    const { score, missing } = this.calculateCompletionScore(profile);
    await db
      .update(candidates)
      .set({ profileCompletionScore: score })
      .where(eq(candidates.id, userId));

    return toProfileResponse({ ...profile, profileCompletionScore: score }, missing);
  }

  private calculateCompletionScore(profile: SelectCandidateWithRest): {
    score: number;
    missing: string[];
  } {
    let score = 0;
    const missing: string[] = [];

    const basicComplete =
      profile.title != null &&
      profile.phone != null &&
      profile.location != null &&
      profile.country != null;
    if (basicComplete) score += 20;
    else missing.push("Complete your basic info");
    if (profile.bio) score += 10;
    else missing.push("Add a bio");
    if (profile.avatarUrl) score += 10;
    else missing.push("Upload a profile photo");
    if (profile.resumeUrl) score += 10;
    else missing.push("Upload your resume");
    if (profile.experiences.length > 0) score += 20;
    else missing.push("Add work experience");
    if (profile.educations.length > 0) score += 10;
    else missing.push("Add your education");
    if (profile.skills.length > 0) score += 10;
    else missing.push("Add at least one skill");

    if (profile.linkedInUrl || profile.portfolioUrl) score += 10;
    else missing.push("Add LinkedIn or portfolio url");

    return { score, missing };
  }
}
