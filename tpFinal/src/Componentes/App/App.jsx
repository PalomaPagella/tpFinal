import React, { useEffect, useState } from 'react';

function App({ favorites, setFavorites }) {
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
        // También puedes colocar la lógica para obtener los géneros aquí si es necesario
    }, []);

    const addToFavorites = (movie) => {
        setFavorites(prevFavorites => {
            const newFavorites = [...prevFavorites, movie];
            return newFavorites;
        });
    };

    const showMovieDetails = (movie) => {
        setSelectedMovie(selectedMovie === movie ? null : movie);
    };

    return (
        <div className="App">
            <h1>¡Películas agregadas recientemente!</h1>
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
                        <button className='btn' onClick={() => addToFavorites(movie)}>Agregar a Favoritos</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
