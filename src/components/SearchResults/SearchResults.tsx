import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchResults.module.scss';
import { Movie } from '../../types/movie';

interface SearchResultsProps {
    movies: Movie[];
    loading: boolean;
    error: string;
    onMovieClick: (movieId: number) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
    movies,
    loading,
    error,
}) => {
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className={styles.results}>
                <div className={styles.loading}>Đang tìm kiếm...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.results}>
                <div className={styles.error}>{error}</div>
            </div>
        );
    }

    if (movies.length === 0) {
        return null;
    }

    const handleMovieClick = (movieId: number) => {
        navigate(`/detail/${movieId}`);
    };

    return (
        <div className={styles.results}>
            {movies.map((movie) => (
                <div
                    key={movie.id}
                    className={styles.movieItem}
                    onClick={() => handleMovieClick(movie.id)}
                >
                    {movie.poster_path && (
                        <img
                            src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                            alt={movie.title}
                            className={styles.poster}
                        />
                    )}
                    <div className={styles.info}>
                        <div className={styles.title}>{movie.title}</div>
                        {movie.release_date && (
                            <div className={styles.year}>
                                {new Date(movie.release_date).getFullYear()}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}; 