export default function checkEnv(value: string | undefined, name: string) {
  if (!value || value.trim() === "") {
    throw new Error(`Brak ${name} w zmiennych środowiskowych`);
  }
  return value;
}
