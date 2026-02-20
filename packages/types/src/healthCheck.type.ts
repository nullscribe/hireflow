export interface HealthCheckResponse {
  status: "healthy" | "unhealthy";
  database: {
    status: "healthy" | "unhealthy";
    error?: string;
  };
}
