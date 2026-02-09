export interface Employer {
  id: number;
  name: string;
  email: string;
  password: string;
  companyName: string;
  avatarUrl: string | null;
  companyWebsite: string | null;
  phone: string | null;
  createdAt: Date;
}

export type EmployerResponse = Omit<Employer, "password">;
