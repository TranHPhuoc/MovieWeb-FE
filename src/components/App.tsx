import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useLocation,
  } from "react-router-dom";
  import { useEffect } from "react";
  import LoginForm from "./LoginForm";
  import RegisterForm from "./RegisterForm";
  import HomePage from "../layout/homepage";
  import { useAuth } from "../context/authContext";
  import MoviesFavourite from "./MoviesFavourite";
  import { FavoriteProvider } from "../context/FavoriteContext";
  import { MovieDetail } from "../components/MovieDetail/MovieDetail";
  import PopularMovies from "../layout/Page/Popular/Popular";
  import TrendingMovies from "../layout/Page/Trending/Trending";
  import Layout from "../layout/Layout";
  import { WatchMovie } from "../components/WatchMovie/WatchMovie";
  import { DieuKhoanSuDung } from "../layout/DieuKhoanSuDung/DieuKhoanSuDung";
  import ChinhSachBaoMat from "../layout/ChinhSachBaoMat/ChinhSachBaoMat";
  import AdminDashboard from "./AdminDashboard";
  import ScrollToTopButton from "./ScrollToTopButton/ScrollToTopButton";
  import UpcomingMovies from "../layout/Page/Upcoming/Upcoming";
  
  import "../App.css";
  import { GioiThieu } from "../layout/GioiThieu/GioiThieu";
  
  // Thêm component ScrollToTop
  const ScrollToTop = () => {
    const location = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);
  
    return null;
  };
  
  const App = () => {
    const { isAuthenticated, user } = useAuth();
  
    return (
      <FavoriteProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  user?.email === "admin@gmail.com" ? (
                    <Navigate to="/admin" replace />
                  ) : (
                    <HomePage />
                  )
                ) : (
                  <LoginForm />
                )
              }
            />
  
            <Route
              path="/homepage"
              element={
                isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />
              }
            />
  
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/" replace /> : <LoginForm />
              }
            />
            <Route
              path="/register"
              element={
                isAuthenticated ? <Navigate to="/" replace /> : <RegisterForm />
              }
            />
            <Route
              path="/movies-favourite"
              element={
                isAuthenticated ? (
                  <Layout>
                    <MoviesFavourite />
                  </Layout>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/movie/popular"
              element={
                isAuthenticated ? (
                  <Layout>
                    <PopularMovies />
                  </Layout>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/movie/trending"
              element={
                isAuthenticated ? (
                  <Layout>
                    <TrendingMovies />
                  </Layout>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/movie/upcoming"
              element={
                isAuthenticated ? (
                  <Layout>
                    <UpcomingMovies />
                  </Layout>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/admin"
              element={
                isAuthenticated && user?.email === "admin@gmail.com" ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/detail/:movieId"
              element={
                <Layout>
                  <MovieDetail />
                </Layout>
              }
            />
            <Route path="/watch/:movieId/:movieTitle" element={<WatchMovie />} />
            <Route
              path="/dieu-khoan-su-dung"
              element={
                <Layout>
                  <DieuKhoanSuDung />
                </Layout>
              }
            />
            <Route
              path="/chinh-sach-bao-mat"
              element={
                <Layout>
                  <ChinhSachBaoMat />
                </Layout>
              }
            />
            <Route
              path="/gioi-thieu"
              element={
                <Layout>
                  <GioiThieu />
                </Layout>
              }
            />
          </Routes>
          <ScrollToTopButton />
        </Router>
      </FavoriteProvider>
    );
  };
  
  export default App;