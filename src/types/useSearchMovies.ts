import { useState, useEffect } from 'react';
import axios from 'axios';
import { Movie } from './movie';

const API_URL = 'https://movieweb-production.up.railway.app/api/v1';

interface SearchResponse {
    results: Movie[];
}

export const useSearchMovies = (query: string) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const searchMovies = async () => {
            if (!query.trim()) {
                setMovies([]);
                return;
            }

            try {
                setLoading(true);
                setError('');
                
                const response = await axios.get<SearchResponse>(`${API_URL}/search`, {
                    params: {
                        query: query,
                        page: 1
                    }
                });

                setMovies(response.data.results);
            } catch (err) {
                setError('Không thể tìm kiếm phim. Vui lòng thử lại.');
                setMovies([]);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(searchMovies, 500);
        return () => clearTimeout(timeoutId);
    }, [query]);

    return { movies, loading, error };
}; 