import React, { useState, useEffect } from 'react';

function Inicio({ favorites, setFavorites }) {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    

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

    return (
        <>
            <h3>Buscá tu peli</h3>
            <input
                type="text"
                placeholder="Search for movies"
                value={searchTerm}
                onChange={handleSearch}
            />
            <ul className='ulMovies'>
                {movies.map(movie => (
                    <li className='liMovies' key={movie.id}>
                        <img
                            className='imgMovies'
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <p className='pMovies'>{movie.title}</p>
                        <button onClick={() => addToFavorites(movie)}>Agregar a Favoritos</button>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Inicio;

