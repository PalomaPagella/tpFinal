import React from 'react';

function Favoritos({ favoritesList }) {
    return (
        <>
            <h3>Tus películas favoritas</h3>
            <ul className='ulMovies'>
                {favoritesList.map(movie => (
                    <li className='liMovies' key={movie.id}>
                        <img
                            className='imgMovies'
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <p className='pMovies'>{movie.title}</p>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Favoritos;
