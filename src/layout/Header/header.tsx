import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Images/1302logo.png";
import UserAvatar from "../../components/UserAvatar";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useSearchMovies } from "../../types/useSearchMovies";
import { SearchResults } from "../../components/SearchResults/SearchResults";

interface HeaderProps {
  className?: string;
}

const cs = classNames.bind(styles);

const Header = ({ className }: HeaderProps) => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const { movies, loading, error } = useSearchMovies(searchValue);

  const handleClear = () => {
    setSearchValue("");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleMovieClick = (movieId: number) => {
    navigate(`/detail/${movieId}`);
    setSearchValue("");
  };

  return (
    <header className={cs("wrapper", className)}>
      <div className={cs("logo-search-container")}>
        <Link to="/" className={cs("logo")}>
          <img className={cs("logo-img")} src={logo} alt="logo" />
        </Link>

        <div className={cs("search-container")}>
          <form onSubmit={handleSearch}>
            <div className={cs("search-box")}>
              <input
                type="text"
                placeholder="Tìm kiếm phim..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                spellCheck={false}
              />

              {!!searchValue && !loading && (
                <button className={cs("clear")} onClick={handleClear}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              )}

              {loading && (
                <FontAwesomeIcon className={cs("loading")} icon={faSpinner} />
              )}


            </div>
            {searchValue && (
              <SearchResults
                movies={movies}
                loading={loading}
                error={error}
                onMovieClick={handleMovieClick}
              />
            )}
          </form>
        </div>
      </div>

      <UserAvatar />
    </header>
  );
};

export default Header;
