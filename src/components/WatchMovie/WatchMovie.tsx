import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  MovieDetail as IMovieDetail,
  movieApi,
  Video,
} from "../../types/movie";
import styles from "./WatchMovie.module.scss";
import Header from "../../layout/Header/header";
import CommentList from "../Comments/CommentLists";
import CommentForm from "../Comments/CommentForm";
import { Comment } from "../../types/comments";

export const WatchMovie = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<IMovieDetail | null>(null);
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);

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
    const fetchVideo = async () => {
      if (!movieId) return;
      try {
        setLoading(true);
        const data = await movieApi.getMovie(parseInt(movieId));
        setVideo(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [movieId]);

  useEffect(() => {
    const fetchComments = async () => {
      if (!movieId) return;
      try {
        const response = await fetch(`http://movieweb-production.up.railway.app/api/v1/comment/${movieId}`, {
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
      const response = await fetch(`http://movieweb-production.up.railway.app/api/v1/comment/${movieId}`, {
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

  if (loading || !movie || !video) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className={styles.watchContainer}>
        <div
          style={{
            position: "relative",
            paddingTop: "56.25%",
            overflow: "hidden",
            borderRadius: "12px",
            maxWidth: "1280px",
          }}
        >
          <iframe
            src={`${video}`}
            allowFullScreen
            className={styles.iframe}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              border: "none",
              width: "100%",
              height: "100%",
            }}
          />
        </div>

        <div className={styles.movieInfo}>
          <div className={styles.posterSection}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className={styles.poster}
            />
            <div className={styles.basicInfo}>
              <h1>{movie.title}</h1>
              <div className={styles.meta}>
                <span>{new Date(movie.release_date).getFullYear()}</span>
                <span>{movie.runtime} phút</span>
                <span>{movie.vote_average.toFixed(1)} ⭐</span>
              </div>
            </div>
          </div>

          <div className={styles.details}>
            <div className={styles.genres}>
              <strong>Thể loại:</strong>{" "}
              {movie.genres.map((genre) => genre.name).join(", ")}
            </div>

            <div className={styles.cast}>
              <strong>Diễn viên:</strong>{" "}
              {movie.credits?.cast
                ?.slice(0, 5)
                .map((actor) => actor.name)
                .join(", ") || "Chưa có thông tin"}
            </div>

            <div className={styles.overview}>
              <strong>Nội dung:</strong>
              <p>{movie.overview}</p>
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
        </div>
        <CommentList comments={comments} />
        <CommentForm onSubmit={handleCommentSubmit} />
      </div>
    </>
  );
};
