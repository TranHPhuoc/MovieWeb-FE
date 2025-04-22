import { useState, useEffect } from "react";
import { Movie, movieApi } from "../../../types/movie";
import { useFavorites } from "../../../context/FavoriteContext";
import styles from "../Trending/Trending.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from "react-router-dom";
import { createMovieSlug } from "../../../types/slug";

const TrendingMovies = () => {
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const moviesPerView = 5; 

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await movieApi.getTrendingMovies(1);
        setMovies(response.results);
        setError(null);
      } catch (err) {
        setError("Failed to load movies");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + moviesPerView >= movies.length ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? movies.length - moviesPerView : prevIndex - 1
    );
  };

  const handleFavoriteClick = (movie: Movie) => {
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const handleWatchClick = (movieId: number, title: string) => {
    navigate(`/detail/${movieId}-${createMovieSlug(title)}`);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  const visibleMovies = movies.slice(currentIndex, currentIndex + moviesPerView);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trending Movies</h1>
      <div className={styles.sliderContainer}>
        <button 
          className={styles.navButton} 
          onClick={handlePrev}
          style={{ left: 0 }}
        >
          <ArrowBackIosIcon />
        </button>
        
        <div className={styles.movieGrid}>
          {visibleMovies.map((movie) => (
            <div key={movie.id} className={styles.movieCard}>
              <div className={styles.posterContainer}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className={styles.poster}
                />
              </div>
              <div className={styles.content}>
                <h2 className={styles.movieTitle}>{movie.title}</h2>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button 
                    className={`${styles.buttonfavourite} ${isFavorite(movie.id) ? styles.active : ''}`}
                    onClick={() => handleFavoriteClick(movie)}
                  >
                    <FavoriteIcon />
                  </button>
                  <button 
                    className={styles.button}
                    onClick={() => handleWatchClick(movie.id, movie.original_title)}
                  >
                    Xem phim
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button 
          className={styles.navButton} 
          onClick={handleNext}
          style={{ right: 0 }}
        >
          <ArrowForwardIosIcon />
        </button>
      </div>
    </div>
  );
};

export default TrendingMovies;
