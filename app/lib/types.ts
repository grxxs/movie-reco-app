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
