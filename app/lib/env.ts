function checkEnv(value: string | undefined, name: string) {
  if (!value || value.trim() === "") {
    throw new Error(`Brak ${name} w zmiennych środowiskowych`);
  }
  return value;
}

export const env = {
  TMDB_BEARER: checkEnv(process.env.TMDB_BEARER, "TMDB_BEARER"),
};
