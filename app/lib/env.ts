import checkEnv from "./check-env";

export const env = {
  TMDB_BEARER: checkEnv(process.env.TMDB_BEARER, "TMDB_BEARER"),
  DATABASE_URL: checkEnv(process.env.DATABASE_URL, "DATABASE_URL"),
};
