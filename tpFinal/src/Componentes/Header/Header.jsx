import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Busqueda from "../Busqueda/Busqueda";
import Contacto from "../Contacto/Contacto";
import Favoritos from "../Favoritos/Favoritos";
import "./Header.css";
import tmdb from "../assets/tmdb.svg";

const MoviesSection = ({ recentMovies, showMovieDetails, selectedMovie, genres }) => {
    return (
        <section id="Inicio">
            <div className="App">
                <h1>Películas agregadas recientemente</h1>
                <ul className='ulMovies'>
                    {recentMovies.map(movie => (
                        <li className='liMovies' key={movie.id}>
                            <div className='movie-card' onClick={() => showMovieDetails(movie)}>
                                <img
                                    className='imgMovies'
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                />
                                <p className='pMovies'>{movie.title}</p>
                                {selectedMovie === movie && (
                                    <div className='movie-details'>
                                        <p>Género: {movie.genre_ids.map(genreId => genres[genreId]).join(', ')}</p>
                                        <p>Sinopsis: {movie.overview}</p>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

const Header = () => {
    const inicioRef = useRef(null);
    const [favorites, setFavorites] = useState([]);
    const [recentMovies, setRecentMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [genres, setGenres] = useState({});

    const obtenerFechaHaceUnMes = () => {
        const fechaHaceUnMes = new Date();
        fechaHaceUnMes.setMonth(fechaHaceUnMes.getMonth() - 1);
        return fechaHaceUnMes.toISOString().split('T')[0];
    };

    const obtenerPeliculasRecientes = () => {
        const apiKey = 'b7e8c3916513a7760578d639dc745ca3';
        const fechaHaceUnMes = obtenerFechaHaceUnMes();

        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_date.gte=${fechaHaceUnMes}&sort_by=primary_release_date.desc`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener las películas recientes');
                }
                return response.json();
            })
            .then(data => {
                setRecentMovies(data.results);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    useEffect(() => {
        obtenerPeliculasRecientes();
    }, []);

    const showMovieDetails = (movie) => {
        setSelectedMovie(selectedMovie === movie ? null : movie);
    };

    const showInicioSection = window.location.pathname === "/";
   
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    return (
        <Router>
            <header>
                <nav className="NavLogo">
                    <NavLink className={"navlink"} to="#Inicio" onClick={() => inicioRef.current.scrollIntoView()}>
                        <img className="imgHeader" src={tmdb} alt="" />
                    </NavLink>
                </nav>
                <nav className="NavHeader">
                    <NavLink className={"navlink"} to="/Busqueda" onClick={scrollToTop}>Búsqueda</NavLink>
                    <NavLink className={"navlink"} to="/Contacto" onClick={scrollToTop}>Contacto</NavLink>
                    <NavLink className={"navlink"} to="/Favoritos" onClick={scrollToTop}>Favoritos</NavLink>
                </nav>
            </header>

            <Routes>
                <Route path="/Busqueda" element={<Busqueda favorites={favorites} setFavorites={setFavorites} />} />
                <Route path="/Contacto" element={<Contacto />} />
                <Route path="/Favoritos" element={<Favoritos favoritesList={favorites} />} />
            </Routes>

            {showInicioSection && (
                <MoviesSection
                    recentMovies={recentMovies}
                    showMovieDetails={showMovieDetails}
                    selectedMovie={selectedMovie}
                    genres={genres}
                />
            )}
        </Router>
    );
};

export default Header;
