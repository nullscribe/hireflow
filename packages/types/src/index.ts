export interface ErrorResponse {
  error: string;
}

export interface BasicApiResponse {
  message: string;
}

export * from "./healthCheck";
export * from "./auth";
export * from "./job";
