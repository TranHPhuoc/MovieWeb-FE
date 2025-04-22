export interface Movie {
    id: number;
    title: string;
    original_title: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    media_type: string;
    overview: string;
}

export interface Video {
    url: string;
}
export interface MovieDetail extends Movie {
    overview_en: string;
    overview_vi: string;
    backdrop_path: string | null;
    runtime: number;
    vote_average: number;
    genres: { id: number; name: string }[];
    credits: {
        cast: {
            id: number;
            name: string;
            character: string;
            profile_path: string | null;
        }[];
        crew: {
            id: number;
            name: string;
            job: string;
            department: string;
            profile_path: string | null;
        }[];
    };
}

export interface PopularMoviesResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface TrendingMoviesResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface UpcomingMovies {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

// API Endpoints
const API_URL = 'http://localhost:8080/api/v1';

export const movieApi = {
    getPopularMovies: async (page: number = 1): Promise<PopularMoviesResponse> => {
        const response = await fetch(`${API_URL}/popular?page=${page}`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    },

    getTrendingMovies: async (page: number = 1): Promise<TrendingMoviesResponse> => {
        const response = await fetch(`${API_URL}/trending?page=${page}`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    },

    getMovieDetails: async (movieId: number): Promise<MovieDetail> => {
        const [detailRes, creditRes] = await Promise.all([
            fetch(`${API_URL}/detail/${movieId}`, {
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            }),
            fetch(`${API_URL}/movie/${movieId}/credits`, {
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            })
        ]);
    
        const detailData = await detailRes.json();
        const creditsData = await creditRes.json();
    
        return {
            ...detailData,
            credits: creditsData // 👈 gộp vào object trả về
        };
    },
    

    getMovie: async (movieId: number): Promise<Video> => {
        const response = await fetch(`${API_URL}/movie/${movieId}`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    },
    getUpcomingMovies: async (page: number = 1): Promise<UpcomingMovies> => {
        const response = await fetch(`${API_URL}/upcoming?page=${page}`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    },

};