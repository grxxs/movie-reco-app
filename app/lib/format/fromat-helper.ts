export function getType(name: "movie" | "tv" | "person") {
  switch (name) {
    case "movie":
      return "Film";
    case "tv":
      return "Serial";
    default:
      return "";
  }
}

export function getTypeDB(name: "movie" | "tv") {
  switch (name) {
    case "movie":
      return "MOVIE";
    case "tv":
      return "TV";
  }
}

export function getYear(date?: string, air?: string) {
  return (date || air || "").slice(0, 4);
}
