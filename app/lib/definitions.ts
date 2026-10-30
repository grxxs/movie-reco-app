import * as z from "zod";

export interface GenreOrKeyword {
  id: number;
  name: string;
}

export type MediaTypeEnum = "movie" | "tv";

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
  poster_path: string | null;
}

export interface TMDBresponse {
  results: TMDBResponseElement[];
}

export interface MovieDetails {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string | null;
  genres: GenreOrKeyword[];
  backdrop_path: string | null;
  keywords: {
    keywords: GenreOrKeyword[];
  };
}

export interface TvDetails {
  id: number;
  name: string;
  first_air_date: string;
  overview: string;
  poster_path: string | null;
  genres: GenreOrKeyword[];
  backdrop_path: string | null;
  keywords: {
    results: GenreOrKeyword[];
  };
}

export interface TitleDetails {
  id: number;
  title: string;
  mediaType: MediaTypeEnum;
  releaseDate: string;
  overview: string;
  posterPath: string | null;
  genres: GenreOrKeyword[];
  backdropPath: string | null;
  keywords: GenreOrKeyword[];
}

export const URLParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
  type: z.enum(["movie", "tv"]),
});

export const LogInFormSchema = z.object({
  email: z
    .string()
    .trim()
    .pipe(z.email({ error: "Wprowadź prawidłowy adres email" })),
  password: z.string().min(1, { error: "Wprowadź hasło." }),
});

export type LogInFormState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  email?: string;
  message?: string | null;
};

export const RegisterFormSchema = z.object({
  email: z
    .string()
    .trim()
    .pipe(z.email({ error: "Wprowadź prawidłowy adres email" })),
  username: z
    .string()
    .trim()
    .min(3, { error: "Nazwa użytkownika musi mieć od 3 do 20 znaków" })
    .max(20, { error: "Nazwa użytkownika musi mieć od 3 do 20 znaków" })
    .regex(/^[a-z0-9_]+$/, {
      error:
        "Nazwa użytkownika może zawierać tylko małe litery, cyfry i znak _",
    }),
  password: z
    .string()
    .min(8, { error: "Hasło musi mieć co najmniej 8 znaków" })
    .regex(/[a-zA-Z]/, { error: "Hasło musi zawierać literę" })
    .regex(/[0-9]/, { error: "Hasło musi zawierać cyfrę" })
    .regex(/[^a-zA-Z0-9]/, {
      error: "Hasło musi zawierać znak specjalny",
    }),
});

export type RegisterFormState = {
  errors?: {
    email?: string[];
    username?: string[];
    password?: string[];
  };
  email?: string;
  username?: string;
  message?: string | null;
};

export type AddTitleFormState = {
  errors?: {
    id?: string[];
    type?: string[];
  };
  message?: string | null;
};
