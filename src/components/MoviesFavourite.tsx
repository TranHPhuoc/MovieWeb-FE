import React from "react";
import { useFavorites } from "../context/FavoriteContext";
import styles from "../layout/Page/Popular/Popular.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import { createMovieSlug } from "../types/slug";

const MoviesFavourite: React.FC = () => {
  const navigate = useNavigate();
  const { favorites, removeFromFavorites, addToFavorites, isFavorite } =
    useFavorites();

  const handleWatchClick = (movieId: number, title: string) => {
    navigate(`/movie/${movieId}-${createMovieSlug(title)}`);
  };

  if (favorites.length === 0) {
    return (
      <>
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-white text-2xl">No favorite movies yet</h1>
        </div>
      </>
    );
  }

  return (
    <>

      <div className={styles.container}>
        <h1 className={styles.title}>My Favourite Movies</h1>
        <div className={styles.movieGrid}>
          {favorites.map((movie) => (
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
                    onClick={() => {
                      isFavorite(movie.id)
                        ? removeFromFavorites(movie.id)
                        : addToFavorites(movie);
                    }}
                    className={styles.buttonfavourite}
                  >
                    {isFavorite(movie.id) ? (
                      <FavoriteIcon style={{ color: "#e50914" }} />
                    ) : (
                      <FavoriteBorderIcon /> 
                    )}
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
      </div>
    </>
  );
};

export default MoviesFavourite;
