import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MovieDetail as IMovieDetail, movieApi } from "../../types/movie";
import { useFavorites } from "../../context/FavoriteContext";
import styles from "./MovieDetail.module.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentList from "../Comments/CommentLists";
import CommentForm from "../Comments/CommentForm";
import { Comment } from "../../types/comments";

export const MovieDetail = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<IMovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const handleWatchClick = (movieId: number) => {
    if (!movie) return;
    const titleSlug = movie.title.toLowerCase().replace(/ /g, "-");
    navigate(`/watch/${movieId}/${titleSlug}`);
  };

  useEffect(() => {
    const fetchMovie = async () => {
      if (!movieId) return; 
      try {
        setLoading(true);
        const data = await movieApi.getMovieDetails(parseInt(movieId));
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  useEffect(() => {
    const fetchComments = async () => {
      if (!movieId) return;
      try {
        const pureMovieId = movieId.toString().split('-')[0];
        const response = await fetch(`https://movieweb-production.up.railway.app/api/v1/comment/${pureMovieId}`, {
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          setComments(Array.isArray(data) ? data : [data]);
        }
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };
    fetchComments();
  }, [movieId]);

  const handleCommentSubmit = async (content: string) => {
    if (!movieId) return;
    try {
      const pureMovieId = movieId.toString().split('-')[0];
      const response = await fetch(`https://movieweb-production.up.railway.app/api/v1/comment/${pureMovieId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
        credentials: 'include'
      });

      if (response.ok) {
        const newComment = await response.json();
        setComments(prev => [newComment, ...prev]);
      }
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  if (loading || !movie) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const handleFavoriteClick = () => {
    if (!movie) return;
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <div
          className={styles.backdrop}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          }}
        >
          <div className={styles.overlay} />
        </div>

        <div className={styles.content}>
          <div className={styles.posterWrapper}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className={styles.poster}
            />
          </div>

          <div className={styles.info}>
            <h1 className={styles.title}>
              {movie.title}
              <span className={styles.year}>
                ({new Date(movie.release_date).getFullYear()})
              </span>
            </h1>

            <div className={styles.meta}>
              <span className={styles.runtime}>{movie.runtime} phút</span>
              <span className={styles.genres}>
                {movie.genres.map((genre) => genre.name).join(", ")}
              </span>
            </div>

            <div className={styles.overviews}>
              <div className={styles.overviewSection}>
                <h3 className={styles.overviewTitle}>Nội dung phim:</h3>
                <p className={styles.overviewText}>{movie.overview}</p>
              </div>
            </div>

            <div className={styles.credits}>
              <div className={styles.castSection}>
                <h3 className={styles.sectionTitle}>Diễn viên chính:</h3>
                <div className={styles.castList}>
                  {movie.credits?.cast?.slice(0, 5).map((actor) => (
                    <div key={actor.id} className={styles.castItem}>
                      <img
                        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                        alt={actor.name}
                        className={styles.castImage}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder-avatar.jpg";
                        }}
                      />
                      <div className={styles.castInfo}>
                        <h4 className={styles.castName}>{actor.name}</h4>
                        <p className={styles.characterName}>
                          vai {actor.character}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.crewSection}>
                <h3 className={styles.sectionTitle}>Đạo diễn:</h3>
                <div className={styles.crewList}>
                  {movie.credits?.crew
                    ?.filter((person) => person.job === "Director")
                    .map((director) => (
                      <div key={director.id} className={styles.crewItem}>
                        <img
                          src={`https://image.tmdb.org/t/p/w200${director.profile_path}`}
                          alt={director.name}
                          className={styles.castImage}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/placeholder-avatar.jpg"; 
                          }}
                        />
                        <div className={styles.castInfo}>
                          <h4 className={styles.crewName}>{director.name}</h4>
                          <p className={styles.jobTitle}>Đạo diễn</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <div className={styles.rating}>
                <div className={styles.score}>
                  {Math.round(movie.vote_average * 10)}%
                </div>
                <div className={styles.scoreLabel}>Điểm người dùng</div>
              </div>
              <button
                className={`${styles.favoriteBtn} ${
                  isFavorite(movie.id) ? styles.active : ""
                }`}
                onClick={handleFavoriteClick}
              >
                <FavoriteIcon />
              </button>
              <button
                className={styles.button1}
                onClick={() => handleWatchClick(movie.id)}
              >
                Xem phim
              </button>
            </div>
          </div>
        </div>
      </div>
      <CommentList comments={comments} />
      <CommentForm onSubmit={handleCommentSubmit} />
    </div>
  );
};
