import checkEnv from "./check-env";

export const env = {
  TMDB_BEARER: checkEnv(process.env.TMDB_BEARER, "TMDB_BEARER"),
  DATABASE_URL: checkEnv(process.env.DATABASE_URL, "DATABASE_URL"),
  NEXT_PUBLIC_SUPABASE_URL: checkEnv(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    "NEXT_PUBLIC_SUPABASE_URL",
  ),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: checkEnv(
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  ),
};
