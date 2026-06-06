import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    surname: z.string().min(2, "Surname is required"),
    email: z.email("Invalid email"),
    password: z
      .string()
      .min(8, "Min 8 chars")
      .regex(/[A-Z]/, "One uppercase required")
      .regex(/[a-z]/, "One lowercase required")
      .regex(/[0-9]/, "One number required")
      .regex(/[@$!%*?&]/, "One special char required"),

    confirmPassword: z.string(),
    acceptTerms: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.acceptTerms === true, {
    message: "You must accept terms",
    path: ["acceptTerms"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
