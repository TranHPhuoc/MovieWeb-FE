import React from "react";
import PopularMovies from "../layout/Page/Popular/Popular";
import { Banner } from "../components/Banner/Banner";
import { useState, useEffect } from "react";
import { Movie, movieApi } from "../types/movie";
import TrendingMovies from "../layout/Page/Trending/Trending";
import Layout from "./Layout";
import UpcomingMovies from "../layout/Page/Upcoming/Upcoming";

const HomePage: React.FunctionComponent = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await movieApi.getPopularMovies(1);
                setMovies(response.results);
            } catch (err) {
                console.error(err);
            }
        };

        fetchMovies();
    }, []);

    return (
        <Layout>
            <div className="relative flex-1 flex flex-col bg-black min-h-screen">
                <div className="flex-1 overflow-hidden">
                    <Banner movies={movies} />
                </div>
                <PopularMovies />
                <TrendingMovies />
                <UpcomingMovies />
            </div>
        </Layout>
    );
};

export default HomePage;
