import * as z from "zod";

export const LoginSchema = z.object({
  email: z.email("Email cannot be blank"),
  password: z
    .string("Password cannot be blank")
    .min(5, "Must have at least 5 characters")
    .max(30, "Cannot have more that 30 characters"),
});

export type LoginDTO = z.infer<typeof LoginSchema>;
export type LoginType = LoginDTO;

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export const RegistrationSchema = z
  .object({
    name: z
      .string("Name cannot be blank")
      .min(5, "Must have at least 5 characters")
      .max(30, "Cannot have more that 30 characters"),
    email: z.email("Email cannot be blank"),
    password: z
      .string("Password cannot be blank")
      .min(5, "Must have at least 5 characters")
      .max(30, "Cannot have more that 30 characters"),
    password_confirmation: z
      .string()
      .min(5, "Must have at least 5 characters")
      .max(30, "Cannot have more that 30 characters"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  });

export type RegistrationType = z.infer<typeof RegistrationSchema>;

export type RegistrationDTO = Omit<RegistrationType, "password_confirmation">;

export interface AuthResponse {
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
}
