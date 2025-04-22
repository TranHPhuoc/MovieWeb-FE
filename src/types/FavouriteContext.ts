import { Movie } from "./movie";

export interface FavoriteContextType {
    favorites: Movie[];
    addToFavorites: (movie: Movie) => void;
    removeFromFavorites: (movieId: number) => void;
    isFavorite: (movieId: number) => boolean;
  }