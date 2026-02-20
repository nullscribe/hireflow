export interface ErrorResponse {
  error: string;
}

export interface BasicApiResponse {
  message: string;
}

export * from "./healthCheck.type.js";
export * from "./auth.type.js";
export * from "./job.type.js";
export * from "./employer.type.js";
export * from "./candidate.type.js";
