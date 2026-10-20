import * as z from "zod";

export interface TMDBResponseElement {
  id: number;
  media_type: "movie" | "tv" | "person";
  name?: string;
  title?: string;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
}

export interface TMDBresponse {
  results: TMDBResponseElement[];
}

export const LogInFormSchema = z.object({
  email: z.email({ error: "Wprowadź prawidłowy adres email" }).trim(),
  password: z.string().min(1, { error: "Wprowadź hasło." }),
});

export type LogInFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      email?: string;
      message?: string;
    }
  | undefined;

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { error: "Name must be at least 2 characters long." })
    .trim(),
  email: z.email({ error: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { error: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { error: "Contain at least one letter." })
    .regex(/[0-9]/, { error: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      error: "Contain at least one special character.",
    })
    .trim(),
});
