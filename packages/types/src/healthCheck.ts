export interface HealthCheckResponse {
  status: string;
  database: {
    status: "healthy" | "unhealthy";
  };
}
