import React, { useState, useEffect } from 'react';
import "./Busqueda.css";

function Busqueda({ favorites, setFavorites }) {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [genres, setGenres] = useState({});

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=b7e8c3916513a7760578d639dc745ca3")
            .then(response => response.json())
            .then(data => {
                const genreMap = {};
                data.genres.forEach(genre => {
                    genreMap[genre.id] = genre.name;
                });
                setGenres(genreMap);
            })
            .catch(error => {
                console.error('Error fetching genres:', error);
            });
    }, []);

    useEffect(() => {
        if (searchTerm) {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=b7e8c3916513a7760578d639dc745ca3&query=${searchTerm}`)
                .then(response => response.json())
                .then(data => {
                    setMovies(data.results);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [searchTerm]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const addToFavorites = (movie) => {
        setFavorites(prevFavorites => {
            const newFavorites = [...prevFavorites, movie];
            return newFavorites;
        });
    };

    const toggleMovieCard = (movie) => {
        setSelectedMovie(movie === selectedMovie ? null : movie);
      };



    return (
        <>
            <div className='busqueda' >
                <h3>Buscá tu peli</h3>
                <input className='input'
                    type="text"
                    placeholder="Título"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <ul className='ulMovies'>
                {movies.map(movie => (
                    <li
                        className={`liMovies ${selectedMovie === movie ? 'movie-card-expanded centered-movie-card' : ''}`}
                        key={movie.id}
                    >
                        <div className='movie-card' onClick={() => toggleMovieCard(movie)}>
                            <img
                                className='imgMovies'
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <p className='pMovies'>{movie.title}</p>
                            {selectedMovie === movie && (
                                <div className='movieDetalles'>
                                    <p className='generoDetalles'>Género: {movie.genre_ids.map(genreId => genres[genreId]).join(', ')}</p>
                                    <p className='sinopsisDetalles'>Sinopsis: {movie.overview}</p>
                                </div>
                            )}
                        </div>
                        <button className='btn' onClick={() => addToFavorites(movie)}>Agregar a Favoritos</button>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Busqueda;




