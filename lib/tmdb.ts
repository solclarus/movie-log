import type { Locale } from "@/i18n/routing";
import type {
  CreditsResponse,
  MovieDetails,
  MovieListResponse,
  ReviewResponse,
} from "@/types/tmdb";
import { cache } from "react";

export const BASE_URL: string = "https://api.themoviedb.org/3";
const MAX_API_PAGE = 500;

const fetchFromTMDB = async <T>(endpoint: string): Promise<T | null> => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`HTTPエラー: ${response.status}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error("データ取得エラー:", error);
    return null;
  }
};

const fetchMovieListData = async (
  endpoint: string,
): Promise<MovieListResponse> => {
  try {
    const data = await fetchFromTMDB<MovieListResponse>(endpoint);

    if (!data) {
      throw new Error("データ取得エラー");
    }

    return {
      results: data.results,
      page: data.page,
      total_pages: Math.min(data.total_pages, MAX_API_PAGE),
      total_results: data.total_results,
      dates: data.dates,
    };
  } catch (error) {
    console.error("データ取得エラー:", error);
    return {
      results: [],
      page: 1,
      total_pages: 1,
      total_results: 0,
    };
  }
};

export const getMovieList = cache(
  async (
    category: string,
    language: Locale,
    page = 1,
    region = "JP",
  ): Promise<MovieListResponse> => {
    const endpoint = `movie/${category}?language=${language}&region=${region}&page=${page}`;

    return fetchMovieListData(endpoint);
  },
);

export const searchMovies = cache(
  async (
    language: Locale,
    page: number,
    query: string,
  ): Promise<MovieListResponse> => {
    const endpoint = `search/movie?query=${encodeURIComponent(
      query,
    )}&include_adult=false&language=${language}&page=${page}`;

    return fetchMovieListData(endpoint);
  },
);

export const getMovieRecommendations = cache(
  async (id: string, language: Locale): Promise<MovieListResponse> => {
    const endpoint = `movie/${id}/recommendations?language=${language}`;
    return fetchMovieListData(endpoint);
  },
);

export const getSimilarMovies = cache(
  async (id: string, language: Locale): Promise<MovieListResponse> => {
    const endpoint = `movie/${id}/similar?language=${language}`;
    return fetchMovieListData(endpoint);
  },
);

export const getMovie = cache(
  async (id: string, language: Locale): Promise<MovieDetails | null> => {
    try {
      const endpoint = `movie/${id}?language=${language}`;
      const data = await fetchFromTMDB<MovieDetails>(endpoint);
      if (!data) {
        throw new Error("データ取得エラー");
      }
      return data;
    } catch (error) {
      console.error(error);

      return null;
    }
  },
);

export const getMovieCredits = cache(
  async (id: string, language: Locale): Promise<CreditsResponse | null> => {
    try {
      const endpoint = `movie/${id}/credits?language=${language}`;
      const data = await fetchFromTMDB<CreditsResponse>(endpoint);
      if (!data) {
        throw new Error("データ取得エラー");
      }
      return data;
    } catch (error) {
      console.error(error);

      return null;
    }
  },
);

export const getReviews = cache(
  async (id: string, language: Locale): Promise<ReviewResponse | null> => {
    try {
      const endpoint = `movie/${id}/reviews?language=${language}`;
      const data = await fetchFromTMDB<ReviewResponse>(endpoint);
      if (!data) {
        throw new Error("データ取得エラー");
      }

      return data;
    } catch (error) {
      console.error(error);

      return null;
    }
  },
);

// export const getImages = cache(async (id: string) => {
//   const data = await fetchFromTMDB(`movie/${id}/images`);
//   return data.results;
// });

// export const getVideos = cache(async (id: string) => {
//   const data = await fetchFromTMDB(`movie/${id}/videos`);
//   return data.results;
// });
