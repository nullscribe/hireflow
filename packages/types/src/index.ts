export interface ErrorResponse {
  error: string;
}

export interface BasicApiResponse {
  message: string;
}

export * from "./healthCheck.js";
export * from "./auth.js";
export * from "./job.js";
export * from "./employer.js";
