export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface DetailedMovie extends Movie {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Metascore: string | null;
  imdbRating: string;
  imdbVotes: string;
  DVD: string | null;
  BoxOffice: string;
  Production: string | null;
  Website: string | null;
  Response: string;
  Error?: string;
}
