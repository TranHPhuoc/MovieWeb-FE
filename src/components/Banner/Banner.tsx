import { useState, useEffect } from 'react';
import { Movie } from '../../types/movie';
import styles from './Banner.module.scss';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { createMovieSlug } from '../../types/slug';

interface BannerProps {
    movies: Movie[];
}

export const Banner = ({ movies }: BannerProps) => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const bannerMovies = movies.slice(4, 8);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % bannerMovies.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [bannerMovies.length]);

    const handleMovieClick = (movieId: number, title: string) => {
        navigate(`/detail/${movieId}-${createMovieSlug(title)}`);
    };

    const handlePrevSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentSlide((prev) => (prev === 0 ? bannerMovies.length - 1 : prev - 1));
    };

    const handleNextSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentSlide((prev) => (prev + 1) % bannerMovies.length);
    };

    return (
        <div className={styles.banner}>
            {bannerMovies.map((movie, index) => (
                <div
                    key={movie.id}
                    className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
                    }}
                >
                    <div className={styles.content}>
                        <h2>{movie.title}</h2>
                        <div className={styles.info}>
                            <span className={styles.year}>
                                {new Date(movie.release_date).getFullYear()}
                            </span>
                            <p className={styles.overview}>
                                {movie.overview}
                            </p>
                        </div>
                        <button 
                            className={styles.watchButton}
                            onClick={() => handleMovieClick(movie.id, movie.original_title)}
                        >
                            Xem phim
                        </button>
                    </div>
                </div>
            ))}
            <button className={`${styles.arrowButton} ${styles.prevButton}`} onClick={handlePrevSlide}>
                <ArrowBackIosIcon />
            </button>
            <button className={`${styles.arrowButton} ${styles.nextButton}`} onClick={handleNextSlide}>
                <ArrowForwardIosIcon />
            </button>
            <div className={styles.dots}>
                {bannerMovies.map((_, index) => (
                    <span
                        key={index}
                        className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
}; 