import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DetailedMovie, Movie } from "../types/Movie.type";
import axiosInstance from "../client";

export interface MoviesState {
  searchKey: string;
  pageCount: number;
  results: Movie[];
  detailedMovie?: DetailedMovie;
  isLoading: boolean;
}

const initialState: MoviesState = {
  searchKey: "",
  pageCount: 1,
  results: [],
  detailedMovie: undefined,
  isLoading: false,
};

export const fetchMovies = createAsyncThunk(
  "fetchMovies",
  async (payload: { searchKey: string; page: number }) => {
    const { searchKey, page } = payload;
    let response = null;
    try {
      response = await axiosInstance.get<{
        Search: Movie[];
        totalResults: number;
        Response?: string;
        Error?: string;
      }>(`?s=${searchKey}&page=${page}`);
      if (response.data.Response === "False") {
        throw new Error(response.data.Error);
      }
      return response.data;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
);

export const fetchDetailedMovie = createAsyncThunk(
  "fetchDetailedMovie",
  async (payload: { id: string }) => {
    let response = null;
    try {
      response = await axiosInstance.get<DetailedMovie>(
        `?plot=full&i=${payload.id}`
      );
      if (response.data.Response === "False")
        throw new Error(response.data.Error || "");
    } catch (err: any) {
      throw err;
    }
    return response?.data;
  }
);

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.isLoading = false;
      state.results = action.payload.Search;
      state.pageCount = Math.ceil(action.payload.totalResults / 10);
    });
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.isLoading = false;
      state.results = [];
      state.pageCount = 1;
      console.log(action.error);
    });
    builder.addCase(fetchDetailedMovie.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDetailedMovie.fulfilled, (state, action) => {
      state.isLoading = false;
      state.detailedMovie = action.payload;
    });
    builder.addCase(fetchDetailedMovie.rejected, (state, action) => {
      state.isLoading = false;
      state.results = [];
      state.pageCount = 1;
      state.detailedMovie = undefined;
      console.log(action.error);
    });
  },
});

export default moviesSlice.reducer;
