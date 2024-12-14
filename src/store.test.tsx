import { configureStore } from "@reduxjs/toolkit";
import { RootState } from "./store"; // Adjust based on where the store is located
import moviesReducer from "./stores/movies.slice"; // Your reducer import
import { fetchMovies, fetchDetailedMovie } from "./stores/movies.slice"; // Actions to test
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock the axiosInstance used in the async actions
vi.mock("./client", () => ({
  default: {
    get: vi.fn(() =>
      Promise.resolve({ data: { Search: [], totalResults: 10 } })
    ),
  },
}));

describe("Store", () => {
  let testStore: ReturnType<typeof configureStore>;

  beforeEach(() => {
    // Create a fresh store for each test
    testStore = configureStore({
      reducer: {
        movies: moviesReducer,
      },
    });
  });

  it("should have initial state", () => {
    const state: RootState = testStore.getState() as any;

    expect(state.movies.searchKey).toBe("");
    expect(state.movies.pageCount).toBe(1);
    expect(state.movies.results).toEqual([]);
    expect(state.movies.detailedMovie).toBeUndefined();
    expect(state.movies.isLoading).toBe(false);
  });

  it("should handle fetchMovies action correctly", async () => {
    // Dispatch the action and wait for it to be resolved
    await testStore.dispatch(
      fetchMovies({ searchKey: "test", page: 1 }) as any
    );

    // Check the state after dispatching fetchMovies action
    const state: RootState = testStore.getState() as any;
    expect(state.movies.isLoading).toBe(false);
    expect(state.movies.results).toEqual([]); // Based on the mock response
    expect(state.movies.pageCount).toBe(1);
  });

  it("should handle fetchDetailedMovie action correctly", async () => {
    const movieId = "tt12345"; // Example movie ID

    // Mock the response from the API call
    (
      (await vi.mocked(import("./client"))).default.get as any
    ).mockResolvedValueOnce({
      data: {
        Title: "Movie Title",
        Year: "2023",
        imdbID: movieId,
        Poster: "poster_url",
        Rated: "PG-13",
        // Add more mock data for detailed movie
      },
    });

    // Dispatch the fetchDetailedMovie action
    await testStore.dispatch(fetchDetailedMovie({ id: movieId }) as any);

    // Check the state after dispatching fetchDetailedMovie
    const state: RootState = testStore.getState() as any;
    expect(state.movies.isLoading).toBe(false);
    expect(state.movies.detailedMovie).toBeDefined();
    expect(state.movies.detailedMovie?.Title).toBe("Movie Title");
    expect(state.movies.detailedMovie?.imdbID).toBe(movieId);
  });

  it("should handle fetchMovies rejected state", async () => {
    // Mock the rejected response for fetchMovies
    (
      (await vi.mocked(import("./client"))).default.get as any
    ).mockRejectedValueOnce(new Error("Failed"));

    // Dispatch the fetchMovies action
    await testStore.dispatch(
      fetchMovies({ searchKey: "pokemon", page: 1 }) as any
    );

    // Check the state after rejected action
    const state: RootState = testStore.getState() as any;
    expect(state.movies.isLoading).toBe(false);
    expect(state.movies.results).toEqual([]);
    expect(state.movies.pageCount).toBe(1);
  });

  it("should change the state of isLoading when async actions are in progress", async () => {
    // Dispatch the fetchMovies action and check isLoading state
    testStore.dispatch(fetchMovies({ searchKey: "test", page: 1 }) as any);
    const stateBefore = testStore.getState() as any;
    expect(stateBefore.movies.isLoading).toBe(true);

    // Simulate the action resolving and check isLoading state
    await testStore.dispatch(
      fetchMovies({ searchKey: "test", page: 1 }) as any
    );
    const stateAfter = testStore.getState() as any;
    expect(stateAfter.movies.isLoading).toBe(false);
  });
});
