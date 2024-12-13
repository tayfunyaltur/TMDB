import { configureStore } from "@reduxjs/toolkit";
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { moviesSlice, fetchMovies, fetchDetailedMovie } from "./movies.slice";
import axiosInstance from "../client";

vi.mock("../client"); // Mock axiosInstance

const mockMovie = {
  Title: "Inception",
  Year: "2010",
  imdbID: "tt1375666",
  Type: "movie",
  Poster: "https://image.url",
};

const mockDetailedMovie = {
  Title: "Inception",
  Year: "2010",
  imdbID: "tt1375666",
  Rated: "PG-13",
  Released: "16 Jul 2010",
  Runtime: "148 min",
  Genre: "Action, Sci-Fi",
  Director: "Christopher Nolan",
  Writer: "Christopher Nolan",
  Actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
  Plot: "A thief who steals corporate secrets through the use of dream-sharing technology...",
  Language: "English",
  Country: "USA",
  Awards: "Won 4 Oscars. Another 143 wins & 198 nominations.",
  imdbRating: "8.8",
  imdbVotes: "2,000,000",
  BoxOffice: "$292,576,195",
};

describe("Movies Slice", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        movies: moviesSlice.reducer,
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("fetchMovies", () => {
    it("should handle fetchMovies.fulfilled", async () => {
      const searchKey = "Inception";
      const page = 1;
      const mockResponse = {
        Search: [mockMovie],
        totalResults: 100,
        Response: "True",
      };

      (axiosInstance.get as Mock).mockResolvedValue({ data: mockResponse });

      await store.dispatch(fetchMovies({ searchKey, page }) as any);

      const state = (store.getState() as any).movies;
      expect(state.isLoading).toBe(false);
      expect(state.results).toEqual([mockMovie]);
      expect(state.pageCount).toBe(10);
    });

    it("should handle fetchMovies.rejected", async () => {
      const searchKey = "NonExistentMovie";
      const page = 1;

      (axiosInstance.get as Mock).mockRejectedValue(
        new Error("Movie not found")
      );

      await store.dispatch(fetchMovies({ searchKey, page }) as any);

      const state = (store.getState() as any).movies;
      expect(state.isLoading).toBe(false);
      expect(state.results).toEqual([]);
      expect(state.pageCount).toBe(1);
    });
  });

  describe("fetchDetailedMovie", () => {
    it("should handle fetchDetailedMovie.fulfilled", async () => {
      const movieId = "tt1375666";
      (axiosInstance.get as Mock).mockResolvedValue({
        data: mockDetailedMovie,
      });

      await store.dispatch(fetchDetailedMovie({ id: movieId }) as any);

      const state = (store.getState() as any).movies;
      expect(state.isLoading).toBe(false);
      expect(state.detailedMovie).toEqual(mockDetailedMovie);
    });

    it("should handle fetchDetailedMovie.rejected", async () => {
      const movieId = "tt1375666";
      (axiosInstance.get as Mock).mockRejectedValue(
        new Error("Movie details not found")
      );

      await store.dispatch(fetchDetailedMovie({ id: movieId }) as any);

      const state = (store.getState() as any).movies;
      expect(state.isLoading).toBe(false);
      expect(state.detailedMovie).toBeUndefined();
    });
  });

  describe("loading states", () => {
    it("should set loading state to true while fetching movies", async () => {
      const searchKey = "Inception";
      const page = 1;
      const mockResponse = {
        Search: [mockMovie],
        totalResults: 100,
        Response: "True",
      };

      (axiosInstance.get as Mock).mockResolvedValue({ data: mockResponse });

      store.dispatch(fetchMovies({ searchKey, page }) as any);

      const state = (store.getState() as any).movies;
      expect(state.isLoading).toBe(true);

      await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for async dispatch

      const updatedState = (store.getState() as any).movies;
      expect(updatedState.isLoading).toBe(false);
    });

    it("should set loading state to true while fetching detailed movie", async () => {
      const movieId = "tt1375666";

      (axiosInstance.get as Mock).mockResolvedValue({
        data: mockDetailedMovie,
      });

      store.dispatch(fetchDetailedMovie({ id: movieId }) as any);

      const state = (store.getState() as any).movies;
      expect(state.isLoading).toBe(true);

      await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for async dispatch

      const updatedState = (store.getState() as any).movies;
      expect(updatedState.isLoading).toBe(false);
    });
  });
});
