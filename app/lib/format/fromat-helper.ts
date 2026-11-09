import { MediaType } from "@/generated/prisma/enums";
import { MediaTypeEnum } from "../definitions";

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

export function getTypeDB(name: "movie" | "tv"): MediaType {
  switch (name) {
    case "movie":
      return "MOVIE";
    case "tv":
      return "TV";
  }
}

export function getTypeTMDB(name: "MOVIE" | "TV"): MediaTypeEnum {
  switch (name) {
    case "MOVIE":
      return "movie";
    case "TV":
      return "tv";
  }
}

export function getYear(date?: string, air?: string) {
  return (date || air || "").slice(0, 4);
}
